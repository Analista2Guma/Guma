import { Component, OnInit } from '@angular/core';
import { SmartTableData } from '../../@core/data/smart-table';
import { LocalDataSource } from 'ng2-smart-table';

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
          name: 'view',
          title: 'View',
        },
      ],
    },
    mode: 'external',
    hideSubHeader: true,
    columns: {
      ARTICULO: {
        title: '#Articulo',
      },
      LABORATORIO: {
        title: 'Laboratorio',
      },
      DESCRIPCION: {
        title: 'Descripcion',
      },
      CLASE_ABC: {
        title: 'Categoria',
      },
      ORDEN_MINIMA: {
        title: 'Minima Orden',
      },
      FACTOR_EMPAQUE: {
        title: 'Empaque (unidades)',
      },
      CANT_DISPONIBLE: {
        title: 'Disponible',
      },
      CANT_PEDIDA: {
        title: 'Pedida',
      },
      CANT_TRANSITO: {
        title: 'Transito',
      },
      CLASE_ABC_privado: {
        title: 'Categoria (Privado)',
      },
      CANT_DISPONIBLE_privado: {
        title: 'Disponible (Privado)',
      },
      CANT_PEDIDA_privado: {
        title: 'Pedida (Privado)',
      },
      CANT_TRANSITO_privado: {
        title: 'Transito (Privado)',
      },
      CONTRATADA: {
        title: 'Cantidad Contratada',
      },
      PENDIENTE: {
        title: 'Cantidad Pendiente',
      },
      ORDENADO: {
        title: 'Cantidad Ordenada',
      },
      pcm: {
        title: 'Promedio Contratado Mensual',
      },
      pvm: {
        title: 'Promedio Vendido Mensual',
      },
    },
  };

  data: Object[];
  source: LocalDataSource = new LocalDataSource();

  constructor(private service: SmartTableData) {
    const data = this.service.getData();
    // console.log(data);
    data.forEach(product => {
      product['pcm'] = product['CONTRATADA'] / 12; // promedio contratado mensual
      product['pvm'] = product['ORDENADO'] / this.mesDeContrato; // promedio vendido mensual
      product['vc'] = Math.max(product['CONTRATADA'],product['ORDENADO']); // valor critico
      product['cumplimiento'] = product['ORDENADO'] / product['CONTRATADA'] * 100; // % de contrato completado
      product['daa'] = product['vc'] * 12; // demanda anual ajustada
      product['md06'] = (product['CANT_DISPONIBLE'] + product['CANT_PEDIDA'] +
                        product['CANT_TRANSITO']) / product['vc']; // Meses disponibles bodega 6
      product['md02'] = (product['CANT_DISPONIBLE_privado'] + product['CANT_PEDIDA_privado'] +
                        product['CANT_TRANSITO_privado']) / product['vc']; // Meses disponibles bodega 2
      product['pro'] = null; // punto de reorden
      switch (product['CLASE_ABC']) {
        case 'A+':
          product['pro'] = 10;
          break;
        case 'A':
          product['pro'] = 10;
          break;
        case 'B':
          product['pro'] = 9;
          break;
        case 'C':
          product['pro'] = 8;
          break;
        default:
          product['pro'] = 'N/D';
          break;
      }
      if (product['md06'] <= product['pro']) {
        product['pedir?'] = 'PEDIR';
      } else {
        product['pedir?'] = '';
      }
      // console.log(product);
    });
    this.data = data;
    this.source.load(data);
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

  ngOnInit() {
  }

}
