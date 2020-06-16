import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrivadoComponent } from './privado.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';

@NgModule({
  declarations: [PrivadoComponent],
  imports: [
    CommonModule,
    Ng2SmartTableModule,
  ],
})
export class PrivadoModule { }
