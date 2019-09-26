import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { SmartTableData } from '../../@core/data/smart-table';
import { Router } from '@angular/router';
import { UserService } from '../../@core/data/user.service';

@Component({
  selector: 'ngx-privado',
  templateUrl: './privado.component.html',
  styleUrls: ['./privado.component.scss'],
})
export class PrivadoComponent implements OnInit {

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

  constructor(private router: Router,
              private userService: UserService,
              private table: SmartTableData) {
    this.table.getData()
    .subscribe(res => {
      this.data = res.data;
      this.source.load(this.data);
    })
  }

  ngOnInit() {
  }

  report(event, eventName: string): void {
    this.userService.setDisplayObject(event.data);
    this.userService.setDisplayObjectType('priv');
    this.router.navigate(['pages/form']);
  }

}
