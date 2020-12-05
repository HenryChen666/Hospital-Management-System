import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogDataThree } from '../patient.component';

@Component({
  selector: 'app-patient-admission-request-dialog-three',
  templateUrl: './patient-admission-request-dialog-three.component.html',
  styleUrls: ['./patient-admission-request-dialog-three.component.css']
})
export class PatientAdmissionRequestDialogThreeComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<PatientAdmissionRequestDialogThreeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogDataThree) {
      console.log(data);
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }

}
