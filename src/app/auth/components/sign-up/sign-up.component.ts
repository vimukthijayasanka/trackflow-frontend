import { Component } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {NgForm} from '@angular/forms';

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

  constructor(private http: HttpClient) { }

  onSubmit(form: HTMLFormElement, ngForm: NgForm){
    if (ngForm.invalid) {
      const elm = <HTMLInputElement>form.querySelector('.ng-invalid');
      elm.focus();
      elm.select();
    } else{
      if(this.validateForm()){
        this.http.post('http://localhost:8080/app/user', this.user, {responseType: 'text'}).subscribe({
          next: res => {
            console.log(res);
          },
          error: err => {
            console.log(err)
          }
        });
        ngForm.reset();
      } else {
        console.log("Form invalid");
      }
    }
  }

  validateForm(){
    return true;
  }
}
