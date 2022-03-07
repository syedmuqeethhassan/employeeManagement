import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeavesdashboardComponent } from './leavesdashboard.component';

describe('LeavesdashboardComponent', () => {
  let component: LeavesdashboardComponent;
  let fixture: ComponentFixture<LeavesdashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeavesdashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LeavesdashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
