/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component, OnInit } from '@angular/core';
import { AnalyticsService } from './@core/utils/analytics.service';
import { UserService } from './@core/data/user.service';
import { SmartTableData } from './@core/data/smart-table';
import { LocalDataSource } from 'ng2-smart-table';
import { Router } from '@angular/router';


@Component({
  selector: 'ngx-app',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {

  caData: Object[];
  privData: Object[];
  source;
  mesDeContrato = 10;

  constructor(private analytics: AnalyticsService,
              private userService: UserService,
              private table: SmartTableData,
              private router: Router) {

    this.table.getCAData()
    // CA: retrieving Data
    .subscribe(res => {
      this.caData = res.data;

      // CA: New columns
      this.caData.forEach(product => {
        product['pcm'] = product['CONTRATADA'] / 12; // promedio contratado mensual
        product['pvm'] = product['ORDENADO'] / this.mesDeContrato; // promedio vendido mensual
        product['vc'] = Math.max(product['CONTRATADA'], product['ORDENADO']); // valor critico
        product['cumplimiento'] = product['ORDENADO'] / product['CONTRATADA'] * 100; // % de contrato completado
        product['daa'] = product['vc'] * 12; // demanda anual ajustada
        product['md06'] = (product['CANT_DISPONIBLE'] + product['CANT_PEDIDA'] +
                          product['CANT_TRANSITO']) / product['vc']; // Meses disponibles bodega 6
        product['md02'] = (product['CANT_DISPONIBLE_privado'] + product['CANT_PEDIDA_privado'] +
                          product['CANT_TRANSITO_privado']) / product['vc']; // Meses disponibles bodega 2

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
            product['me02'] = 0;
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
        product['md02_priv'] = (product['CANT_DISPONIBLE_privado'] +
                          product['CANT_PEDIDA_privado'] +
                          product['CANT_TRANSITO_privado']) / product['vpm'];

        // cantidad (en packs) movible bodega 2->6
        product['cm02'] = Math.max(0, product['vpm'] * (product['md02'] - product['me02']));

        // REQUISITO: Informacion de equivalentes
        product['Equivalente'] = null;
        product['ee'] = null; // existencia equivalente
      });
      this.source = new LocalDataSource(this.caData);
      this.userService.setCAData(this.caData);
    });

    // priv: retrieving Data
    this.table.getPrivData()
    .subscribe(res => {
      this.privData = res.data;

      this.userService.setPrivData(this.privData);
      this.router.navigate(['/pages/dashboard']);
    });


  }

  ngOnInit() {
    this.analytics.trackPageViews();
  }
}
