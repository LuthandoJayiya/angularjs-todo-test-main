import { Component, Input } from '@angular/core';

interface DataItem { name: string; value: number; color: string; }
@Component({
  selector: 'app-dashboard-charts',
  templateUrl: './dashboard-charts.component.html'
})
export class DashboardChartsComponent {
  @Input() taskStatusData!: DataItem[];
  @Input() priorityData!: DataItem[];
  @Input() totalTasks!: number;
}
