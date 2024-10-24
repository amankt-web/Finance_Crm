import { Component } from '@angular/core';
import { LeadService } from '../../services/lead-service.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-more',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './more.component.html',
  styleUrl: './more.component.css'
})
export class MoreComponent {
  deletedLeads: any[] = []; // To hold the deleted leads

  constructor(private leadService: LeadService) {}

  restoreLead(id: string): void {
    this.leadService.restoreLead(id).subscribe(
      (response) => {
        console.log('Lead restored');
        this.getDeletedLeads();  // Refresh the recycle bin
      },
      (error) => {
        console.error('Error restoring lead', error);
      }
    );
  }

  deletePermanently(id: string): void {
    this.leadService.permanentlyDeleteLead(id).subscribe(
      (response) => {
        console.log('Lead permanently deleted');
        this.getDeletedLeads();  // Refresh the recycle bin
      },
      (error) => {
        console.error('Error permanently deleting lead', error);
      }
    );
  }

  getDeletedLeads(): void {
    this.leadService.getDeletedLeads().subscribe(
      (leads) => {
        this.deletedLeads = leads;
      },
      (error) => {
        console.error('Error fetching deleted leads', error);
      }
    );
  }

  ngOnInit(): void {
    this.getDeletedLeads(); // Fetch deleted leads when component initializes
  }
  
}
