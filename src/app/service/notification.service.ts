import { Injectable } from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {NotificationModalComponent} from '../shared/notification-modal/notification-modal.component';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private modalService: NgbModal) { }

  showNotification(message: string, type: 'success' | 'error'): void {
    const modalRef = this.modalService.open(NotificationModalComponent, {
      centered: true,
      size: 'md',
      backdrop: 'static',  // optional: prevents closing when clicking outside
      // keyboard: false,     // optional: prevents closing with ESC key
    });
    modalRef.componentInstance.message = message;
    modalRef.componentInstance.type = type;
  }
}
