import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Routes } from '@angular/router';
import { Patient } from '../model/patient';
//import { PatientsService } from '../service/patients.service';
import { RegisterDbService } from '../firestore/register-db.service';
import { MatDialog } from '@angular/material/dialog';
import { UpdatePatientModalComponent } from '../patient/update-patient-modal/update-patient-modal.component';
import { PrescribeMedicationModalComponent } from '../patient/prescribe-medication-modal/prescribe-medication-modal.component';
import {
  AngularFirestore,
  DocumentChangeAction,
  DocumentReference,
} from '@angular/fire/firestore';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css'],
})
export class PatientComponent implements OnInit {
  selectedPatient: Patient;
  patients: Patient[] = [];
  patientId: string;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private firestore: AngularFirestore,
    public dialog: MatDialog,
    private store: RegisterDbService
  ) {}

  id: string;
  firstName: string;
  lastName: string;
  address: string;
  phoneNumber: string;
  dateOfBirth: string;
  gender: string;
  martialStatus: string;
  externalDoctorId: string;
  nextOfKin: string;

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const id = params.id;

      var docRef = this.firestore.collection('user').doc(id);
      docRef
        .get()
        .toPromise()
        .then((doc) => {
          if (doc.exists) {
            let patient = doc.data() as Patient;
            console.log('Document data:',patient.id);

            this.selectedPatient = new Patient(
              patient.id,
              patient.firstName,
              patient.lastName,
              patient.address,
              patient.phoneNumber,
              patient.dateOfBirth,
              patient.gender,
              patient.martialStatus,
              patient.externalDoctorId,
              patient.nextOfKin
            );

            console.log('patient', this.selectedPatient);
          } else {
            // doc.data() will be undefined in this case
            console.log('No such document!');
          }
        })
        .catch(function (error) {
          console.log('Error getting document:', error);
        });
    });
  }

  update(): void {
    let dialogRef = this.dialog.open(UpdatePatientModalComponent, {
      data: {
        id: this.selectedPatient.id,
        firstName: this.selectedPatient.firstName,
        lastName: this.selectedPatient.lastName,
        address: this.selectedPatient.address,
        phoneNumber: this.selectedPatient.phoneNumber,
        dateOfBirth: this.selectedPatient.dateOfBirth,
        gender: this.selectedPatient.gender,
        martialStatus: this.selectedPatient.martialStatus,
        externalDoctorId: this.selectedPatient.externalDoctorId,
        nextOfKin: this.selectedPatient.nextOfKin,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  discharge() {
    this.firestore
      .collection('request')
      .doc(this.selectedPatient.id)
      .delete()
      .then(function () {
        console.log('This patient has been discharged!');
      })
      .catch(function (error) {
        console.error('Error discharging patient', error);
      });
  }
  request() {
    this.firestore.collection('request').doc(this.selectedPatient.id).set({
      id: this.selectedPatient.id,
      firstName: this.selectedPatient.firstName,
      lastName: this.selectedPatient.lastName,
      phoneNumber: this.selectedPatient.phoneNumber,
      dateOfBirth: this.selectedPatient.dateOfBirth,
    });
  }

  prescribe(): void {
    //this.router.navigate(['./', value], { relativeTo: this.route });
    let dialogRef = this.dialog.open(PrescribeMedicationModalComponent, {
      //Drug’s number
      // • Drug Name
      // • Units by day
      // • Number of administration per day
      // • Listing of each administration time of day with number of units administered
      //  ©S. Somé
      // • Method of administration
      // • Start and finish date
      data: {
        id: this.selectedPatient.id,
        firstName: this.selectedPatient.firstName,
        lastName: this.selectedPatient.lastName,
        phoneNumber: this.selectedPatient.phoneNumber,
        dateOfBirth: this.selectedPatient.dateOfBirth,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  // getPatientById(id:string): Patient{
  //   this.firestore.collection('request').doc('id').get()
  // }
}
