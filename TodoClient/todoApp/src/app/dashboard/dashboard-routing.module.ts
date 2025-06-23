import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskflowDashboardComponent } from './pages/taskflow-dashboard/taskflow-dashboard.component';

import { TasksComponent } from './pages/tasks/tasks.component';

const routes: Routes = [
  { path: '', component: TaskflowDashboardComponent },
  { path: 'tasks', component: TasksComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
