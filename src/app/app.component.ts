/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component, OnInit, ɵConsole } from '@angular/core';
import { AnalyticsService } from './@core/utils/analytics.service';
import { UserService } from './@core/data/user.service';
import { SmartTableData } from './@core/data/smart-table';
import { Router } from '@angular/router';
import { SourceFilesService } from './@core/data/source-files.service';



@Component({
  selector: 'ngx-app',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {

  caData = new Map<string, Object>();
  privData: Object[] = [];
  aggregateData = new Map<string, Object>();
  mesDeContrato = 10;
  cordobas = 33.74; // Cordobas / dollar

  constructor(private analytics: AnalyticsService,
              private userService: UserService,
              private table: SmartTableData,
              private router: Router,
              private sourceFiles: SourceFilesService) {

    this.table.getCAData()
    .subscribe(res => {
      const rawCAData = res.data;
      // CA Calculations
      rawCAData.forEach(product => {
        //console.log(product['BODEGA']);
        // First, we supplement product Data with necessary additional columns (required for calculations)
        let CADataFound = false;
        const productID = product['ARTICULO'];
        if (this.caData.has(productID)) return;
        let productEquivalentID = productID;
        if (this.sourceFiles.EQUIVALENCIAS.has(productID)) {
          productEquivalentID = this.sourceFiles.EQUIVALENCIAS.get(productID)['EQUIVALENCIA'];
          // console.log("Current : ", productID, ",  equivalent: ", productEquivalentID, ", index: ", currentProductIndex);
        }
        if (this.sourceFiles.CA.has(productID)) {
          //console.log("Getting contract data from ID");
          const productCAData = this.sourceFiles.CA.get(productID);
          product['CONTRATADA'] = productCAData['CANT_CONTRATADA'];
          product['ORDENADA'] = productCAData['ORDENADO'];
          product['PENDIENTE'] = productCAData['PENDIENTE_entrega'];
          CADataFound = true;
        }
        if (productID !== productEquivalentID && this.sourceFiles.CA.has(productEquivalentID)) {
          const productCAData = this.sourceFiles.CA.get(productEquivalentID);
          //console.log("Getting contract data from equivalent");
          product['CONTRATADA'] = productCAData['CANT_CONTRATADA'];
          product['ORDENADA'] = productCAData['ORDENADO'];
          product['PENDIENTE'] = productCAData['PENDIENTE_entrega'];
          product['Equivalente'] = productEquivalentID;
          CADataFound = true;
        }
        // Ignore rows with missing CA Data
        if (!CADataFound) {
          return;
        }

        product['pcm'] = product['CONTRATADA'] / 12; // promedio contratado mensual
        product['pvm'] = product['ORDENADA'] / this.mesDeContrato; // promedio vendido mensual
        product['vc'] = Math.max(product['pcm'], product['pvm']); // valor critico
        product['cumplimiento'] = product['ORDENADA'] / product['CONTRATADA']; // % de contrato completado
        product['daa'] = product['vc'] * 12; // demanda anual ajustada
        // Meses disponibles bodega 6
        product['md06'] = +product['FACTOR_EMPAQUE'] * (+product['CANT_DISPONIBLE'] + +product['CANT_PEDIDA'] +
                          +product['CANT_TRANSITO'] - +product['CANT_RESERVADA']) / product['vc'];
        // Meses disponibles Para CA en bodega 2
        product['md02'] = +product['FACTOR_EMPAQUE (Privado)'] * (+product['CANT_DISPONIBLE (Privado)'] +
                          +product['CANT_PEDIDA (Privado)'] + product['CANT_TRANSITO (Privado)']
                          - +product['CANT_RESERVADA(Privado)']) / product['vc'];

        product['disponible_total'] = +product['CANT_DISPONIBLE'] + +product['CANT_DISPONIBLE (Privado)'];
        product['pedida_total'] = +product['CANT_PEDIDA'] + +product['CANT_PEDIDA (Privado)'];
        product['transito_total'] = +product['CANT_TRANSITO'] + +product['CANT_TRANSITO (Privado)'];
        product['reservada_total'] = +product['CANT_RESERVADA'] + +product['CANT_RESERVADA(Privado)'];
        /*console.log("On ", productID,", empaque: ",product['FACTOR_EMPAQUE_Privado'],
        ", disponible: ", product['CANT_DISPONIBLE_Privado'], ", pedida: ", product['CANT_PEDIDA_Privado'],
        ", transito: ", product['CANT_TRANSITO_Privado'], ", CV: ", product['vc'], "and finally md02: ",
        product['md02']);
        */
        // Dependientes de CATEGORIA (CLASE_ABC)
        product['pro'] = null; // punto de reorden
        product['me02'] = null; // minima existencia permitida bodega 2 (en meses)
        switch (product['CLASE_ABC']) {
          case 'A+':
            product['pro'] = 10;
            product['me02'] = 3;
            break;
          case 'A':
            product['pro'] = 10;
            product['me02'] = 3;
            break;
          case 'B':
            product['pro'] = 9;
            product['me02'] = 2;
            break;
          case 'C':
            product['pro'] = 8;
            product['me02'] = 1;
            break;
          default:
            product['pro'] = 'N/D';
            product['me02'] = 'N/D';
            break;
        }

        if (product['md06'] <= product['pro']) {
          product['pedir'] = 'PEDIR';
        } else {
          product['pedir'] = '';
        }

        product['cantPedir'] = product['pro'] * product['vc'];

        // REQUISITO: Informacion de Ventas bodega 2
        product['vpm'] = null; // Venta privada mensual (meses con disp.)
        product['md02_priv'] = +product['FACTOR_EMPAQUE (Privado)'] * (+product['CANT_DISPONIBLE (Privado)'] +
                               +product['CANT_PEDIDA (Privado)'] + product['CANT_TRANSITO (Privado)']) / +product['vpm'];

        // cantidad (en packs) movible bodega 2->6
        product['cm02'] = Math.max(0, product['vpm'] * (product['md02'] - product['me02']));

        // REQUISITO: Informacion de equivalentes
        product['ee'] = null; // existencia equivalente
        product['notas'] = '';

        this.aggregateData.set(productID, product);
        // Push onto this.caData once complete
        this.caData.set(productID, product);
      });

      this.table.getPrivData()
    .subscribe(res => {
      //console.log(res);
      //const rawPrivData = res;
      const rawPrivData = res.data;
      rawPrivData.forEach(product => {
        if (product['YEAR'] < 2019) return;
        // First, we supplement product Data with necessary additional columns (required for calculations)
        let privDataFound = false;
        const productID = product['ARTICULO'];
        if (this.caData.has(productID)) product['productoCA'] = true;
        else product['productoCA'] = false;
        let productEquivalentID = productID;
        if (this.sourceFiles.EQUIVALENCIAS.has(productID)) {
          productEquivalentID = this.sourceFiles.EQUIVALENCIAS.get(productID)['EQUIVALENCIA'];
          if (productID !== productEquivalentID) product['Equivalente'] = productEquivalentID;
          privDataFound = true;
          // console.log("Current : ", productID, ",  equivalent: ", productEquivalentID, ", index: ", currentProductIndex);
        }

        // Ignore rows with missing CA Data
        if (!privDataFound) {
          return;
        }

        let ventasTotal = 0;
        let mesesConVentas = 0;
        let mvm = 0;
        const meses = ['ENERO', 'FEBRERO', 'MARZO', 'ABRIL', 'MAYO', 'JUNIO', 'JULIO',
                      'AGOSTO', 'SEPTIEMBRE', 'OCTUBRE', 'NOVIEMBRE', 'DICIEMBRE'];
        let ventas1mes = 0;
        meses.forEach(mes => {
          ventas1mes = +product[mes];
          if (ventas1mes && ventas1mes > 0) {
            ventasTotal += ventas1mes;
            mesesConVentas ++;
            if (ventas1mes > mvm) mvm = ventas1mes;
          }
        });
        product['mesesConVentas'] = mesesConVentas;
        product['ventasTotal'] = ventasTotal;
        product['pvs'] = ventasTotal / 12; // Promedio de ventas (simple)
        product['pvm'] = ventasTotal / mesesConVentas; // Promedio de ventas (con existencia)
        product['mvm'] = mvm; // maxima venta mensual
        product['presupuesto'] = 12.765 * +product['pvm'];

        // Promedio meses disponibles para B2
        product['md_b2'] = (+product['CANT_DISPONIBLE'] + +product['CANT_PEDIDA'] +
                            +product['CANT_TRANSITO']) / product['pvm'];

        // Minimos meses disponibles
        product['md_b2'] = (+product['CANT_DISPONIBLE'] + +product['CANT_PEDIDA'] +
                            +product['CANT_TRANSITO']) / product['mvm'];

        // Estableciendo CATEGORIA (privado)
        // Margen
        product['margen'] = (product['PRECIO_VENTA'] - product['COSTO_PROM_LOC']) / product['COSTO_PROM_LOC'];
        if (product['margen'] < .25) {
          product['puntaje_margen'] = 1;
        } else if (product['margen'] < .4) {
          product['puntaje_margen'] = 2;
        } else if (product['margen'] < .45) {
          product['puntaje_margen'] = 3;
        } else if (product['margen'] < 1) {
          product['puntaje_margen'] = 4;
        } else product['puntaje_margen'] = 5;

        // Contribucion
        product['contribucion'] = ventasTotal * product['COSTO_PROM_LOC'] * product['margen'] / this.cordobas;
        if (product['contribucion'] < 1000) {
          product['puntaje_contribucion'] = 1;
        } else if (product['contribucion'] < 3000) {
          product['puntaje_contribucion'] = 2;
        } else if (product['contribucion'] < 5000) {
          product['puntaje_contribucion'] = 3;
        } else if (product['contribucion'] < 8000) {
          product['puntaje_contribucion'] = 4;
        } else product['puntaje_contribucion'] = 5;

        product['puntos_categoria'] = product['puntaje_margen'] * product['puntaje_contribucion'];
        if (product['puntos_categoria'] < 8) {
          product['CLASE_ABC'] = 'C';
        } else if (product['puntos_categoria'] < 16) {
          product['CLASE_ABC'] = 'B';
        } else if (product['puntos_categoria'] < 25) {
          product['CLASE_ABC'] = 'A';
        } else product['CLASE_ABC'] = 'A+';


        // Dependientes de CATEGORIA (CLASE_ABC)
        product['pro'] = null; // punto de reorden
        product['me'] = null; // minima existencia permitida bodega 2 (en meses)
        switch (product['CLASE_ABC']) {
          case 'A+':
            product['pro'] = 10;
            product['me'] = 3;
            break;
          case 'A':
            product['pro'] = 10;
            product['me'] = 3;
            break;
          case 'B':
            product['pro'] = 9;
            product['me'] = 2;
            break;
          case 'C':
            product['pro'] = 8;
            product['me'] = 1;
            break;
          default:
            product['pro'] = 'N/D';
            product['me'] = 'N/D';
            break;
        }

        if (product['md_b2'] <= product['pro']) {
          product['pedir'] = 'PEDIR';
        } else {
          product['pedir'] = '';
        }

        product['cantPedir'] = product['pro'] * product['pvm'];
        product['Equivalente'] = productEquivalentID;
        //console.log(product);
        this.privData.push(product);
      });
      this.userService.setPrivData(this.privData);
    });
      this.userService.setCAData(this.caData);
    });

    /*
    // priv: retrieving Data
    this.table.getPrivData()
    .subscribe(res => {
      //console.log(res);
      const rawPrivData = res;
      //const rawPrivData = res.data; // ONCE WE HAVE http DATA WORKING
      rawPrivData.forEach(product => {
        // First, we supplement product Data with necessary additional columns (required for calculations)
        let privDataFound = false;
        const productID = product['ARTICULO'];
        let productEquivalentID = productID;
        if (this.sourceFiles.EQUIVALENCIAS.has(productID)) {
          productEquivalentID = this.sourceFiles.EQUIVALENCIAS.get(productID)['EQUIVALENCIA'];
          if (productID !== productEquivalentID) product['Equivalente'] = productEquivalentID;
          privDataFound = true;
          // console.log("Current : ", productID, ",  equivalent: ", productEquivalentID, ", index: ", currentProductIndex);
        }

        // Ignore rows with missing CA Data
        if (!privDataFound) {
          return;
        }

        let ventasTotal = 0;
        let mesesConVentas = 0;
        let mvm = 0;
        const meses = ['ENERO', 'FEBRERO', 'MARZO', 'ABRIL', 'MAYO', 'JUNIO', 'JULIO',
                      'AGOSTO', 'SEPTIEMBRE', 'OCTUBRE', 'NOVIEMBRE', 'DICIEMBRE'];
        let ventas1mes = 0;
        meses.forEach(mes => {
          ventas1mes = +product[mes];
          if (ventas1mes && ventas1mes > 0) {
            ventasTotal += ventas1mes;
            mesesConVentas ++;
            if (ventas1mes > mvm) mvm = ventas1mes;
          }
        });
        product['mesesConVentas'] = mesesConVentas;
        product['ventasTotal'] = ventasTotal;
        product['pvs'] = ventasTotal / 12; // Promedio de ventas (simple)
        product['pvm'] = ventasTotal / mesesConVentas; // Promedio de ventas (con existencia)
        product['mvm'] = mvm; // maxima venta mensual
        product['presupuesto'] = 12.765 * +product['pvm'];

        // Promedio meses disponibles para B2
        product['md_b2'] = (+product['CANT_DISPONIBLE'] + +product['CANT_PEDIDA'] +
                            +product['CANT_TRANSITO']) / product['pvm'];

        // Minimos meses disponibles
        product['md_b2'] = (+product['CANT_DISPONIBLE'] + +product['CANT_PEDIDA'] +
                            +product['CANT_TRANSITO']) / product['mvm'];

        // Estableciendo CATEGORIA (privado)
        // Margen
        product['margen'] = (product['PRECIO_VENTA'] - product['COSTO_PROM_LOC']) / product['COSTO_PROM_LOC'];
        if (product['margen'] < .25) {
          product['puntaje_margen'] = 1;
        } else if (product['margen'] < .4) {
          product['puntaje_margen'] = 2;
        } else if (product['margen'] < .45) {
          product['puntaje_margen'] = 3;
        } else if (product['margen'] < 1) {
          product['puntaje_margen'] = 4;
        } else product['puntaje_margen'] = 5;

        // Contribucion
        product['contribucion'] = ventasTotal * product['COSTO_PROM_LOC'] * product['margen'] / this.cordobas;
        if (product['contribucion'] < 1000) {
          product['puntaje_contribucion'] = 1;
        } else if (product['contribucion'] < 3000) {
          product['puntaje_contribucion'] = 2;
        } else if (product['contribucion'] < 5000) {
          product['puntaje_contribucion'] = 3;
        } else if (product['contribucion'] < 8000) {
          product['puntaje_contribucion'] = 4;
        } else product['puntaje_contribucion'] = 5;

        product['puntos_categoria'] = product['puntaje_margen'] * product['puntaje_contribucion'];
        if (product['puntos_categoria'] < 8) {
          product['CLASE_ABC'] = 'C';
        } else if (product['puntos_categoria'] < 16) {
          product['CLASE_ABC'] = 'B';
        } else if (product['puntos_categoria'] < 25) {
          product['CLASE_ABC'] = 'A';
        } else product['CLASE_ABC'] = 'A+';


        // Dependientes de CATEGORIA (CLASE_ABC)
        product['pro'] = null; // punto de reorden
        product['me'] = null; // minima existencia permitida bodega 2 (en meses)
        switch (product['CLASE_ABC']) {
          case 'A+':
            product['pro'] = 10;
            product['me'] = 3;
            break;
          case 'A':
            product['pro'] = 10;
            product['me'] = 3;
            break;
          case 'B':
            product['pro'] = 9;
            product['me'] = 2;
            break;
          case 'C':
            product['pro'] = 8;
            product['me'] = 1;
            break;
          default:
            product['pro'] = 'N/D';
            product['me'] = 'N/D';
            break;
        }

        if (product['md_b2'] <= product['pro']) {
          product['pedir'] = 'PEDIR';
        } else {
          product['pedir'] = '';
        }

        product['cantPedir'] = product['pro'] * product['pvm'];
        product['Equivalente'] = productEquivalentID;
        //console.log(product);
        this.privData.push(product);
      });
      this.userService.setPrivData(this.privData);
    });*/
  }

  union(obj1: Object, obj2: Object) {}

  ngOnInit() {
    this.analytics.trackPageViews();
  }
}
