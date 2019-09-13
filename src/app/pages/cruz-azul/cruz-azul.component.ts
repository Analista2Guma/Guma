import { Component, OnInit } from '@angular/core';
import { SmartTableData } from '../../@core/data/smart-table';
import { LocalDataSource } from 'ng2-smart-table';
import { Router } from '@angular/router';
import { UserService } from '../../@core/data/user.service';

@Component({
  selector: 'ngx-cruz-azul',
  templateUrl: './cruz-azul.component.html',
  styleUrls: ['./cruz-azul.component.scss'],
})
export class CruzAzulComponent implements OnInit {

  mesDeContrato = 10;

  settings = {
    actions: {
      edit: false,
      delete: false,
      position: 'right',
      custom: [
        {
          name: 'report',
          title: 'Reporte',
        },
      ],
    },
    mode: 'external',
    hideSubHeader: true,
    noDataMessage: 'Cargando datos',
    columns: {
      ARTICULO: {
        title: '#Articulo',
      },
      DESCRIPCION: {
        title: 'Descripcion',
      },
      CLASE_ABC: {
        title: 'Categoria',
      },
      ORDEN_MINIMA: {
        title: 'Orden Minima',
      },
      FACTOR_EMPAQUE: {
        title: 'Empaque (unidades)',
      },
    },
  };

  data: Object[];
  source: LocalDataSource = new LocalDataSource();

  constructor(private service: SmartTableData,
              private router: Router,
              private userService: UserService) {}

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

  ngOnInit() {
    this.service.getData()
    .subscribe(res => {
      // console.log(res.data);
      this.data = res.data;
      this.source.load(this.data);
      this.data.forEach(product => {
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
    });
  }

  report(event, eventName: string): void {
    // console.log(eventName);
    // console.log(event);
    // console.log(event.data);
    this.userService.setDisplayObject(event.data);
    this.userService.setDisplayObjectType('cruz-azul');
    this.router.navigate(['pages/form']);
  }

}
