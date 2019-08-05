import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { PagesRoutingModule } from './pages-routing.module';
import { ThemeModule } from '../@theme/theme.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import { CruzAzulModule } from './cruz-azul/cruz-azul.module';
import { PrivadoModule } from './privado/privado.module';
import { FormComponent } from './form/form.component';

const PAGES_COMPONENTS = [
  PagesComponent,
];

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    DashboardModule,
    MiscellaneousModule,
    CruzAzulModule,
    PrivadoModule,
  ],
  declarations: [
    ...PAGES_COMPONENTS,
    FormComponent,
  ],
})
export class PagesModule {
}
