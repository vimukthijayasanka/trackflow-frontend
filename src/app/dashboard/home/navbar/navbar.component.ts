import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../../service/auth.service';
import {ConfirmationService} from "../../../service/confirmation.service";

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{
  userName = '';

  constructor(private router: Router, private authService: AuthService, private confirmationService: ConfirmationService) {
  }

  goToSettings() {
    this.router.navigate(['/dashboard/setting-section']);
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

  async logout() {
    const confirmed = await this.confirmationService.showConfirmation("Are you sure you want to logout?");
    if (!confirmed) return;
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
