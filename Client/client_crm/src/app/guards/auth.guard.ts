import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../services/auth-service.service';
import { isPlatformBrowser } from '@angular/common'; // Import this for platform detection

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object // Inject the platform ID
  ) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    // Check if the code is running in the browser
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('token');
      const redirectTo = route.data?.['redirectTo']; // Get redirectTo data

      if (!token) {
        return true; // Allow access if not logged in
      } else if (redirectTo) {
        this.router.navigate([redirectTo]); // Redirect to specified route if already logged in
        return false;
      }
      return true; // Allow access to protected routes
    }

    // Default to not allowing activation if it's not in the browser
    return false;
  }

  logout(): void {
    // Only remove token if running in the browser
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('token');
    }
  }
}
