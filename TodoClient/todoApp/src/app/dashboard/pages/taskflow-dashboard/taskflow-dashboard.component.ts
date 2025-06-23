import { Component, OnInit } from '@angular/core';
import { Task } from '../tasks/task.model';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-taskflow-dashboard',
  templateUrl: './taskflow-dashboard.component.html',
})
export class TaskflowDashboardComponent implements OnInit {
  sidebarOpen = false;
  activeTab: string = 'overview'; // Default active tab

  tasks: Task[] = [];

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.taskService.getTasks().subscribe({
      next: (tasks) => {
        this.tasks = tasks;
      },
      error: (error) => {
        console.error('Failed to load tasks:', error);
      }
    });
  }

  get totalTasks() { return this.tasks.length; }
  get completedTasks() { return this.tasks.filter(t => t.status === 'completed').length; }
  get inProgressTasks() { return this.tasks.filter(t => t.status === 'in-progress').length; }
  get completionRate() { return this.totalTasks === 0 ? 0 : Math.round((this.completedTasks / this.totalTasks) * 100); }

  get taskStatusData() {
    return [
      { name: 'Completed', value: this.completedTasks, color: '#10B981' },
      { name: 'In Progress', value: this.inProgressTasks, color: '#F59E0B' },
      { name: 'Pending', value: this.tasks.filter(t => t.status === 'pending').length, color: '#6B7280' }
    ];
  }

  get priorityData() {
    return [
      { name: 'High', value: this.tasks.filter(t => t.priority === 'high').length, color: '#EF4444' },
      { name: 'Medium', value: this.tasks.filter(t => t.priority === 'medium').length, color: '#F59E0B' },
      { name: 'Low', value: this.tasks.filter(t => t.priority === 'low').length, color: '#10B981' }
    ];
  }

  getRecentTasks() {
    return this.tasks.slice(0, 3);
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in-progress': return 'bg-yellow-100 text-yellow-800';
      case 'pending': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  }

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
    console.log('Sidebar state toggled:', this.sidebarOpen ? 'Collapsed' : 'Open');
  }

  setTab(tabId: string) {
    this.activeTab = tabId;
    console.log('Active tab set to:', this.activeTab);
  }
}
