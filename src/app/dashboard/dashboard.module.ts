import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { MenubarComponent } from './menubar/menubar.component';
import { FormsModule} from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { SummaryCardComponent } from './home/summary-card/summary-card.component';
import { GraphComponent } from './home/graph/graph.component';
import { TransactionTableComponent } from './home/transaction-table/transaction-table.component';
import { NavbarComponent } from './home/navbar/navbar.component';
import { BaseChartDirective, provideCharts, withDefaultRegisterables} from 'ng2-charts';
import { RouterModule } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { TransactionSectionComponent } from './transaction-section/transaction-section.component';
import { FullCalendarModule } from '@fullcalendar/angular';

import {NgxParticlesModule} from '@tsparticles/angular';
import {CalenderSectionComponent} from './calender-section/calender-section.component';
import {SharedModule} from '../shared/shared.module';


@NgModule({
  declarations: [
    DashboardComponent,
    MenubarComponent,
    HomeComponent,
    SummaryCardComponent,
    GraphComponent,
    TransactionTableComponent,
    NavbarComponent,
    TransactionSectionComponent,
    CalenderSectionComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FormsModule,
    BaseChartDirective,
    RouterModule.forChild([]),
    NgxParticlesModule,
    FullCalendarModule,
    SharedModule
  ],
  providers:[provideHttpClient(), provideCharts(withDefaultRegisterables())],
})
export class DashboardModule { }
