import { Component, OnInit } from '@angular/core';
import { NgChartsModule } from 'ng2-charts';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GraphService } from '../../services/graph.service';
import { ChartData, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, NgChartsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  selectedMonth: string = 'January';
  selectedYear: number = new Date().getFullYear();
  months: string[] = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  years: number[] = [];
  
  lineChartData: ChartData<'line'> = {
    labels: [],
    datasets: [{data:[], label: 'OD Premium'},
    {data:[], label: 'Net Premium'},
    {data:[], label: 'Final Premium'},
    {data:[], label: 'TP Premium'},
  ]
  };

  lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
    animation: false,
    plugins: {
      tooltip: {
        enabled: true,
        callbacks: {
          title: (tooltipItems) => {
            // Tooltip title shows the date for the hovered point
            return `Date: ${tooltipItems[0].label}`;
          },
          label: (tooltipItem) => {
            // Tooltip label shows dataset label and value
            return `${tooltipItem.dataset.label}: ${tooltipItem.raw}`;
          }
        }
      },
      legend: {
        display: true,
        position: 'top'
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Date'
        }
      },
      y: {
        title: {
          display: true,
          text: 'Premium Value'
        }
      }
    }
  };
  

  constructor(private graphService: GraphService) {}

  ngOnInit() {
    this.getGraphsData();
    this.populateYears();
  }

  getGraphsData() {
    this.graphService.getGraphsData(this.selectedMonth, this.selectedYear).subscribe(data => {
      this.prepareLineChartData(data);
    });
  }

  prepareLineChartData(data: any) {
    this.lineChartData.labels = data.map((item: any) => item.date);
    this.lineChartData.datasets = [
      {
        data: data.map((item: any) => item.odPremium),
        label: 'OD Premium',
        borderColor: '#3e95cd',
        fill: false
      },
      {
        data: data.map((item: any) => item.netPremium),
        label: 'Net Premium',
        borderColor: '#8e5ea2',
        fill: false
      },
      {
        data: data.map((item: any) => item.finalPremium),
        label: 'Final Premium',
        borderColor: '#3cba9f',
        fill: false
      },
      {
        data: data.map((item: any) => item.tpPremium),
        label: 'TP Premium',
        borderColor: '#e8c3b9',
        fill: false
      }
    ];
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
