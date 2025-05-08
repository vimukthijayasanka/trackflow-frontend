import { Component, OnInit } from '@angular/core';
import {IncomeExpenseService} from '../../service/income-expense.service';
import {Transaction} from '../../interface/transaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import {CalendarOptions, EventInput, EventMountArg} from '@fullcalendar/core'

@Component({
  selector: 'app-calender-section',
  standalone: false,
  templateUrl: './calender-section.component.html',
  styleUrls: ['./calender-section.component.css']
})

export class CalenderSectionComponent implements OnInit {
  constructor(private incomeExpenseService: IncomeExpenseService) {}

  incomeExpenseData: Transaction[] = [];

  ngOnInit(): void {
    this.incomeExpenseService.getIncomeExpenseData().subscribe({
      next: (data) => {
        this.incomeExpenseData = data;
        const events = this.extractCalenderEvents();
        this.calendarOptions = {...this.calendarOptions, events};
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  extractCalenderEvents(): EventInput[] {
    return this.incomeExpenseData.map(transaction => {
      const [year, month, day] = transaction.transactionDate as unknown as number[];
      return {
        title: transaction.description,
        date: new Date(year, month -1 , day + 1).toISOString().substring(0, 10),
        color: transaction.type === 'INCOME' ? 'green' : 'crimson',
      }
    });
  }

  calendarOptions = {
    plugins: [dayGridPlugin],
    initialView: 'dayGridMonth',
    events: [] as EventInput[],
    eventDidMount: (info: EventMountArg) => {
      const tooltip = info.el as HTMLElement;
      tooltip.setAttribute('title', info.event.title);
    }
  };
}
