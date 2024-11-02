import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadDisplayComponent } from './lead-display.component';

describe('LeadDisplayComponent', () => {
  let component: LeadDisplayComponent;
  let fixture: ComponentFixture<LeadDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeadDisplayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeadDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
