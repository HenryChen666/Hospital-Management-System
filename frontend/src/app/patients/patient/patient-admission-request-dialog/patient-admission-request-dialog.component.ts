import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Patient } from '../../model/patient';

@Component({
  selector: 'app-patient-admission-request-dialog',
  templateUrl: './patient-admission-request-dialog.component.html',
  styleUrls: ['./patient-admission-request-dialog.component.css']
})
export class PatientAdmissionRequestDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<PatientAdmissionRequestDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Patient) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }

}
