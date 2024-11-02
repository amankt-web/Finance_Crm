import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AgentService {
  private apiUrl = 'http://localhost:3600/api/agents'; // Ensure this matches your backend API

  constructor(private http: HttpClient) {}

  addAgent(agent: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, agent, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  getAgents(): Observable<any> { // Changed method name to plural
    return this.http.get(this.apiUrl);
  }

  deleteAgent(agentId: string): Observable<any> { // Changed method name to deleteAgent
    return this.http.delete(`${this.apiUrl}/${agentId}`);
  }
}
