import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth-service.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone:true,
  imports:[CommonModule,FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    const payload = { email: this.email, password: this.password };
    this.authService.adminLogin(payload).subscribe({
      next: (response) => {
        localStorage.setItem('token', response.token); // Store the JWT token
        this.router.navigate(['/layout']); // Redirect to users management page
      },
      error: (error) => {
        this.errorMessage = 'Login failed. Please try again.';
        console.error('Login error:', error);
      },
    });
  }
}
