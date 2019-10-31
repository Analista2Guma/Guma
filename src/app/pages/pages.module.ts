import { NgModule } from '@angular/core';
import { NbMenuModule } from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { PagesRoutingModule } from './pages-routing.module';

import { NbCardModule, NbSpinnerModule } from '@nebular/theme';
import { FormsModule } from '@angular/forms';

import { CruzAzulModule } from './cruz-azul/cruz-azul.module';
import { PrivadoModule } from './privado/privado.module';
import { FormComponent } from './form/form.component';

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    DashboardModule,
    CruzAzulModule,
    PrivadoModule,
    NbCardModule,
    FormsModule,
    NbSpinnerModule,
  ],
  declarations: [
    PagesComponent,
    FormComponent,
  ],
})
export class PagesModule {
}
