import {Component, OnInit, ViewChild} from '@angular/core';
import {Transaction} from '../../../interface/transaction';
import {IncomeExpenseService} from '../../../service/income-expense.service';
import {BaseChartDirective} from 'ng2-charts';
import {ChartData, ChartOptions} from 'chart.js';

@Component({
  selector: 'app-graph',
  standalone: false,
  templateUrl: './graph.component.html',
  styleUrl: './graph.component.css'
})
export class GraphComponent implements OnInit{
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  selectedYear: string = '2025'; // default selected
  availableYears: string[] = []; // will populate based on data

  barChartOptions: ChartOptions<'bar'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Income and Expenses per Month'
      }
    }
  };

  barChartLabels: string[] = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];

  barChartData: ChartData<'bar'> = {
    labels: [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ],
    datasets: [
      {
        data: [],
        label: 'Income',
        backgroundColor: 'rgba(0, 200, 0, 0.7)',  // Green
        borderColor: 'rgba(0, 150, 0, 1)',
        borderWidth: 1
      },
      {
        data: [],
        label: 'Expenses',
        backgroundColor: 'rgba(255, 0, 0, 0.7)', // Red
        borderColor: 'rgba(200, 0, 0, 1)',
        borderWidth: 1
      }
    ]
  };

  incomeExpenses: Transaction[] = [];

  constructor(private incomeExpenseService: IncomeExpenseService) { }

  ngOnInit(){
    this.incomeExpenseService.getIncomeExpenseData().subscribe({
      next: data => {
        this.incomeExpenses = data;
        this.extractAvailableYears();
        this.updateChart(this.selectedYear);
      },
      error: error => {
        console.error("error fetching income/expense data:", error);
      }
    })
  }

  extractAvailableYears() {
    const years = new Set<string>();
    this.incomeExpenses.forEach(transaction => {
      const year = new Date(transaction.transactionDate).getFullYear().toString();
      years.add(year);
    });
    this.availableYears = Array.from(years).sort(); // optional: sort ascending
  }

  onYearChange() {
    this.updateChart(this.selectedYear);
  }

  updateChart(selectedYear: string) {
    const { incomeByMonth, expenseByMonth } = this.calculateYearStats(selectedYear);
    this.barChartData.datasets[0].data = incomeByMonth;
    this.barChartData.datasets[1].data = expenseByMonth;

    this.chart?.update();
  }

  calculateYearStats(selectedYear: string) {
    // Prepare a 12-month array with 0 values
    const incomeByMonth = Array(12).fill(0);
    const expenseByMonth = Array(12).fill(0);

    this.incomeExpenses.forEach(transaction => {
      const date = new Date(transaction.transactionDate);
      const year = date.getFullYear();
      const month = date.getMonth(); // 0 = January, 11 = December

      if (year.toString() === selectedYear) {
        if (transaction.type === 'INCOME') {
          incomeByMonth[month] += transaction.amount;
        } else if (transaction.type === 'EXPENSE') {
          expenseByMonth[month] += transaction.amount;
        }
      }
    });

    return { incomeByMonth, expenseByMonth };
  }
}
