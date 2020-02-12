import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { UserService } from '../../@core/data/user.service';

@Component({
  selector: 'ngx-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {

  source = new LocalDataSource();
  popupData: Object = {};
  popup: Boolean = false;

  settings = {
    actions: false,
    noDataMessage: 'Cargando Datos',
    columns: {
      DESCRIPCION: {
        title: 'Descripcion',
        width: '150%',
      },
      ARTICULO: {
        title: 'Articulo',
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
      cantPedir: {
        title: 'Cantidad Pedir (CA)',
      },
      cant_pedir_priv: {
        title: 'Cantidad Pedir (Priv)',
      },
      cant_pedir_total: {
        title: 'Cantidad Pedir (Total)',
      },
    },
  };

  constructor(private userService: UserService) {
    this.source = new LocalDataSource(Array.from(this.userService.aggregateData.values()));
    this.source.addFilter({field: 'pedir', search: 'PEDIR'});
  }// ,
              // private router: Router,
              // private route: ActivatedRoute) {}

  info(event) {
    this.popup = true;
    this.userService.popupData = event.data;
    this.popupData = event.data;
  }

  ngOnInit() {}
}
