import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GraphService {
  private apiUrl = 'http://localhost:3600/api/graphs';

  constructor(private http: HttpClient) {}

  getGraphsData(month: string, year: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?month=${month}&year=${year}`).pipe(
      catchError(error => {
        console.error('Error fetching graph data:', error);
        return throwError(error);
      })
    );
  }
}
