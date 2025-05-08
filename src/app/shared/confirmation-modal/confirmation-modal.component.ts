import {Component, Input} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirmation-modal',
  standalone: false,
  templateUrl: './confirmation-modal.component.html',
  styleUrl: './confirmation-modal.component.css'
})
export class ConfirmationModalComponent {
  @Input() message: string = '';

  constructor(public activeModal: NgbActiveModal) {}

  onConfirm() {
      this.activeModal.close(true);
  }
  onCancel() {
      this.activeModal.close(false);
  }
}

