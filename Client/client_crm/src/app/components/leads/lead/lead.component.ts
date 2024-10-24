import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
import moment from 'moment'; 
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { DisplayServiceService, Lead } from '../../../services/display-service.service'; // Adjust the path as necessary
import { LeadDisplayComponent } from '../lead-display/lead-display.component';

@Component({
  selector: 'app-lead',
  standalone: true,
  imports: [CommonModule, FormsModule,LeadDisplayComponent],
  templateUrl: './lead.component.html',
  styleUrls: ['./lead.component.css']
})
export class LeadComponent implements OnInit{
  public data: Lead[] = []; // Store imported data
  public filteredData: Lead[] = []; // Data after filtering
  public paginatedData: Lead[] = []; // Data for the current page
  public currentPage: number = 1; // Current page
  public itemsPerPage: number = 10; // Items per page
  public searchQuery: string = ''; // Search query
  public sortOrder: string = ''; // Sorting order
  showPopup: boolean = false; // Control the visibility of the popup
  leads : [] = [];

  constructor(private http: HttpClient, private displayService: DisplayServiceService) {}
  
  ngOnInit(): void {
    this.loadLeadsFromBackend(); // Loaded  leads from the server
  }

  // Method to load leads from the backend after importing
loadLeadsFromBackend(): void {
  this.displayService.getLeads().subscribe((leads: Lead[]) => {
    this.data = leads;
    this.filteredData = [...this.data];
    this.paginateData();
  });
}
convertToDate(dateStringOrNumber: any): Date | null {
  if (!dateStringOrNumber) return null;

  // Check if the value is a number (Excel serial number)
  if (typeof dateStringOrNumber === 'number') {
    // Convert Excel serial number to JavaScript Date
    const excelEpoch = new Date(1899, 11, 30); // Excel's epoch starts on December 30, 1899
    const convertedDate = new Date(excelEpoch.getTime() + (dateStringOrNumber * 86400000)); // 86400000 = milliseconds in a day
    return convertedDate;
  }

  // Try to parse date strings in multiple formats
  const formats = ['DD-MM-YYYY', 'MM-DD-YYYY', 'YYYY-MM-DD'];
  let date = null;

  for (const format of formats) {
    const parsedDate = moment(dateStringOrNumber, format, true);
    if (parsedDate.isValid()) {
      date = parsedDate.toDate();
      break;
    }
  }

  if (!date) {
    console.warn(`Invalid date format for: ${dateStringOrNumber}`);
  }

  return date || null;
}

  // Method to handle file upload
  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const data = e.target.result;
        const workbook = XLSX.read(data, { type: 'binary' });
        const sheetName = workbook.SheetNames[0];
        const leads: any[] = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
  
        // Validate and clean data, especially the date fields
        const cleanedLeads = leads.map((lead: any) => ({
          ...lead,  // Spread the lead object
          Name: lead.Name || '',
          InsuranceCompany: lead.InsuranceCompany || '',
          VehicleModel: lead.VehicleModel || '', 
          PolicyStartDate: this.convertToDate(lead.PolicyStartDate), // Format start date
          PolicyEndDate: this.convertToDate(lead.policyEndDate),     // Format end date
          PolicyNumber: lead.PolicyNumber || '',
          PolicyName: lead.PolicyName,
          PolicyType: lead.PolicyType,
          ClassOfVehicle: lead.ClassOfVehicle,
          ProductType: lead.ProductType,
          mobileNumber: lead.Number,
          vehicleType: lead.vehicleType,
          BookedIn: lead.BookedIn,
          AgentName: lead.AgentName,
          Product: lead.ProductType,
          BusinnessType: lead.BusinnessType,
          VehicleMake: lead.VehicleMake,
          PolicyIssueDate: this.convertToDate(lead.PolicyIssueDate), // Format issue date
          VehicleRegNo: lead.VehicleRegNo,
          YearOFMFG: lead.YearOFMFG,
          GVW: lead.GVW,
          SumInsured: lead.SumInsured,
          NCB: lead.NCB,
          ODPremium: lead.ODPremium,
          TPPremimum: lead.TPPremimum,
          Other: lead.Other,
          NetPremimum: lead.NetPremimum,
          GST: lead.GST,
          FinalPremimum: lead.FinalPremimum,
          CutPay: lead.CutPay,
          BalanceAmount: lead.BalanceAmount,
          PaymentMode: lead.PaymentMode,
          CheckNumber: lead.CheckNumber,
          Bank: lead.Bank,
          PORate: lead.PORate,
          POAmount: lead.POAmount,
          TDSRate: lead.TDSRate,
          TDSAmount: lead.TDSAmount,
          FinalPayableAmount: lead.FinalPayableAmount,
          CORate: lead.CORate,
          COAmount: lead.COAmount   
        }));
  
        this.http.post('http://localhost:3600/api/leads/bulk', cleanedLeads).subscribe(
          (response) => {
            console.log('Leads imported successfully:', response);
          },
          (error) => {
            console.error('Error importing leads:', error);
          }
        );
      };
      reader.readAsBinaryString(file);
    }
  }
  
  
  
  
  // Method to filter data based on search query
  filterData(): void {
    this.filteredData = this.data.filter(row => {
      return Object.values(row).some(cell => cell?.toString().toLowerCase().includes(this.searchQuery.toLowerCase()));
    });
    this.currentPage = 1; // Reset to first page after filtering
    this.sortData(); // Reapply sorting after filtering
    this.paginateData(); // Recalculate pagination based on filtered data
  }

  // Method to sort data based on sortOrder
  sortData(): void {
    switch (this.sortOrder) {
      case 'newest':
        this.filteredData.sort((a, b) => new Date(b.PolicyStartDate!).getTime() - new Date(a.PolicyStartDate!).getTime());
        break;
      case 'oldest':
        this.filteredData.sort((a, b) => new Date(a.PolicyStartDate!).getTime() - new Date(b.PolicyStartDate!).getTime());
        break;
      default:
        // No sorting by default
        break;
    }
    this.paginateData(); // Update pagination after sorting
  }

  // Method to export data to Excel
  exportToExcel(): void {
    // Fetch the leads from the API before exporting
    this.displayService.getLeads().subscribe(data => {
      const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data); // Use json_to_sheet to convert JSON to Excel
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Leads');
      XLSX.writeFile(wb, 'leads.xlsx');
    });
  }

  // Pagination logic
  paginateData(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    this.paginatedData = this.filteredData.slice(startIndex, startIndex + this.itemsPerPage);
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.paginateData();
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.paginateData();
    }
  }

  // Get total pages based on the filtered data
  get totalPages(): number {
    return Math.ceil(this.filteredData.length / this.itemsPerPage);
  }

  // Generate page numbers for pagination
  get pages(): number[] {
    const totalPages = this.totalPages;
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  // Method to go to a specific page
  goToPage(page: number): void {
    this.currentPage = page;
    this.paginateData();
  }

  // Method to open the popup
  openPopup(): void {
    this.showPopup = true;
  }

  // Method to close the popup
  closePopup(): void {
    this.showPopup = false;
  }

  // Handle adding the lead
  handleAddLead(leadData: Lead): void {
    // Call your service to add the lead (implement this)
    console.log('Lead added:', leadData);
    this.closePopup(); // Close the popup after submission
  }
}
