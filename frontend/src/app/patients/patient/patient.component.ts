import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Routes } from '@angular/router';
import { Patient } from '../model/patient';
import { PatientsService } from '../service/patients.service';
import { RegisterDbService } from '../firestore/register-db.service';
import { MatDialog } from '@angular/material/dialog';
import { UpdatePatientModalComponent } from '../patient/update-patient-modal/update-patient-modal.component';
import { PrescribeMedicationModalComponent } from '../patient/prescribe-medication-modal/prescribe-medication-modal.component';
import {
  AngularFirestore,
  DocumentChangeAction,
  DocumentReference,
} from '@angular/fire/firestore';
import { PatientAdmissionRequestDialogComponent } from './patient-admission-request-dialog/patient-admission-request-dialog.component';
import { PatientAdmissionRequestDialogTwoComponent } from './patient-admission-request-dialog-two/patient-admission-request-dialog-two.component';
import { Division } from 'src/app/divisions/model/division';
import { DivisionService } from 'src/app/divisions/service/division.service';
import { Unit } from 'src/app/divisions/model/unit';


// Dialog Request Patient Admission Related.
export interface DialogData {
  selectedPatient: Patient
  priorityArray: string[],
  prioritySelected: string,
  rationale: string,
  divisions: Division[],
  divisionSelected: Division
}
export interface DialogDataTwo {
  selectedPatient: Patient,
  doctorsArray: Object[],
  selectedDivisionRequest: Division,
  selectedUnit: Unit,
  selectedDoctor: string
}


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
    private store: RegisterDbService,
    private divisionService: DivisionService,
    private PatientsService: PatientsService
  ) {}

  id: string;
  firstName: string;
  lastName: string;
  address: string;
  phoneNumber: string;
  dateOfBirth: string;
  gender: string;
  maritalStatus: string;
  externalDoctorId: string;
  nextOfKin: string;

  // Related to the Request Admission Dialog
  priorityArray: string[] = ['0','1','2','3','4','5','6','7','8','9','10'];
  rationale: string = '';
  prioritySelected: string = '';
  divisions: Division[] = [];
  divisionSelected: Division;

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
            console.log('Document data:',patient.maritalStatus);

            this.selectedPatient = new Patient(
              patient.id,
              patient.firstName,
              patient.lastName,
              patient.address,
              patient.phoneNumber,
              patient.dateOfBirth,
              patient.gender,
              patient.maritalStatus,
              patient.externalDoctorId,
              patient.nextOfKin,
              null // DivisionId Occupied not set.  
            );

            this.PatientsService.setSelectedPatient(this.selectedPatient);
            //console.log('patient', this.selectedPatient);
          } else {
            // doc.data() will be undefined in this case
            console.log('No such document!');
          }
        })
        .catch(function (error) {
          console.log('Error getting document:', error);
        });
    });

    // Get the Divisions from Firestore using the Divisions Service.
    this.divisionService.getAllDivisions().subscribe((res) => (
      this.divisions = [],
      res.map((divisionRes) => {
        let tempDivision = divisionRes.payload.doc.data() as Division

        // Push the Division into the components Division Array.
        tempDivision.firestoreId = divisionRes.payload.doc.id;
        this.divisions.push(tempDivision);
      })
    ));
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
        maritalStatus: this.selectedPatient.maritalStatus,
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
      .doc(this.selectedPatient.id.toString())
      .delete()
      .then(function () {
        window.location.reload();
        console.log('This patient has been discharged!');
      })
      .catch(function (error) {
        console.error('Error discharging patient', error);
      });
  }

  request() {
    const dialogRef = this.dialog.open(PatientAdmissionRequestDialogComponent, {
      width: '75%',
      data: {
        selectedPatient: this.selectedPatient,
        priorityArray: this.priorityArray,
        prioritySelected: this.prioritySelected,
        rationale: this.rationale,
        divisions: [this.divisions[0],this.divisions[1],this.divisions[2]],
        divisionSelected: this.divisionSelected
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      // Set data.
      this.PatientsService.setRationaleRequest(result.rationale);
      this.PatientsService.setDivisionsRequest(result.divisionSelected);
      this.PatientsService.setPriorityRequest(result.prioritySelected);

      // Open Second Dialog.
      if(result.rationale !== "") {
        const dialogRef2 = this.dialog.open(PatientAdmissionRequestDialogTwoComponent, {
          width: '75%',
          data: {
            selectedDivisionRequest: result.divisionSelected,
            doctorsArray: this.PatientsService.getAllDoctors(),
            selectedUnit: this.PatientsService.getUnitSelectedRequest(),
            selectedDoctor: this.PatientsService.getDoctorSelectedRequest(),
            selectedPatient: this.selectedPatient
          }
        });

        dialogRef2.afterClosed().subscribe(result => { 
          // Set data.
          this.PatientsService.setDoctorRequest(result.selectedDoctor);
          this.PatientsService.setUnitSelectedRequest(result.selectedUnit);

          // Send to request list.
          this.PatientsService.sendPatientAdmissionRequest();
        })

      }
    });

    /*this.firestore.collection('request').doc(this.selectedPatient.id).set({
      id: this.selectedPatient.id,
      firstName: this.selectedPatient.firstName,
      lastName: this.selectedPatient.lastName,
      phoneNumber: this.selectedPatient.phoneNumber,
      dateOfBirth: this.selectedPatient.dateOfBirth,
    });*/
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
