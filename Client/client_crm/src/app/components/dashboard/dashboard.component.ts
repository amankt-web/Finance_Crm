import { Component, OnInit } from '@angular/core';
import { GraphService } from '../../services/graph.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  graphsData: any[] = []; // Array to hold data for the graphs
  selectedMonth: string = 'January';
  selectedYear: number = new Date().getFullYear();
  months: string[] = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  years: number[] = []; // Populate this with the desired years

  constructor(private graphService: GraphService) {}

  ngOnInit() {
    this.getGraphsData();
    this.populateYears();
  }

  getGraphsData() {
    this.graphService.getGraphsData(this.selectedMonth, this.selectedYear).subscribe(data => {
      this.graphsData = data;
      // Process data for graphing here
    });
  }

  populateYears() {
    const currentYear = new Date().getFullYear();
    for (let i = currentYear - 10; i <= currentYear; i++) {
      this.years.push(i);
    }
  }

  onFilterChange() {
    this.getGraphsData();
  }
}
