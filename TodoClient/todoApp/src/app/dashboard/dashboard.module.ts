import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, Home, User, Lock, Mail, Eye, EyeOff, AlertCircle, CheckCircle, Clock, TrendingUp, Users, Menu, BarChart3, Settings, Bell, Sun , X, Moon, Target, Calendar, Tag, Activity, Plus, Search, Trash, Pencil, Check, Play } from 'lucide-angular';
import { DashboardSidebarComponent } from './components/dashboard-sidebar/dashboard-sidebar.component';
import { DashboardHeaderComponent } from './components/dashboard-header/dashboard-header.component';
import { DashboardStatsComponent } from './components/dashboard-stats/dashboard-stats.component';
import { DashboardChartsComponent } from './components/dashboard-charts/dashboard-charts.component';
import { DashboardRecentComponent } from './components/dashboard-recent/dashboard-recent.component';
import { DashboardPlaceholderComponent } from './components/dashboard-placeholder/dashboard-placeholder.component';
import { TaskflowDashboardComponent } from './pages/taskflow-dashboard/taskflow-dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { TasksComponent } from './pages/tasks/tasks.component';
import { TaskModalComponent } from './modals/task-modal/task-modal.component';
import { NotificationModalComponent } from './modals/notification-modal/notification-modal.component';

@NgModule({
  declarations: [
    DashboardSidebarComponent,
    DashboardHeaderComponent,
    DashboardStatsComponent,
    DashboardChartsComponent,
    DashboardRecentComponent,
    DashboardPlaceholderComponent,
    TaskflowDashboardComponent,
    TasksComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    LucideAngularModule.pick({ Home, User, Lock, Mail, Eye, EyeOff, AlertCircle, CheckCircle, Clock, TrendingUp, Users, Menu, BarChart3, Settings, Bell, Sun, X, Moon, Target, Calendar, Tag, Activity, Plus, Search, Trash, Pencil, Check, Play }),
    DashboardRoutingModule,
    TaskModalComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  entryComponents: [
    TaskModalComponent
  ]
})
export class DashboardModule { }
