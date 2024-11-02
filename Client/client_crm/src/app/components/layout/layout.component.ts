import { Component, OnInit } from '@angular/core';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { CommonModule } from '@angular/common';
import { ReminderMonthComponent } from '../leads/reminder-month/reminder-month.component';
import { LeadComponent } from '../leads/lead/lead.component';
import { UserManagementComponent } from '../user/user.component';
import { MoreComponent } from '../more/more.component';
import { AgentsComponent } from '../agents/agents.component';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth-service.service';
import { LeadDisplayComponent } from '../leads/lead-display/lead-display.component';
import { FormsModule } from '@angular/forms';
import { ResetPasswordComponent } from '../reset-password/reset-password.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    DashboardComponent,
    LeadComponent,
    CommonModule,
    ReminderMonthComponent,
    UserManagementComponent,
    MoreComponent,
    AgentsComponent,
    LeadDisplayComponent,
    ResetPasswordComponent
  ],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
})
export class LayoutComponent implements OnInit {
  public userRole: string = '';
  public isAdmin: boolean = false;
  public isAgent: boolean = false;
  public currentComponent: any; // Declare currentComponent to store the active component
  public dashboardComponent = DashboardComponent; // Set the default component
  public leadComponent = LeadComponent;
  public reminderMonthComponent = ReminderMonthComponent;
  public userManagementComponent = UserManagementComponent;
  public moreComponent = MoreComponent;
  public agentsComponent = AgentsComponent;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    // Fetch the user role from authService
    this.userRole = this.authService.getUserRole() || '';

    // Role-based access control logic
    this.isAdmin = this.userRole === 'admin';
    this.isAgent = this.userRole === 'agent';

    // Set the default component to Dashboard on initialization
    this.currentComponent = this.dashboardComponent;
  }

  setCurrentComponent(component: any) {
    this.currentComponent = component;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  openResetPasswordPopup() {
    // Logic to open the reset password popup
    const modal = document.getElementById('resetPasswordModal');
    if (modal) {
      modal.style.display = 'block';
    }
  }
  
  
  
}
