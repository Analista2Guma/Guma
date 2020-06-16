import { Component } from '@angular/core';

import { MENU_ITEMS } from './paginas-menu';

@Component({
  selector: 'ngx-paginas',
  styleUrls: ['paginas.component.scss'],
  template: `
    <ngx-one-column-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-one-column-layout>
  `,
})
export class PaginasComponent {

  menu = MENU_ITEMS;
}
