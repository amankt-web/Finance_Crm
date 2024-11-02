import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LeadService {
  private apiUrl = 'http://localhost:3600/api/leads';

  constructor(private http: HttpClient) {}

  // Get all active leads
  getLeads(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  // Add a new lead
  addLead(lead: any): Observable<any> {
    return this.http.post(this.apiUrl, lead);
  }

  // Update an existing lead by ID
  updateLead(id: string, lead: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, lead);
  }

  // Soft delete a lead by ID
  deleteLead(id: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}/delete`, {}); // Soft delete
  }
  

  // Restore a soft-deleted lead by ID
  restoreLead(id: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}/restore`, {}); // Restore lead
  }

  // Permanently delete a lead by ID
  permanentlyDeleteLead(id: string): Observable<any> {
    console.log("id",id);
    return this.http.delete(`${this.apiUrl}/${id}`); // Pass the correct lead ID
  }
  
  // Get all soft-deleted leads
  getDeletedLeads(): Observable<any> {
    return this.http.get(`${this.apiUrl}/deleted`); // Get deleted leads (recycle bin)
  }
  uploadPDF(leadId: string, pdfFile: File) {
    const formData = new FormData();
    formData.append('pdfFile', pdfFile);

    return this.http.post(`${this.apiUrl}/${leadId}/upload-pdf`, formData);
  }
}
