import { Component } from '@angular/core';
import {NgForm} from '@angular/forms';
import {NotificationService} from '../../service/notification.service';
import {IncomeExpenseService} from '../../service/income-expense.service';

@Component({
  selector: 'app-transaction-section',
  standalone: false,
  templateUrl: './transaction-section.component.html',
  styleUrl: './transaction-section.component.css'
})
export class TransactionSectionComponent {

  constructor(private incomeExpenseService: IncomeExpenseService, private notificationService: NotificationService) {
  }

  transaction = {
    type: '',
    description: '',
    amount: '',
    transactionDate: ''
  };

  onSubmit(form: HTMLFormElement, ngForm: NgForm) {
    this.incomeExpenseService.createNewTransaction(this.transaction).subscribe(
      {
        next: res => {
          this.notificationService.showNotification("Transaction Added Successfully", "success");
          console.log('Response:', res);
        },
        error: err => {
          this.notificationService.showNotification("Error Adding Transaction", "error");
          console.log('Error:', err);
        }
      });
    form.reset();
  }

  clearForm(form: any) {
    form.reset();
  }
}
