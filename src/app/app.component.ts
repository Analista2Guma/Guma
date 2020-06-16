/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component, OnInit, ɵConsole } from '@angular/core';
import { AnalyticsService } from './@core/utils/analytics.service';
import { UsuarioService } from './@core/data/usuario.service';
import { SmartTableData } from './@core/data/smart-table';
import { Router } from '@angular/router';
import { SourceFilesService } from './@core/data/source-files.service';



@Component({
  selector: 'ngx-app',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {

  sugerencias: Object[] = []; // lista de productos que requieren pedido
  aggregateData = new Map<string, Object[]>(); // Mapa equivalente -> lista de todos productos con misma equivalencia
  errorData = new Map<string, Object[]>(); // Mapa equivalente -> productos que les falta algun dato
  CAData: Object[] = []; // lista para 'Cruz Azul'
  PrivData: Object[] = []; // lista para 'Mercado Privado'

  meses = ['ENERO', 'FEBRERO', 'MARZO', 'ABRIL', 'MAYO', 'JUNIO', 'JULIO',
            'AGOSTO', 'SEPTIEMBRE', 'OCTUBRE', 'NOVIEMBRE', 'DICIEMBRE'];
  mesActual = Number(new Date().getMonth());
  mesDeContrato = ((this.mesActual + 3) % 12) + 1; // en cual mes del contrato estamos? Comienza Septiembre
  cordobas = 33.77; // Cordobas / dollar

  constructor(private analytics: AnalyticsService,
              private userService: UsuarioService,
              private table: SmartTableData,
              private router: Router,
              private sourceFiles: SourceFilesService) {

    // Primero la tabla de privado
    this.table.getPrivData()
    .subscribe(result => {
      result.data.forEach(product => {
        let ventasTotal = 0;
        let mesesConVentas = 0;
        let mvm = 0; // minima venta mensual
        let ventas1mes = 0;
        this.meses.forEach(mes => {
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
        product['presupuesto'] = 12.765 * +product['pvm']; // El presupuesto anticipado con crecimiento

        // Promedio meses disponibles para B2
        product['md_b2'] = (+product['CANT_DISPONIBLE'] + +product['CANT_PEDIDA'] +
                            +product['CANT_TRANSITO']) / product['pvm'];

        // Minimos meses disponibles
        product['md_b2'] = (+product['FACTOR_EMPAQUE']) * (+product['CANT_DISPONIBLE'] + +product['CANT_PEDIDA'] +
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

        // Puntos totales para establecer categoria
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
            this.PrivData.push(product);
            break;
          case 'A':
            product['pro'] = 10;
            product['me'] = 3;
            this.PrivData.push(product);
            break;
          case 'B':
            product['pro'] = 9;
            product['me'] = 2;
            this.PrivData.push(product);
            break;
          case 'C':
            product['pro'] = 8;
            product['me'] = 1;
            this.PrivData.push(product);
            break;
          default:
            product['pro'] = 'N/D';
            product['me'] = 'N/D';
            if (this.errorData.has(product['EQUIVALENCIA'])) {
              const errors = this.errorData.get(product['EQUIVALENCIA']);
              errors.push(product);
              this.errorData.set(product['EQUIVALENCIA'], errors);
            } else {
              this.errorData.set(product['EQUIVALENCIA'], [product]);
            }
            break;
        }

        // Tenemos minimo el 'PRO' de meses de existencia?
        if (product['md_b2'] <= product['pro']) {
          // si no, tenemos que pedir
          product['pedir'] = 'PEDIR';
          product['cantPedir'] = product['pro'] * product['pvm'];
          this.sugerencias.push(product);
        } else {
          // si tenemos mas que el 'PRO', no tenemos que pedir
          product['pedir'] = '';
        }

        // Si el producto raiz (equivalencia) ya esta establecido
        if (this.aggregateData.has(product['EQUIVALENCIA'])) {
          // agregamos este producto a la lista
          const prodList = this.aggregateData.get(product['EQUIVALENCIA']);
          prodList.push(product);
          prodList.forEach(prod => {
            if (prod.hasOwnProperty('cantPedirPriv')) {
              const oldQuantity = prod['cantPedirPriv'];
              prod['cantPedirPriv'] = oldQuantity + product['cantPedir'];
            }
          });
          this.aggregateData.set(product['EQUIVALENCIA'], prodList);
        } else {
          // si no, establecemos el producto raiz
          product['cantPedirPriv'] = product['cantPedir'];
          this.aggregateData.set(product['EQUIVALENCIA'], [product]);
        }
      });
      this.table.getCAData()
      .subscribe(res => {
        // ahora los productos CA
        const rawCAData = res.data;
        // CA Calculations
        rawCAData.forEach(product => {
          // INICIANDO VARIABLES + INFORMACION DEL PRODUCTO
          const productID = product['ARTICULO']; // ARTICULO

          let productEquivalentID = productID; // Creando variable Equivalente
          let CADataFound = false; // Datos de contrato CA disponible? [en data/source-files.service.ts]

          // Estableciendo Equivalente
          if (this.sourceFiles.EQUIVALENCIAS.has(productID)) {
            productEquivalentID = this.sourceFiles.EQUIVALENCIAS.get(productID)['EQUIVALENCIA'];
          }

          // Buscando datos de contrato CA por producto actual
          if (this.sourceFiles.CA.has(productID)) {
            const productCAData = this.sourceFiles.CA.get(productID);
            product['CONTRATADA'] = productCAData['CANT_CONTRATADA'];
            product['ORDENADA'] = productCAData['ORDENADO'];
            product['PENDIENTE'] = productCAData['PENDIENTE_entrega'];
            CADataFound = true;
          }
          if (productID !== productEquivalentID && this.sourceFiles.CA.has(productEquivalentID)) {
            const productCAData = this.sourceFiles.CA.get(productEquivalentID);
            // console.log("Getting contract data from equivalent");
            product['CONTRATADA'] = productCAData['CANT_CONTRATADA'];
            product['ORDENADA'] = productCAData['ORDENADO'];
            product['PENDIENTE'] = productCAData['PENDIENTE_entrega'];
            product['Equivalente'] = productEquivalentID;
            CADataFound = true;
          }

          // EXCLUIR PRODUCTOS SIN DATOS DE CONTRATO CA
          if (!CADataFound) {
            if (this.errorData.has(product['EQUIVALENCIA'])) {
              const errors = this.errorData.get(product['EQUIVALENCIA']);
              errors.push(product);
              this.errorData.set(product['EQUIVALENCIA'], errors);
            } else {
              this.errorData.set(product['EQUIVALENCIA'], [product]);
            }
          }

          // CALCULACIONES
          product['productoCA'] = true; // Producto de CA
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

          // Dependientes de CATEGORIA (CLASE_ABC)
          product['pro'] = null; // punto de reorden (meses)
          product['me02'] = null; // minima existencia permitida bodega 2 (en meses)
          switch (product['CLASE_ABC']) {
            case 'AAA':
              product['pro'] = 10;
              product['me02'] = 3;
              product['CLASE_ABC'] = 'A';
              this.CAData.push(product);
              break;
            case 'AA':
              product['pro'] = 10;
              product['me02'] = 3;
              product['CLASE_ABC'] = 'B';
              this.CAData.push(product);
              break;
            case 'A':
              product['pro'] = 9;
              product['me02'] = 2;
              product['CLASE_ABC'] = 'C';
              this.CAData.push(product);
              break;
            default:
              product['pro'] = 'N/D';
              product['me02'] = 'N/D';
              if (this.errorData.has(product['EQUIVALENCIA'])) {
                const errors = this.errorData.get(product['EQUIVALENCIA']);
                errors.push(product);
                this.errorData.set(product['EQUIVALENCIA'], errors);
              } else {
                this.errorData.set(product['EQUIVALENCIA'], [product]);
              }
              break;
          }

          // Si 'Disponibilidad' < PRO, sugerir pedido
          if (product['md06'] <= product['pro']) {
            product['pedir'] = 'PEDIR';
            product['cantPedir'] = product['pro'] * product['vc'];
            this.sugerencias.push(product);
          } else {
            product['pedir'] = '';
          }

          product['md02_priv'] = +product['FACTOR_EMPAQUE (Privado)'] * (+product['CANT_DISPONIBLE (Privado)'] +
                                 +product['CANT_PEDIDA (Privado)'] + product['CANT_TRANSITO (Privado)']) / +product['vpm'];

          // cantidad (en packs) movible bodega 2->6
          product['cm02'] = Math.max(0, product['vpm'] * (product['md02'] - product['me02']));

          product['ee'] = null; // existencia equivalente
          product['notas'] = '';

          // Incluir en this.aggregateData
          if (this.aggregateData.has(productEquivalentID)) {
            const prodList = this.aggregateData.get(productEquivalentID);
            prodList.push(product);
            prodList.forEach(prod => {
              if (prod.hasOwnProperty('cantPedirCA')) {
                const oldQuantity = prod['cantPedirCA'];
                prod['cantPedirCA'] = oldQuantity + product['cantPedir'];
              } else {
                prod['cantPedirCA'] = product['cantPedir'];
              }
            });
            this.aggregateData.set(productEquivalentID, prodList);
          } else {
            product['cantPedirCA'] = product['cantPedir'];
            this.aggregateData.set(productEquivalentID, [product]);
          }
        });
        this.userService.setAggregateData(this.aggregateData);
        this.userService.setPrivData(this.PrivData);
        this.userService.setCAData(this.CAData);
        this.userService.setSugerencias(this.sugerencias);
        this.router.navigate(['/paginas/sugerencias']);
      });
    });
  }

  union(privProduct: Object, CAProduct: Object) {
    return({...privProduct, ...CAProduct});
  }

  ngOnInit() {
    this.analytics.trackPageViews();
  }
}
