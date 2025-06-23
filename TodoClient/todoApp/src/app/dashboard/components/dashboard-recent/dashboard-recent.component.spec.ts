import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardRecentComponent } from './dashboard-recent.component';

describe('DashboardRecentComponent', () => {
  let component: DashboardRecentComponent;
  let fixture: ComponentFixture<DashboardRecentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardRecentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardRecentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
