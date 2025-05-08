import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {AuthService} from '../../../service/auth.service';
import {NotificationService} from '../../../service/notification.service';

@Component({
  selector: 'app-sign-in',
  standalone: false,
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {
  user={
    userName:'',
    password:''
  };

  constructor(private router: Router, private authService: AuthService, private notificationService: NotificationService) {}

  onSubmit(form:HTMLFormElement, ngForm:NgForm){
    this.authService.login(this.user).subscribe(
      {
        next: res => {
          localStorage.setItem('user', JSON.stringify(res));

          // After login success, navigate to dashboard
          this.router.navigate(['/dashboard']);
        },
        error: err => {
          this.notificationService.showNotification("Check your username or password", 'error')
        }
      });
    ngForm.reset();
  }
}
