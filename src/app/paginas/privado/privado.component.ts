import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { Router } from '@angular/router';
import { UsuarioService } from '../../@core/data/usuario.service';

@Component({
  selector: 'ngx-privado',
  templateUrl: './privado.component.html',
  styleUrls: ['./privado.component.scss'],
})
export class PrivadoComponent implements OnInit {

  source;

  settings = {
    actions: {
      edit: false,
      delete: false,
      add: false,
      position: 'right',
      custom: [
        {
          name: 'report',
          title: 'Reporte',
        },
      ],
    },
    mode: 'external',
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

  constructor(private router: Router,
              private userService: UsuarioService) {}
              // private table: SmartTableData) {}

  ngOnInit() {
    // console.log(this.userService.privData);
    this.source = new LocalDataSource(Array.from(this.userService.privData.values()));
    this.settings.noDataMessage = '0 Resultados';
  }

  report(event, eventName: string): void {
    this.userService.setDisplayObject(event.data);
    this.userService.setDisplayObjectType('privado');
    this.router.navigate(['paginas/formulario']);
  }

}
