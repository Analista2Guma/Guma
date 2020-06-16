import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { UsuarioService } from '../../@core/data/usuario.service';

@Component({
  selector: 'ngx-sugerencias',
  templateUrl: './sugerencias.component.html',
})
export class SugerenciasComponent implements OnInit {

  source = new LocalDataSource();
  popupData: Object[] = [];
  popup: Boolean = false;
  productInformation: Object = {
    ARTICULO: '',
    DESCRIPCION: '',
    disponible_total: 0,
    pedida_total: 0,
    reservada_total: 0,
  };

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
      cantPedirCA: {
        title: 'Cantidad Pedir (CA)',
      },
      cantPedirPriv: {
        title: 'Cantidad Pedir (Priv)',
      },
      cant_pedir_total: {
        title: 'Cantidad Pedir (Total)',
      },
    },
  };

  constructor(private userService: UsuarioService) {
    this.source = new LocalDataSource(this.userService.sugerencias);
    this.source.addFilter({field: 'pedir', search: 'PEDIR'});
  }// ,
              // private router: Router,
              // private route: ActivatedRoute) {}

  info(event) {
    const articulo = event.data['EQUIVALENCIA'];
    this.popup = true;
    this.popupData = this.userService.aggregateData.get(articulo);
    this.popupData.forEach(prod => {
      if (this.productInformation['DESCRIPCION'] === '') this.productInformation['DESCRIPCION'] = prod['DESCRIPCION'];
      if (this.productInformation['ARTICULO'] === '') this.productInformation['ARTICULO'] = prod['ARTICULO'];
      if (prod['BODEGA'] === '006') {
        this.productInformation['disponible_total'] += +(prod['md06']);
      } else {
        this.productInformation['disponible_total'] += +(prod['md_b2']);
      }

      this.productInformation['pedida_total'] += +(prod['CANT_PEDIDA']);
      this.productInformation['transito_total'] += +(prod['CANT_TRANSITO']);
      this.productInformation['reservada_total'] += +(prod['CANT_RESERVADA']);
    });
  }

  ngOnInit() {}
}
