import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogDataTwo } from '../patient.component';

@Component({
  selector: 'app-patient-admission-request-dialog-two',
  templateUrl: './patient-admission-request-dialog-two.component.html',
  styleUrls: ['./patient-admission-request-dialog-two.component.css']
})
export class PatientAdmissionRequestDialogTwoComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<PatientAdmissionRequestDialogTwoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogDataTwo) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }

}
