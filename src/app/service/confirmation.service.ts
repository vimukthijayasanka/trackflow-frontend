import { Injectable } from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ConfirmationModalComponent} from '../shared/confirmation-modal/confirmation-modal.component';

@Injectable({
  providedIn: 'root'
})
export class ConfirmationService {
  constructor(private modalService: NgbModal) { }

  showConfirmation(message: string): Promise<boolean> {
    const modalRef = this.modalService.open(ConfirmationModalComponent, {
      centered: true,
      backdrop: 'static',
      keyboard: false
    });

    modalRef.componentInstance.message = message;

    return modalRef.result.then(
      (result) => !!result,   // true if confirmed
      () => false             // false if dismissed
    );
  }
}
