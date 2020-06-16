import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PaginasComponent } from './paginas.component';
import { SugerenciasComponent } from './sugerencias/sugerencias.component';
import { CruzAzulComponent } from './cruz-azul/cruz-azul.component';
import { PrivadoComponent } from './privado/privado.component';
import { FormularioComponent } from './formulario/formulario.component';

const routes: Routes = [{
  path: '',
  component: PaginasComponent,
  children: [
    {
      path: 'sugerencias',
      component: SugerenciasComponent,
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
      path: 'formulario',
      component: FormularioComponent,
    },
    {
      path: '',
      redirectTo: 'paginas',
      pathMatch: 'full',
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PaginasRutasModule {
}
