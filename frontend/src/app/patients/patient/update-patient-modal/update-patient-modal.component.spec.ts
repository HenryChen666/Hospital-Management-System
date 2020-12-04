import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePatientModalComponent } from './update-patient-modal.component';

describe('UpdatePatientModalComponent', () => {
  let component: UpdatePatientModalComponent;
  let fixture: ComponentFixture<UpdatePatientModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdatePatientModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatePatientModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
