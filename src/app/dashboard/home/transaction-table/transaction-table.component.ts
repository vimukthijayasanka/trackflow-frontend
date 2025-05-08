import {Component, OnInit} from '@angular/core';
import {Transaction} from '../../../interface/transaction';
import {IncomeExpenseService} from '../../../service/income-expense.service';
import {NotificationService} from '../../../service/notification.service';

@Component({
  selector: 'app-transaction-table',
  standalone: false,
  templateUrl: './transaction-table.component.html',
  styleUrl: './transaction-table.component.css'
})
export class TransactionTableComponent implements OnInit{

  isEdit: boolean = false;
  incomeExpenseData: Transaction[] = [];

  constructor(private incomeExpenseService: IncomeExpenseService,
              private notificationService: NotificationService) {
  }

  ngOnInit() {
    this.fetchTransactions();
  }

  fetchTransactions() {
    this.incomeExpenseService.getIncomeExpenseData().subscribe({
      next: (data) => {
        this.incomeExpenseData = data;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  editOrDeleteTransaction( ) {
    this.isEdit = !this.isEdit;
  }

  removeTransaction(id:number) {
    this.incomeExpenseService.removeTransactionData(id).subscribe(
      {
        next: res => {
          this.notificationService.showNotification("Transaction Deleted Successfully", "success");
          this.fetchTransactions();
        },
        error: err => {
          this.notificationService.showNotification("Error Deleting Transaction", "error");
        }
      }
    )
  }
}
