import { NgModule } from '@angular/core';
import { NbMenuModule } from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { PaginasComponent } from './paginas.component';
import { SugerenciasModule } from './sugerencias/sugerencias.module';
import { PaginasRutasModule } from './paginas-rutas.module';

import { NbCardModule, NbSpinnerModule } from '@nebular/theme';
import { FormsModule } from '@angular/forms';

import { CruzAzulModule } from './cruz-azul/cruz-azul.module';
import { PrivadoModule } from './privado/privado.module';
import { FormularioComponent } from './formulario/formulario.component';

@NgModule({
  imports: [
    PaginasRutasModule,
    ThemeModule,
    NbMenuModule,
    SugerenciasModule,
    CruzAzulModule,
    PrivadoModule,
    NbCardModule,
    FormsModule,
    NbSpinnerModule,
  ],
  declarations: [
    PaginasComponent,
    FormularioComponent,
  ],
})
export class PaginasModule {
}
