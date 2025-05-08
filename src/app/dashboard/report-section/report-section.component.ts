import {Component, OnInit} from '@angular/core';
import {IncomeExpenseService} from '../../service/income-expense.service';
import {NotificationService} from '../../service/notification.service';
import {Transaction} from '../../interface/transaction';
import jspdf from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-report-section',
  standalone: false,
  templateUrl: './report-section.component.html',
  styleUrl: './report-section.component.css'
})
export class ReportSectionComponent implements OnInit {
  constructor(private incomeExpenseService: IncomeExpenseService, private notificationService: NotificationService) {
  }
  incomeExpenseData: Transaction[] = [];
  filteredData: Transaction[] = [];

  startDate:string = '';
  endDate:string = '';

  ngOnInit() {
    this.incomeExpenseService.getIncomeExpenseData().subscribe({
      next: (data) => {
        this.incomeExpenseData = data;
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  filterTransactions(){
    if (!this.startDate || !this.endDate) this.notificationService.showNotification("Please select start and end date", "error");
    const start = new Date(this.startDate);
    const end = new Date(this.endDate);
    this.filteredData = this.incomeExpenseData.filter(transaction => {
      const transactionDate = new Date(transaction.transactionDate);
      return transactionDate >= start && transactionDate <= end;
    });
  }

  generatePDFReport() {
    const doc = new jspdf();
    doc.setFontSize(12);
    doc.setTextColor(100);
    doc.text(`From ${this.startDate} to ${this.endDate}`, 14, 30);

    const tableData = this.filteredData.map(txn => [
      new Date(txn.transactionDate).toLocaleDateString(),
      txn.type,
      txn.description,
      `${txn.type === 'INCOME' ? '+' : '-'} ${txn.amount.toFixed(2)}`
    ]);

    autoTable(doc, {
      head: [['Date', 'Type', 'Description', 'Amount']],
      body: tableData,
      startY: 40,
      styles: { fontSize: 10 },
      headStyles: { fillColor: [22, 160, 133] },
    });

    doc.save(`report_${this.startDate}_to_${this.endDate}.pdf`);
  }
}
