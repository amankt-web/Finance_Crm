import {RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { LoginComponent } from './components/login/login.component';
import { LayoutComponent } from './components/layout/layout.component';
import { UserManagementComponent } from './components/user/user.component';
import { LogoutComponent } from './components/logout/logout.component';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './guards/auth.guard';
import { UserLoginComponent } from './components/user-login/user-login.component';
import { LeadComponent } from './components/leads/lead/lead.component';
import { ReminderMonthComponent } from './components/leads/reminder-month/reminder-month.component';
import { AgentsComponent } from './components/agents/agents.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';


export const routes: Routes = [
  { path: '', component:HomeComponent },
  { path: 'login', component: LoginComponent},
  { path: 'user/login', component: UserLoginComponent },
  { path: 'layout', component: LayoutComponent, canActivate: [AuthGuard] },
  { path: 'allLeads', component: LeadComponent, canActivate: [AuthGuard] },
  { path: 'renewal', component: ReminderMonthComponent, canActivate: [AuthGuard] },
  { path: 'user', component: UserManagementComponent, canActivate: [AuthGuard] },
  { path: 'agents', component: AgentsComponent, canActivate: [AuthGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'logout', component: LogoutComponent},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
  })
  export class AppRoutingModule {}