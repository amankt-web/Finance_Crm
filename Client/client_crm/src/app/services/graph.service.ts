import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GraphService {

  private apiUrl = 'http://localhost:3600/api/graphs'; // Update with your API endpoint

  constructor(private http: HttpClient) {}

  getGraphsData(month: string, year: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?month=${month}&year=${year}`);
  }
}
