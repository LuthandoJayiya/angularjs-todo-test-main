import { Component, Input } from '@angular/core';

interface Task { id: number; title: string; description: string; status: string; category: string; dueDate: string; }

@Component({
  selector: 'app-dashboard-recent',
  templateUrl: './dashboard-recent.component.html'
})
export class DashboardRecentComponent {
  @Input() tasks: Task[] = [];
  @Input() getStatusColor!: (s: string) => string;
  hover: boolean = false;
}
