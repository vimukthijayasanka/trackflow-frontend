import {Component, Input} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-notification-modal',
  standalone: false,
  templateUrl: './notification-modal.component.html',
  styleUrl: './notification-modal.component.css'
})
export class NotificationModalComponent {
  @Input() message: string = '';
  @Input() type: 'success' | 'error' = 'success';

  constructor(public activeModal: NgbActiveModal) {}

  onCloseNotification() {
    this.activeModal.close();
  }
}
