import { Component, OnInit } from '@angular/core';
import { Task } from './task.model';
import { TaskModalComponent, ModalMode } from '../../modals/task-modal/task-modal.component';
import { ThemeService } from '../../../core/theme.service';
import { TaskService } from '../../../services/task.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
    constructor(public themeService: ThemeService, private taskService: TaskService) {}
  
    get theme(): any {
      return this.themeService.getCurrentTheme();
    }
  
    get isDarkMode(): boolean {
      return this.themeService.isDarkMode();
    }
  
    toggleTheme(): void {
      this.themeService.toggleDarkMode();
    }

  tasks: Task[] = [];
  filteredTasks: Task[] = [];
  filterStatus = 'all';
  searchTerm = '';

  //modal
  modal: {
    isOpen: boolean;
    mode: ModalMode;
    task: Task | null;
  } = {
    isOpen: false,
    mode: 'create',
    task: null,
  }

  ngOnInit() {
    this.fetchTasks();
  }

  fetchTasks() {
    this.taskService.getTasks().subscribe({
      next: (tasks) => {
        this.tasks = tasks;
        this.applyFilters();
      },
      error: (err) => {
        console.error('Failed to fetch tasks:', err);
      }
    });
  }

  applyFilters() {
    this.filteredTasks = this.tasks.filter(task => {
      const matchesStatus = this.filterStatus === 'all' || task.status === this.filterStatus;
      const matchesSearch = task.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                           task.description.toLowerCase().includes(this.searchTerm.toLowerCase());
      return matchesStatus && matchesSearch;
    });
  }

  onFilterChange() {
    this.applyFilters();
  }

  onSearchChange() {
    this.applyFilters();
  }

  openAddModal() {
    this.modal = {
      isOpen: true,
      mode: 'create',
      task: null
    };
  }

  openEditModal(task: Task) {
    this.modal = {
      isOpen: true,
      mode: 'edit',
      task: task
    };
  }

  openViewModal(task: Task) {
    this.modal = {
      isOpen: true,
      mode: 'view',
      task: task
    };
  }

  closeModals() {
    this.modal = {
      isOpen: false,
      mode: 'create',
      task: null
    };
  }

  addTask(task: Task) {
    if (task.title.trim()) {
      const newTask: Task = {
        ...task,
        id: Date.now().toString(),
        status: 'pending',
        createdAt: new Date(),
        updatedAt: new Date()
      };
      this.taskService.createTask(newTask).subscribe({
        next: (createdTask) => {
          this.tasks.unshift(createdTask);
          this.applyFilters();
          this.closeModals();
        },
        error: (err) => {
          console.error('Failed to create task:', err);
        }
      });
    }
  }

  updateTask(task: Task) {
    if (task.title.trim()) {
      this.taskService.updateTask(task.id, task).subscribe({
        next: (updatedTask) => {
          const index = this.tasks.findIndex(t => t.id === updatedTask.id);
          if (index !== -1) {
            this.tasks[index] = updatedTask;
            this.applyFilters();
            this.closeModals();
          }
        },
        error: (err) => {
          console.error('Failed to update task:', err);
        }
      });
    }
  }

  deleteTask(taskId: string) {
    if (confirm('Are you sure you want to delete this task?')) {
      this.taskService.deleteTask(taskId).subscribe({
        next: () => {
          this.tasks = this.tasks.filter(t => t.id !== taskId);
          this.applyFilters();
        },
        error: (err) => {
          console.error('Failed to delete task:', err);
        }
      });
    }
  }

  startTask(taskId: string) {
    const task = this.tasks.find(t => t.id === taskId);
    if (task && task.status === 'pending') {
      task.status = 'in-progress';
      task.updatedAt = new Date();
      this.applyFilters();
    }
  }

  completeTask(taskId: string) {
    const task = this.tasks.find(t => t.id === taskId);
    if (task && task.status !== 'completed') {
      task.status = 'completed';
      task.updatedAt = new Date();
      this.applyFilters();
    }
  }

  getStatusBadgeClass(status: string): string {
    switch (status) {
      case 'pending': return 'badge-pending';
      case 'in-progress': return 'badge-progress';
      case 'completed': return 'badge-completed';
      default: return 'badge-pending';
    }
  }

  getPriorityBadgeClass(priority: string): string {
    switch (priority) {
      case 'low': return 'badge-low';
      case 'medium': return 'badge-medium';
      case 'high': return 'badge-high';
      default: return 'badge-medium';
    }
  }

  getTaskStats() {
    return {
      total: this.tasks.length,
      pending: this.tasks.filter(t => t.status === 'pending').length,
      inProgress: this.tasks.filter(t => t.status === 'in-progress').length,
      completed: this.tasks.filter(t => t.status === 'completed').length
    };
  }
}