import { Component } from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthService} from '../../../service/auth.service';
import {NotificationService} from '../../../service/notification.service';

@Component({
  selector: 'app-sign-up',
  standalone: false,
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {
  user= {
    userName:'',
    firstName:'',
    lastName:'',
    dob:'',
    email:'',
    password:''
  };

  constructor(private authService: AuthService, private notificationService: NotificationService) { }

  onSubmit(form: HTMLFormElement, ngForm: NgForm){
    if (ngForm.invalid) {
      const elm = <HTMLInputElement>form.querySelector('.ng-invalid');
      elm.focus();
      elm.select();
      this.notificationService.showNotification("Please fill all the fields as required", "error");
    } else{
      if(this.validateForm()){
        this.authService.signup(this.user).subscribe({
          next: res => {
            this.notificationService.showNotification("Registration is succeed, Now you can LogIn", "success");
          },
          error: err => {
            this.notificationService.showNotification("Registration Failed", "error");
          }
        });
        ngForm.reset();
      } else {
        this.notificationService.showNotification("Invalid Registration", "error");
      }
    }
  }

  validateForm(){
    return true;
  }
}
