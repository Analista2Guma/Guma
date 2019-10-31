import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { DashboardComponent } from './dashboard.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NbCardModule, NbSearchModule } from '@nebular/theme';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    ThemeModule,
    Ng2SmartTableModule,
    NbCardModule,
    FormsModule,
    NbSearchModule,
  ],
  declarations: [
    DashboardComponent,
  ],
})
export class DashboardModule { }
