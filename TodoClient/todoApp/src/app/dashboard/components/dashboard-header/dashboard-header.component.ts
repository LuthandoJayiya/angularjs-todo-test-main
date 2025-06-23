import { Component } from '@angular/core';
import { ThemeService } from '../../../core/theme.service';
import { TaskService } from '../../../services/task.service';
import { Task } from '../../pages/tasks/task.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard-header',
  templateUrl: './dashboard-header.component.html'
})
export class DashboardHeaderComponent {
  tasksDueSoon: Task[] = [];
  showNotifications = false;
  private taskSubscription: Subscription | undefined;

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

  openNotifications(): void {
    this.showNotifications = true;
    this.loadTasksDueSoon();
  }

  closeNotifications(): void {
    this.showNotifications = false;
  }

  loadTasksDueSoon(): void {
    if (this.taskSubscription) {
      this.taskSubscription.unsubscribe();
    }
    this.taskSubscription = this.taskService.getTasks().subscribe(tasks => {
      const now = new Date();
      const threeDaysLater = new Date();
      threeDaysLater.setDate(now.getDate() + 3);

      this.tasksDueSoon = tasks.filter(task => {
        if (!task.dueDate) return false;
        const dueDate = new Date(task.dueDate);
        return dueDate >= now && dueDate <= threeDaysLater;
      });
    });
  }

  ngOnDestroy(): void {
    if (this.taskSubscription) {
      this.taskSubscription.unsubscribe();
    }
  }
}
