import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReminderMonthComponent } from './reminder-month.component';

describe('ReminderMonthComponent', () => {
  let component: ReminderMonthComponent;
  let fixture: ComponentFixture<ReminderMonthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReminderMonthComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReminderMonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
