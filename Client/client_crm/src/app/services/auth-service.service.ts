import { Injectable,PLATFORM_ID,Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: any ) {}

  adminLogin(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/login`, userData).pipe(
      catchError((error) => {
        // Handle error appropriately
        return throwError('Login failed, please check your credentials.');
      })
    );
  }
  

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // Attach Authorization header with token
  getAuthHeaders(): HttpHeaders {
    const token = this.getToken();
    return token ? new HttpHeaders({ Authorization: `Bearer ${token}` }) : new HttpHeaders();
  }

  // Add this method
  decodeToken(token: string): any {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join('')
      );
      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error('Invalid token:', error);
      return null;
    }
  }


  getUserRole(): string | null {
    const token = localStorage.getItem('authToken'); // Assuming you store JWT in localStorage
    if (token) {
      const decodedToken = this.decodeToken(token);
      return decodedToken.role; // Ensure the token has the 'role' field
    }
    return null;
  }
  

  getUsers(): Observable<any> {
    return this.http.get(`${this.apiUrl}/users`, { headers: this.getAuthHeaders() }).pipe(
        catchError((error) => {
            console.error('Error fetching users:', error); // Log the error
            return throwError('Failed to fetch users.'); // Return a user-friendly error message
        })
    );
}
resetPassword(payload: { currentPassword: string; newPassword: string }): Observable<any> {
  return this.http.put(`${this.apiUrl}/users/reset-password`, payload, { headers: this.getAuthHeaders() }).pipe(
    catchError((error) => {
      console.error('Error resetting password:', error);
      return throwError('Failed to reset password.');
    })
  );
}

createUser(userData: any): Observable<any> {
  return this.http.post(`${this.apiUrl}/users`, userData, { headers: this.getAuthHeaders() }).pipe(
      catchError((error) => {
          console.error('Error creating user:', error); // Log the error for debugging
          return throwError('Failed to create user.'); // You might want to throw a more detailed error message
      })
  );
}


  deleteUser(userId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/users/${userId}`, { headers: this.getAuthHeaders() }).pipe(
      catchError((error) => {
        return throwError('Failed to delete user.');
      })
    );
  }

  logout() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('token');
    }
  }

  updateUser(userId: string, userData: { email: string; password: string }): Observable<any> {
    return this.http.put(`${this.apiUrl}/users/${userId}`, userData, { headers: this.getAuthHeaders() }).pipe(
      catchError((error) => {
        return throwError('Failed to update user.');
      })
    );
  }

  getUserById(userId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/users/${userId}`, { headers: this.getAuthHeaders() }).pipe(
      catchError((error) => {
        console.error('Error fetching user:', error);
        return throwError('Failed to fetch user.');
      })
    );
  }

  loginAsUser(userId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/users/login-as-user/${userId}`, null, { headers: this.getAuthHeaders() }).pipe(
      catchError((error) => {
        console.error('Error logging in as user:', error);
        return throwError('Failed to log in as user.');
      })
    );
  }
  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/users/login`, credentials);
  }
}
