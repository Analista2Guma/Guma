import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { UserService } from '../../@core/data/user.service';
import { NgxPopoverFormComponent } from '../miscellaneous/popups/popover-examples.component';


@Component({
  selector: 'ngx-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {

  privData = this.userService.privData;
  caData: Object[];
  summaryData: Object[];
  source = new LocalDataSource();
  popupData: Object = {};
  popup: Boolean = false;
  formComponent = NgxPopoverFormComponent;

  settings = {
    actions: false,
    mode: 'external',
    hideSubHeader: true,
    noDataMessage: 'Cargando Datos',
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

  constructor(private userService: UserService) { // ,
              // private router: Router,
              // private route: ActivatedRoute) {

    this.userService.getCAData()
    .subscribe(caRes => {
      // console.log(caRes);
      this.caData = caRes;
      this.source.load(this.caData);
    });

    this.userService.getPrivData()
    .subscribe(privRes => {
      this.privData = privRes;
    });
  }

  info(event) {
    this.popup = true;
    this.userService.popupData = event.data;
    this.popupData = event.data;
  }
}
