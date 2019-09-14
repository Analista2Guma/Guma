import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { UserService } from '../../@core/data/user.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'ngx-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {

  privData = this.userService.privData;
  summaryData: Object[];
  source = new LocalDataSource();


  settings = {
    actions: {
      edit: false,
      delete: false,
    },
    mode: 'external',
    hideSubHeader: true,
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
      cant_pedir_ca: {
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

  constructor(private userService: UserService,
              private router: Router,
              private route: ActivatedRoute) {
    if (this.userService.CAData) {
      this.source.load(this.userService.CAData);
    } else {
      this.router.navigate(['./'], {relativeTo: this.route.parent});
    }
  }
}
