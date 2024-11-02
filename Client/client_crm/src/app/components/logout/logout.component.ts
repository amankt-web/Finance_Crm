import { Component } from '@angular/core';
import { AuthService } from '../../services/auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css'
})
export class LogoutComponent {
  constructor(private authService: AuthService, private router: Router) {
    this.logout();
  }

  logout() {
    this.authService.logout(); // Clear token
    this.router.navigate(['/login']); // Redirect to login page
  }
}
