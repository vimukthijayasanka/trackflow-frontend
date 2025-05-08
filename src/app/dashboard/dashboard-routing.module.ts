import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashboardComponent} from './dashboard.component';
import {HomeComponent} from './home/home.component';
import {TransactionSectionComponent} from './transaction-section/transaction-section.component';
import {CalenderSectionComponent} from './calender-section/calender-section.component';
import {ReportSectionComponent} from './report-section/report-section.component';
import {SettingSectionComponent} from './setting-section/setting-section.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: '', component: HomeComponent},
      { path: 'dashboard', component: HomeComponent},
      { path: 'transaction-section', component: TransactionSectionComponent},
      { path: 'calender-section', component: CalenderSectionComponent},
      { path: 'report-section', component: ReportSectionComponent},
      { path: 'setting-section', component: SettingSectionComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
