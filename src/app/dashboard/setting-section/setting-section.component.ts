import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {NotificationService} from '../../service/notification.service';
import {AuthService} from '../../service/auth.service';
import {NgForm} from '@angular/forms';
import {ConfirmationService} from '../../service/confirmation.service';

@Component({
  selector: 'app-setting-section',
  standalone: false,
  templateUrl: './setting-section.component.html',
  styleUrl: './setting-section.component.css'
})
export class SettingSectionComponent implements OnInit {
  userData: any ={}

  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  isEditMode: boolean = false;

  userUpdateData: any ={
    firstName: '',
    lastName: '',
    email: '',
    dob: '',
    profilePicUrl: ''
  }

  constructor(private authService: AuthService,
              private notificationService: NotificationService,
              private confirmationService: ConfirmationService) {
  }

  ngOnInit() {
    this.fetchUserData();
  }

  fetchUserData(): void {
    this.authService.getUserDetails().subscribe({
      next:data=>{
          this.userData = data;
          this.userUpdateData ={
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            dob: data.dob,
            profilePicUrl: data.profilePicUrl
          }
      },
      error:err=>{
        console.log(err);
        this.notificationService.showNotification("Error Fetching User Data", "error");
      }
    });
  }

  async onSubmit(form: HTMLFormElement, ngForm: NgForm) {
    const confirmed = await this.confirmationService.showConfirmation("Are you sure you want to update your profile?");
    if (!confirmed) return;
    if (ngForm.invalid) {
      const elm = <HTMLInputElement>form.querySelector('.ng-invalid');
      elm.focus();
      elm.select();
    } else {
      this.authService.updateUserDetails(this.userUpdateData).subscribe(
        {
          next: res => {
            this.fetchUserData(); // updated user data here
            this.isEditMode = false;
            this.notificationService.showNotification("Profile Updated Successfully", "success");
          },
          error: err => {
            console.log(err);
            this.notificationService.showNotification("Error Updating Profile", "error");
          }
        });
    }
  }

  enableEdit() {
    this.isEditMode = true; // Enter edit mode
  }

  cancelEdit() {
    this.isEditMode = false; // Exit edit mode
    this.fetchUserData(); // Reset form back to original values
  }

  uploadProfileImage(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) return;

    const file = input.files[0];
    const formData = new FormData();
    formData.append('profilePic', file);
    formData.append('previousProfilePicUrl', this.userUpdateData.profilePicUrl || '');

    this.authService.updateUserProfileImage(formData).subscribe({
      next: (url: string) => {
        this.userUpdateData.profilePicUrl = url;
      },
      error: err => {
        this.notificationService.showNotification("Error Uploading Profile Image", "error");
      }
    });
  }

  triggerFileInput() {
    this.fileInput?.nativeElement.click();
  }
}
