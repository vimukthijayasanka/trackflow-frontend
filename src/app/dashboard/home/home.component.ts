import {Component, OnInit} from '@angular/core';
import {Transaction} from '../../transaction';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  incomeExpenseData: Transaction[] = [];
  totalExpenses = 0;
  totalIncome = 0;
  totalLoan = 0;
  totalSavings = 0;
  percentageValue = 0;

  constructor() {
  }

  ngOnInit() {

  }

}
