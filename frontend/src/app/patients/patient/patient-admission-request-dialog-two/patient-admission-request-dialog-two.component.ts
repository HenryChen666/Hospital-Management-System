import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogDataTwo } from '../patient.component';
import { AuthenticationService } from '../../../security/authentication.service';
import { Doctor } from '../../model/patient';


@Component({
  selector: 'app-patient-admission-request-dialog-two',
  templateUrl: './patient-admission-request-dialog-two.component.html',
  styleUrls: ['./patient-admission-request-dialog-two.component.css']
})
export class PatientAdmissionRequestDialogTwoComponent implements OnInit {
  doctors: Doctor[] = [];
  isRetrievingDoctor: Boolean = true;

  constructor(
    public dialogRef: MatDialogRef<PatientAdmissionRequestDialogTwoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogDataTwo, private authService: AuthenticationService) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.authService.getDoctor().subscribe(
      data => {
        this.doctors = data as Doctor[];
        this.isRetrievingDoctor = false;
        console.log(this.doctors);
      },
      error => {
        console.log("error bro");
        this.doctors = [
          {
            "firstname": "Frank",
            "lastname": "Wang",
            "id": 0,
            "username": "FWang"
          },
          {
            "firstname": "Jon",
            "lastname": "Snow",
            "id": 1,
            "username": "JSnow"
          },
          {
            "firstname": "Arya",
            "lastname": "Stark",
            "id": 2,
            "username": "AStark"
          }
        ];
        this.isRetrievingDoctor = false;
        /*this._snackBar.open('Registration ' + error.error.message, 'Close', {
          duration: 3000
        });*/
      }
    );
  }

}
