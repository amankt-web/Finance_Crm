import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AuthService } from '../../services/auth-service.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-user-popup-component',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './add-user-popup-component.component.html',
  styleUrl: './add-user-popup-component.component.css'
})
export class AddUserPopupComponent {
  newUserEmail: string = '';
  newUserPassword: string = '';
  errorMessage: string = '';

  @Output() userAdded = new EventEmitter<void>();

  constructor(private authService: AuthService) {}

  addUser() {
    if ( !this.newUserEmail || !this.newUserPassword) {
        this.errorMessage = 'email, and password are required.';
        return;
    }

    const userData = {
        email: this.newUserEmail,
        password: this.newUserPassword
    };

    this.authService.createUser(userData).subscribe({
        next: () => {
            this.userAdded.emit(); // Emit an event when the user is added
            this.resetForm();
        },
        error: (err) => {
            console.error('Error creating user:', err); // Log the error for more insight
            this.errorMessage = err.error.message || 'Failed to create user.';
        },
    });
}

  resetForm() {
    this.newUserEmail = '';
    this.newUserPassword = '';
  }
}
