import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { DashboardComponent } from './dashboard.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
//import { PopupsComponent } from '../miscellaneous/popups/popups.component';
import { NgxPopoverFormComponent } from '../miscellaneous/popups/popover-examples.component';


@NgModule({
  imports: [
    ThemeModule,
    Ng2SmartTableModule,
  ],
  declarations: [
    DashboardComponent,
    NgxPopoverFormComponent,
    //PopupsComponent,
  ],
  entryComponents: [
    NgxPopoverFormComponent,
    //PopupsComponent,
  ],
})
export class DashboardModule { }
