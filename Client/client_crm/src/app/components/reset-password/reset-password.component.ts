import { Component } from '@angular/core';
import { AuthService } from '../../services/auth-service.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent {
  currentPassword: string = '';
  newPassword: string = '';
  confirmPassword: string = '';
  errorMessage: string = '';
  successMessage: string = '';
  isPopupVisible: boolean = true;

  constructor(private authService: AuthService) {}

  resetPassword() {
    if (this.newPassword !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match!';
      return;
    }
    
    const payload = {
      currentPassword: this.currentPassword,
      newPassword: this.newPassword,
    };

    
    // Call the backend API to reset the password
    this.authService.resetPassword(payload).subscribe(
      (response) => {
        this.successMessage = 'Password successfully changed!';
        this.errorMessage = '';
      },
      (error) => {
        this.errorMessage = 'Failed to reset password!';
        this.successMessage = '';
      }
    );
  }

  

  closePopup() {
    this.isPopupVisible = false; // Hide the popup when close button is clicked
  }
  
}
