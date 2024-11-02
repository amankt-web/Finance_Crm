import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

// Define an interface for the lead data structure
export interface Lead {
  Name: String,
  PolicyName: String,
  PolicyType: String,
  ClassOfVehicle: String,
  ProductType: String,
  policyEndDate: Date,
  mobileNumber: String,
  vehicleType: String,
  PolicyStartDate: Date,
  BookedIn: String,
  AgentName: String,
  InsuranceCompany: String,
  Product: String,
  PolicyNumber: String,
  BusinnessType: String,
  VehicleMake: String,
  PolicyIssueDate: Date,
  VehicleModel: String,
  VehicleRegNo: String,
  YearOFMFG: String,
  GVW: String,
  SumInsured: String,
  NCB: String,
  ODPremium: String,
  TPPremimum: String,
  Other: String,
  NetPremimum: String,
  GST: String,
  FinalPremimum: String,
  CutPay: String,
  BalanceAmount: String,
  PaymentMode: String,
  CheckNumber: String,
  Bank: String,
  PORate: String,
  POAmount: String,
  TDSRate: String,
  TDSAmount: String,
  FinalPayableAmount: String,
  CORate: String,
  COAmount: String
}

@Injectable({
  providedIn: 'root'
})
export class DisplayServiceService {
  private apiUrl = 'http://localhost:3600/api/leads';  // API URL

  constructor(private http: HttpClient) {}

  // // Method to add leads by making a POST request to the backend
  // addLead(data: Lead): Observable<Lead> {
  //   const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  //   return this.http.post<Lead>(this.apiUrl, data, { headers });
  // }

  // // Method to get all leads by making a GET request to the backend
  // getLeads(): Observable<Lead[]> {
  //   return this.http.get<Lead[]>(this.apiUrl);
  // }
  // Method to add multiple leads
  addLeads(data: Lead[]): Observable<Lead[]> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<Lead[]>(`${this.apiUrl}/bulk`, data, { headers });
  }

  // Method to get all leads
  getLeads(): Observable<Lead[]> {
    return this.http.get<Lead[]>(this.apiUrl);
  }

}
