import { Component, OnInit } from '@angular/core';
import { SmartTableData } from '../../@core/data/smart-table';
import { LocalDataSource } from 'ng2-smart-table';

@Component({
  selector: 'ngx-cruz-azul',
  templateUrl: './cruz-azul.component.html',
  styleUrls: ['./cruz-azul.component.scss'],
})
export class CruzAzulComponent implements OnInit {

  settings = {
    actions: {
      edit: false,
      delete: false,
      position: 'right',
      custom: [
        {
          name: 'view',
          title: 'View',
        }]
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
    },
  };

  data: Object[];
  source: LocalDataSource = new LocalDataSource();

  constructor(private service: SmartTableData) {
    const data = this.service.getData();
    // console.log(data);
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
