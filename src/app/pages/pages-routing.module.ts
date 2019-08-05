import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CruzAzulComponent } from './cruz-azul/cruz-azul.component';
import { PrivadoComponent } from './privado/privado.component';
import { FormComponent } from './form/form.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'dashboard',
      component: DashboardComponent,
    },
    {
      path: 'cruz-azul',
      component: CruzAzulComponent,
    },
    {
      path: 'privado',
      component: PrivadoComponent,
    },
    {
      path: 'form',
      component: FormComponent,
    },
    {
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full',
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
