import { Component, OnInit } from '@angular/core';
import { UserManagementComponent } from '../../user/user.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-reminder-month',
  standalone: true,
  imports: [UserManagementComponent,CommonModule,FormsModule],
  templateUrl: './reminder-month.component.html',
  styleUrl: './reminder-month.component.css'
})
export class ReminderMonthComponent implements OnInit {
  policies: any[] = [];
  statusFilter: string = ''; // Holds the current status filter
  paginatedPolicies: any[] = []; // Policies for the current page
  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalPages: number = 1;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getAllPolicies();
    
  }

  getAllPolicies() {
    this.http.get(`${environment.apiUrl}/policies`).subscribe((response: any) => {
      this.policies = response;
      this.totalPages = Math.ceil(this.policies.length / this.itemsPerPage);
      this.updatePaginatedPolicies();
    });
  }
  updatePaginatedPolicies() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedPolicies = this.policies.slice(startIndex, endIndex);
  }

  getPolicyStatus(policyEndDate: string): string {
    const today = new Date();
    const endDate = new Date(policyEndDate);
    return endDate > today ? 'Active' : 'Expired';
  }

  sendWhatsAppMessage(policy: any) {
    const message = `Hello, your policy ${policy.PolicyNumber} for ${policy.Name} is due soon.`;
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`);
  }

  sendEmail(policy: any) {
    const subject = `Policy Reminder for ${policy.PolicyNumber}`;
    const body = `Hello, your policy ${policy.PolicyNumber} for ${policy.Name} is due soon. Please review it.`;
    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePaginatedPolicies();
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedPolicies();
    }
  }
  
  getReminders(event: Event): void {
    const value = (event.target as HTMLSelectElement)?.value || '';

    const url = value ? `http://localhost:3800/api/reminders/${value}` : 'http://localhost:3800/api/reminders';

    this.http.get(url).subscribe(
      (data: any) => {
        this.policies = data;
        console.log('Policies fetched successfully:', this.policies);
      },
      (error) => {
        console.error('Error fetching policies:', error);
      }
    );
  }
  // getStatusClass(status: string | null): string {
  //   if (!status) {
  //     return 'default-class'; 
  //   }
  
  //   return status === 'pending' ? 'pending-class' : 'success-class';
  // }
  
 
}

