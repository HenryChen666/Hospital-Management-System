import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientAdmissionRequestDialogComponent } from './patient-admission-request-dialog.component';

describe('PatientAdmissionRequestDialogComponent', () => {
  let component: PatientAdmissionRequestDialogComponent;
  let fixture: ComponentFixture<PatientAdmissionRequestDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientAdmissionRequestDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientAdmissionRequestDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
