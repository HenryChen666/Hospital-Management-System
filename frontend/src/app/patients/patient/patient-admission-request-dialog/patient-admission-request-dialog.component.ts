import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from '../patient.component';
import { AuthenticationService } from '../../../security/authentication.service';
import { Doctor } from '../../model/patient';

@Component({
  selector: 'app-patient-admission-request-dialog',
  templateUrl: './patient-admission-request-dialog.component.html',
  styleUrls: ['./patient-admission-request-dialog.component.css']
})
export class PatientAdmissionRequestDialogComponent implements OnInit {
  doctors: Doctor[] = [];
  constructor(
    public dialogRef: MatDialogRef<PatientAdmissionRequestDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private authService: AuthenticationService) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.authService.getDoctor().subscribe(
      data => {
        this.doctors = data as Doctor[];
        console.log(this.doctors);
      },
      error => {
        console.log("error bro");
        /*this._snackBar.open('Registration ' + error.error.message, 'Close', {
          duration: 3000
        });*/
      }
    );
  }

}
