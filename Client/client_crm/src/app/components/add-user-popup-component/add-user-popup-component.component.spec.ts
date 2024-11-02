import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUserPopupComponentComponent } from './add-user-popup-component.component';

describe('AddUserPopupComponentComponent', () => {
  let component: AddUserPopupComponentComponent;
  let fixture: ComponentFixture<AddUserPopupComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddUserPopupComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddUserPopupComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
