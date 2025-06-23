import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-dashboard-stats',
  templateUrl: './dashboard-stats.component.html'
})
export class DashboardStatsComponent {
  @Input() totalTasks!: number;
  @Input() completedTasks!: number;
  @Input() inProgressTasks!: number;
  @Input() completionRate!: number;
}
