import { Component, OnInit } from '@angular/core';
import { UserManagementComponent } from '../../user/user.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

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
    this.http.get('http://localhost:3600/api/policies').subscribe((response: any) => {
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

    const url = value ? `http://localhost:3600/api/reminders/${value}` : 'http://localhost:3600/api/reminders';

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

