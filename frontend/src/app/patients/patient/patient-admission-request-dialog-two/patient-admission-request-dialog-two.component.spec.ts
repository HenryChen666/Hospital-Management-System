import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientAdmissionRequestDialogTwoComponent } from './patient-admission-request-dialog-two.component';

describe('PatientAdmissionRequestDialogTwoComponent', () => {
  let component: PatientAdmissionRequestDialogTwoComponent;
  let fixture: ComponentFixture<PatientAdmissionRequestDialogTwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientAdmissionRequestDialogTwoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientAdmissionRequestDialogTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
