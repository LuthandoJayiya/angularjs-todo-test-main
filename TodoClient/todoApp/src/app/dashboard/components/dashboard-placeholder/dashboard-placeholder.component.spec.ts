import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardPlaceholderComponent } from './dashboard-placeholder.component';

describe('DashboardPlaceholderComponent', () => {
  let component: DashboardPlaceholderComponent;
  let fixture: ComponentFixture<DashboardPlaceholderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardPlaceholderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardPlaceholderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
