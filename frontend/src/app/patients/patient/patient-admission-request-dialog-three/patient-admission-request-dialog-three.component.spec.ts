import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientAdmissionRequestDialogThreeComponent } from './patient-admission-request-dialog-three.component';

describe('PatientAdmissionRequestDialogThreeComponent', () => {
  let component: PatientAdmissionRequestDialogThreeComponent;
  let fixture: ComponentFixture<PatientAdmissionRequestDialogThreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientAdmissionRequestDialogThreeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientAdmissionRequestDialogThreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
