import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-dashboard-placeholder',
  template: `
    <div class="rounded-2xl p-8 text-center bg-gradient ... shadow-neu">
      <h3 class="text-2xl font-semibold text-gray-800 mb-4">{{ tab | titlecase }} Page</h3>
      <p class="text-gray-600">This section is under development. The {{ tab }} functionality will be available soon.</p>
    </div>
  `
})
export class DashboardPlaceholderComponent {
  @Input() tab!: string;
}
