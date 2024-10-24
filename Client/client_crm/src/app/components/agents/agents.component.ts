import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AgentService } from '../../services/agent.service';

@Component({
  selector: 'app-agents',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './agents.component.html',
  styleUrls: ['./agents.component.css']
})
export class AgentsComponent implements OnInit {
  name: string = "";
  email: string = "";
  password: string = "";
  agents: any[] = [];
  showAddAgentModal: boolean = false;

  constructor(private _agentService: AgentService) {}

  ngOnInit(): void {
    this.getAgents();
  }

  // Method to open the Add Agent modal
  openAddAgentModal() {
    this.showAddAgentModal = true;
  }

  // Method to close the Add Agent modal
  closeAddAgentModal() {
    this.showAddAgentModal = false;
    this.clearFormFields();
  }

  // Register agent and close modal after success
  registerAgent() {
    const agentData = {
      name: this.name,
      email: this.email,
      password: this.password
    };

    this._agentService.addAgent(agentData).subscribe({
      next: () => {
        this.getAgents();  // Refresh the list
        this.closeAddAgentModal();  // Close the modal after adding agent
      },
      error: (err) => {
        console.error("Error registering agent:", err);
      }
    });
  }

  // Clear the form fields
  clearFormFields() {
    this.name = '';
    this.email = '';
    this.password = '';
  }

  // Get all agents
  getAgents() {
    this._agentService.getAgents().subscribe({
      next: (data: any) => {
        this.agents = data;
      },
      error: (err) => {
        console.error("Error fetching agents:", err);
      }
    });
  }

  // Delete agent
  deleteAgent(id: string) {
    this._agentService.deleteAgent(id).subscribe(() => {
      this.getAgents();  // Refresh list after deleting
    });
  }

  // Update agent logic (to be implemented)
  openUpdateForm(agent: any) {
    // Logic for updating agent
  }
}
