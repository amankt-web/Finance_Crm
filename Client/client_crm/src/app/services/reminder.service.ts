import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReminderService {
  private apiUrl = 'http://localhost:3000/api/reminders'; // Your API endpoint

  constructor(private http: HttpClient) {}

  getReminders(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}