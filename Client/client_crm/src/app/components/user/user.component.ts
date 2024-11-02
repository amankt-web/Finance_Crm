import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth-service.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AddUserPopupComponent } from '../add-user-popup-component/add-user-popup-component.component';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule, FormsModule,AddUserPopupComponent ], // Add the popup component to imports
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserManagementComponent implements OnInit {
  users: any[] = [];
  showAddUserPopup: boolean = false;
  newUserEmail: string = '';
  newUserPassword: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.getUsers();
  }

  // Fetch users from the server
  getUsers() {
    this.authService.getUsers().subscribe((users) => {
      this.users = users;
    });
  }

  // Open the popup to add a user
  openAddUserPopup() {
    this.showAddUserPopup = true;
  }

  // Close the popup
  closePopup() {
    this.showAddUserPopup = false;
    this.newUserEmail = '';
    this.newUserPassword = '';
    this.errorMessage = '';
  }

  // Add the user (handles the form submission)
  addUser() {
    this.authService.createUser({ email: this.newUserEmail, password: this.newUserPassword }).subscribe({
      next: () => {
        this.getUsers(); // Refresh the user list after adding
        this.closePopup(); // Close the popup after the user is added
      },
      error: () => {
        this.errorMessage = 'Failed to create user.';
      },
    });
  }

  // Delete a user
  deleteUser(userId: string) {
    this.authService.deleteUser(userId).subscribe(() => {
      this.getUsers(); // Refresh the user list after deletion
    });
  }

  // Edit an existing user (For future functionality)
  editUser(user: any) {
    // Open popup with user details pre-filled for editing
    this.newUserEmail = user.email;
    this.showAddUserPopup = true;
    // Additional logic to edit the user can go here.
  }
  loginAsUser(userId: string) {
    // Fetch a new token for the user from the backend
    this.authService.loginAsUser(userId).subscribe({
      next: (response) => {
        localStorage.setItem('token', response.token); // Store the token in localStorage
        this.router.navigate(['/user-dashboard']); // Redirect to the user dashboard
      },
      error: () => {
        alert('Login failed.');
      },
    });
  }
  
  
  
}
