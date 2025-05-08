import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-summary-card',
  standalone: false,
  templateUrl: './summary-card.component.html',
  styleUrl: './summary-card.component.css'
})
export class SummaryCardComponent {
  @Input() icon: string = '';
  @Input() label: string = '';
  @Input() amount: string = '';
  @Input() progress: number = 0;
}
