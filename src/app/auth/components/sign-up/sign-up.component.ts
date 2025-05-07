import { Component } from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthService} from '../../../service/auth.service';

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

  constructor(private authService: AuthService) { }

  onSubmit(form: HTMLFormElement, ngForm: NgForm){
    if (ngForm.invalid) {
      const elm = <HTMLInputElement>form.querySelector('.ng-invalid');
      elm.focus();
      elm.select();
    } else{
      if(this.validateForm()){
        this.authService.signup(this.user).subscribe({
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
