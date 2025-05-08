import {Component, OnInit} from '@angular/core';
import {Transaction} from '../../transaction';
import {IncomeExpenseService} from '../../service/income-expense.service';
import {NotificationService} from '../../service/notification.service';

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

  constructor(private incomeExpenseService: IncomeExpenseService, private notificationService: NotificationService) {
  }

  ngOnInit() {
    this.incomeExpenseService.getIncomeExpenseData().subscribe(
      {
        next: data => {
          this.incomeExpenseData = data;
          this.calculateTotals();
        },
        error: err => {
          console.log(err);
          this.notificationService.showNotification("Failed to load your data, retry again", "error");
        }
      });
  }

  calculateTotals(){
    this.totalIncome = this.calculateTotalByType('INCOME');
    this.totalExpenses = this.calculateTotalByType('EXPENSE');
    this.totalLoan = this.calculateTotalByKeyword('loan');
    this.totalSavings = this.totalIncome - this.totalExpenses; // only for display service
  }

  calculateTotalByType(type: string): number {
    return this.incomeExpenseData
      .filter(transaction => transaction.type == type)
      .reduce((acc, t) => acc + t.amount, 0);
  }

  calculateTotalByKeyword(keyword: string): number {
    return this.incomeExpenseData
      .filter(transaction => transaction.description.toLowerCase().includes(keyword))
      .reduce((acc, t) => acc + t.amount, 0);
  }

  percentageOfLoan(): number {
    return this.totalIncome ? (this.totalLoan / this.totalIncome) * 100 : 0;
  }

  percentageOfSavings(): number {
    return this.totalIncome ? (this.totalSavings / this.totalIncome) * 100 : 0;
  }

  percentageOfIncomeUsed(): number {
    return this.totalIncome !== 0 ? (this.totalSavings / this.totalIncome) * 100 : 0;
  }

  percentageOfExpense(): number {
    return this.totalIncome !== 0 ? (this.totalExpenses / this.totalIncome) * 100 : 0;
  }
}
