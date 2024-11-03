import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReminderService {
  private apiUrl = `${environment.apiUrl}/reminders`; // Your API endpoint

  constructor(private http: HttpClient) {}

  getReminders(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}