import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../service/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{
  userName = '';

  constructor(private router: Router, private authService: AuthService) {
  }

  goToSettings() {
    this.router.navigate(['/dashboard/setting']);
  }

  ngOnInit() {
    this.getUserDetails();
  }

  getUserDetails(){
    this.authService.getUserDetails().subscribe({
        next: (data) =>{
          if(data){
            this.userName = data.firstName + ' ' + data.lastName;
          }
        },
        error: (error) => {
          console.log(error);
        }
      }
    )
  }

  logout() {
    this.authService.logout().subscribe(
      {
        next: res => {
          console.log(res);
          localStorage.removeItem('user');
          this.router.navigate(['']);
        },
        error: err => console.log(err)
      });
  }
}
