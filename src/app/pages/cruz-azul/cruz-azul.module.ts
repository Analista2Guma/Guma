import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CruzAzulComponent } from '../cruz-azul/cruz-azul.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';

@NgModule({
  declarations: [CruzAzulComponent],
  imports: [
    CommonModule,
    Ng2SmartTableModule,
  ],
})
export class CruzAzulModule { }
