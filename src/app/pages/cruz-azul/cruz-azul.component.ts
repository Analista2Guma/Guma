import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { SmartTableData } from '../../@core/data/smart-table';
import { Router } from '@angular/router';
import { UserService } from '../../@core/data/user.service';


@Component({
  selector: 'ngx-cruz-azul',
  templateUrl: './cruz-azul.component.html',
  styleUrls: ['./cruz-azul.component.scss'],
})
export class CruzAzulComponent implements OnInit {

  source;

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


  constructor(private router: Router,
              private userService: UserService) {}

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

  ngOnInit() {
    this.source = new LocalDataSource(this.userService.CAData);
  }

  report(event, eventName: string): void {
    this.userService.setDisplayObject(event.data);
    this.userService.setDisplayObjectType('cruz-azul');
    this.router.navigate(['pages/form']);
  }

}
