import { Component } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {NgForm} from '@angular/forms';

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

  constructor(private http: HttpClient, private router: Router) {}
  url="http://localhost:8080/app/auth/login"

  onSubmit(form:HTMLFormElement, ngForm:NgForm){
    this.http.post(this.url, this.user, {responseType: "json",withCredentials: true}).subscribe(
      {
        next: res => {
          console.log(res);
          localStorage.setItem('user', JSON.stringify(res));

          // After login success, navigate to dashboard
          this.router.navigate(['/dashboard']);
        },
        error: err => {
          console.log(err);
        }
      });
    ngForm.reset();
  }
}
