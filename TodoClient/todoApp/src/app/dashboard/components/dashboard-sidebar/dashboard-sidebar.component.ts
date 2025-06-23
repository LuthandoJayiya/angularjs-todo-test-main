import { Component, Input, Output, EventEmitter, ChangeDetectorRef, AfterViewInit } from '@angular/core';

interface NavItem { id: string; label: string; icon: string; route: string; }

@Component({
  selector: 'app-dashboard-sidebar',
  templateUrl: './dashboard-sidebar.component.html',
  styleUrls: ['./dashboard-sidebar.component.css'] // Or .scss if you changed it globally
})
export class DashboardSidebarComponent implements AfterViewInit {
  // @Input: Receives the 'collapsed' state from the parent component
  @Input() collapsed = false;
  // @Input: Receives the currently active tab ID from the parent
  @Input() activeTab!: string;

  // @Output: Emits an event when a tab is clicked, sending the tab ID to the parent
  @Output() toggleTab = new EventEmitter<string>();
  // @Output: Emits an event when the collapse button is clicked, notifying the parent to toggle the sidebar
  @Output() toggleCollapse = new EventEmitter<void>();

  // Defines the navigation items for the sidebar
  navItems: NavItem[] = [
    { id: 'overview', label: 'Overview', icon: 'BarChart3', route: '' },
    { id: 'tasks', label: 'Tasks', icon: 'CheckCircle', route: 'tasks' },
    { id: 'analytics', label: 'Analytics', icon: 'TrendingUp', route: 'analytics' },
    { id: 'focus', label: 'Focus Mode', icon: 'Clock', route: 'focus' },
    { id: 'goals', label: 'Personal Goals', icon: 'Target', route: 'goals' },
    { id: 'planner', label: 'Daily Planner', icon: 'Calendar', route: 'planner' },
    { id: 'priority', label: 'Priority Tags', icon: 'Tag', route: 'priority' },
    { id: 'productivity', label: 'Productivity Insights', icon: 'Activity', route: 'productivity' },
    { id: 'settings', label: 'Settings', icon: 'Settings', route: 'settings' },
  ];

  constructor(private cd: ChangeDetectorRef) {}

  ngAfterViewInit(): void {
    this.cd.detectChanges();
  }

  /**
   * Emits the ID of the clicked navigation tab to the parent component.
   * @param id The ID of the clicked tab.
   */
  toggleTabClick(id: string) {
    this.toggleTab.emit(id);
  }

  /**
   * Emits an event to the parent component to toggle the sidebar's collapsed state.
   * This component does NOT change its own 'collapsed' state directly.
   */
  toggleCollapseClick() {
    this.toggleCollapse.emit();
  }
}
