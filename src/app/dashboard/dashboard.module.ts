import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { MenubarComponent } from './menubar/menubar.component';
import {FormsModule} from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { SummaryCardComponent } from './summary-card/summary-card.component';
import { GraphComponent } from './graph/graph.component';
import { TransactionTableComponent } from './transaction-table/transaction-table.component';
import { NavbarComponent } from './navbar/navbar.component';


@NgModule({
  declarations: [
    DashboardComponent,
    MenubarComponent,
    HomeComponent,
    SummaryCardComponent,
    GraphComponent,
    TransactionTableComponent,
    NavbarComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FormsModule
  ]
})
export class DashboardModule { }
