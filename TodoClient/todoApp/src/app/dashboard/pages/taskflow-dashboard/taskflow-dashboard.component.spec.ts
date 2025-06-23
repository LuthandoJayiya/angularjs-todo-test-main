import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskflowDashboardComponent } from './taskflow-dashboard.component';

describe('TaskflowDashboardComponent', () => {
  let component: TaskflowDashboardComponent;
  let fixture: ComponentFixture<TaskflowDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskflowDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskflowDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
