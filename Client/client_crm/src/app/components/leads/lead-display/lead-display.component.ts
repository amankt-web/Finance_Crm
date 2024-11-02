import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { LeadService } from '../../../services/lead-service.service';
import { ActivatedRoute } from '@angular/router';
import { AddUserPopupComponent } from '../../add-user-popup-component/add-user-popup-component.component';
import { NgxPaginationModule } from 'ngx-pagination';
import * as XLSX from 'xlsx';


@Component({
  selector: 'app-lead-display',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule,AddUserPopupComponent,NgxPaginationModule],
  templateUrl: './lead-display.component.html',
  styleUrls: ['./lead-display.component.css'] // Fixed typo: styleUrl -> styleUrls
})
export class LeadDisplayComponent implements OnInit {
  leadForm: FormGroup;
  leads: any[] = [];
  showModal: boolean = false;
  currentPage = 1;
  itemsPerPage = 5;
  leadId: string = '';
  public searchQuery: string = '';
  public sortOrder: string = '';
  showExtraColumns: boolean = false;
  originalLeads: any[] = []; // This holds the original unfiltered leads
  selectedFile: File | null = null;
  selectedLead: any;
  filteredLeads:any [] = []; 
  isEditModalOpen: boolean = false;

  constructor(private fb: FormBuilder, private leadService: LeadService, private route: ActivatedRoute) {
    this.leadForm = this.fb.group({
      Name: ['', Validators.required],
      PolicyName: ['', Validators.required],
      PolicyType: ['', Validators.required],
      ClassOfVehicle: ['', Validators.required],
      ProductType: ['', Validators.required],
      policyEndDate: ['', Validators.required],
      mobileNumber: ['', Validators.required],
      vehicleType: ['', Validators.required],
      PolicyStartDate: ['', Validators.required],
      BookedIn: ['', Validators.required],
      AgentName: ['', Validators.required],
      InsuranceCompany: ['', Validators.required],
      Product: ['', Validators.required],
      PolicyNumber: ['', Validators.required],
      BusinnessType: ['', Validators.required],
      VehicleMake: ['', Validators.required],
      PolicyIssueDate: ['', Validators.required],
      VehicleModel: ['', Validators.required],
      VehicleRegNo: ['', Validators.required],
      YearOFMFG: ['', Validators.required],
      GVW: ['', Validators.required],
      SumInsured: ['', Validators.required],
      NCB: ['', Validators.required],
      ODPremium: ['', Validators.required],
      TPPremimum: ['', Validators.required],
      Other: ['', Validators.required],
      NetPremimum: ['', Validators.required],
      GST: ['', Validators.required],
      FinalPremimum: ['', Validators.required],
      CutPay: ['', Validators.required],
      BalanceAmount: ['', Validators.required],
      PaymentMode: ['', Validators.required],
      CheckNumber: ['', Validators.required],
      Bank: ['', Validators.required],
      PORate: ['', Validators.required],
      POAmount: ['', Validators.required],
      TDSRate: ['', Validators.required],
      TDSAmount: ['', Validators.required],
      FinalPayableAmount: ['', Validators.required],
      CORate: ['', Validators.required],
      COAmount: ['', Validators.required]
    });
    this.leadId = this.route.snapshot.paramMap.get('id') || '';
    
  }

  ngOnInit(): void {
    this.loadLeads(); 
    this.filteredLeads = [...this.leads];
   
  }

  openEditModal(lead:any){
    this.leadForm.patchValue(lead); //populate form with the lead
    this.isEditModalOpen = true; //show the modal 

  }
  // Filter leads based on search query
 // Filter leads based on search query
filterData(): void {
  if (this.searchQuery.trim() === '') {
    // If the search query is empty, reset the leads to the original data
    this.leads = [...this.originalLeads];
  } else {
    // Filter the leads based on the search query
    this.leads = this.originalLeads.filter(lead =>
      Object.values(lead).some(value =>
        typeof value === 'string' && value.toLowerCase().includes(this.searchQuery.toLowerCase())
      )
    );
  }
}

  

  sendMail(): void {
    const recipient = 'example@example.com';  // Replace with the recipient's email
    const subject = 'Greetings from my Policy admin';
    const body = 'This is a test email sent from my Policy application.';
    const mailtoLink = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;
  }
  
  openWhatsApp(): void {
    const phoneNumber = '7499157539';  // Replace with recipient's number
    const message = 'Hello, You had your pending policy';  // Customize the message
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  }
  
 
  toggleLeadDetails(lead: any): void {
    lead.showDetails = !lead.showDetails;  // Toggle details visibility
  }
  // Export data to Excel
  exportToExcel(): void {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.leads);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Leads');
    XLSX.writeFile(wb, 'leads.xlsx');
  }

  // Pagination logic
  get paginatedLeads() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.leads.slice(startIndex, startIndex + this.itemsPerPage);
  }

  nextPage() {
    if (this.currentPage < Math.ceil(this.leads.length / this.itemsPerPage)) {
      this.currentPage++;
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  // Toggle additional columns visibility
  toggleColumnDisplay() {
    this.showExtraColumns = !this.showExtraColumns;
  }

  // Open the modal to add a new lead
  openAddNewLead(): void {
    this.showModal = true;
  }

  // Close the modal
  closeModal(): void {
    this.showModal = false;
  }

  // Add a new lead using the LeadService
  addLead(): void {
    if (this.leadForm.valid) {
      const newLead = this.leadForm.value;
      this.leadService.addLead(newLead).subscribe({
        next: (lead) => {
          this.leads.push(lead);
          this.closeModal();
          this.leadForm.reset();
        },
        error: (err) => {
          console.error('Error adding lead', err);
        }
      });
    }
  }

  // Update an existing lead
  updateLead(leadId: string): void {
    if (this.leadForm.valid) {
      const updatedLead = this.leadForm.value;
      console.log("updateLead",updatedLead);
      this.leadService.updateLead(leadId, updatedLead).subscribe({
        next: (lead) => {
          this.leads = this.leads.map((l) => (l._id === leadId ? lead : l)); // Update lead in list
          this.isEditModalOpen = false ;
          this.leadForm.reset(); // Reset the form 
        },
        error: (err) => {
          console.error('Error updating lead', err);
        }
      });
    }
  }

  // Mark lead as deleted (moves to recycle bin)
  // Mark lead as deleted (permanently remove)
deleteLead(leadId: string): void {
  const confirmed = window.confirm('Are you sure you want to delete the lead? and also');
  if(confirmed){
  this.leadService.permanentlyDeleteLead(leadId).subscribe({
    next: () => {
      this.leads = this.leads.filter((lead) => lead._id !== leadId); // Remove lead from the displayed list
    },
    error: (err) => {
      console.error('Error deleting lead', err);
    }
  });
}
}



  loadLeads() {
    // Load leads from the service and assign to this.leads
    this.leadService.getLeads().subscribe((data) => {
      this.leads = data; // Adjust according to your response structure
      this.originalLeads = [...this.leads];
      if (this.leads.length) {
        this.selectedLead = this.leads[0]; // Select the first lead or handle selection appropriately
      }
    });
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      this.selectedFile = input.files[0];
    }
  }

  uploadPDF(leadId: string) {
    if (this.selectedFile) {
      this.leadService.uploadPDF(leadId, this.selectedFile).subscribe(
        (response: any) => {
          console.log('File uploaded successfully', response);
          if (this.selectedLead) {
            this.selectedLead.pdfUrl = response.pdfUrl; // Adjust according to your response structure
          }
          alert('PDF uploaded successfully!');
        },
        (error) => {
          console.error('Error uploading file:', error);
          alert('File upload failed.');
        }
      );
    } else {
      alert('Please select a file to upload.');
    }
  }
  
  
}
