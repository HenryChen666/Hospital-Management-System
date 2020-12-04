import { Component, Input, OnInit, Inject } from '@angular/core';
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router, Routes } from '@angular/router';

import {
  AngularFirestore,
  DocumentChangeAction,
  DocumentReference,
} from '@angular/fire/firestore';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Patient } from '../../model/patient';
import { PatientComponent } from '../patient.component';

@Component({
  selector: 'app-update-patient-modal',
  templateUrl: './update-patient-modal.component.html',
  styleUrls: ['./update-patient-modal.component.css']
})
export class UpdatePatientModalComponent implements OnInit {

  //@Input() patientId: any;

  updatePatientForm: FormGroup;
  selectedPatient: Patient;
  patient: PatientComponent;
  patientId: any;
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      id: string;
      firstName: string;
      lastName: string;
      phoneNumber: string;
      dateOfBirth: string;
    },
    private fb: FormBuilder,
    private firestore: AngularFirestore,
    private dialog: MatDialogModule,
    private route: ActivatedRoute
  ) {
    this.updatePatientForm = this.fb.group({
      firstName: [data.firstName, Validators.required],
      lastName: [data.lastName, Validators.required],
      phoneNumber: [
        data.phoneNumber,
        [
          Validators.required,
          Validators.minLength(10),
          Validators.pattern('[1-9]\\d{2}[1-9]\\d{6}'),
        ],
      ],
      dateOfBirth: [data.dateOfBirth, Validators.required],
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const id = params.id;
    });
  }

  onSubmit(): void {
    console.log(this.updatePatientForm.value);
    console.log(`patient id: ${this.data.id}`);
    this.updatePatientFile(this.data.id.toString());
  }

  updatePatientFile(id: string): void {
    // To update age and favorite color:
    this.firestore
      .collection('user')
      .doc(id)
      .update({
        firstName: this.updatePatientForm.value.firstName,
        lastName: this.updatePatientForm.value.lastName,
        phoneNumber: this.updatePatientForm.value.phoneNumber,
        dateOfBirth: this.updatePatientForm.value.dateOfBirth,
      })
      .then(function () {
        console.log('Document successfully updated!');
      });
      this.firestore
      .collection('request')
      .doc(id)
      .update({
        firstName: this.updatePatientForm.value.firstName,
        lastName: this.updatePatientForm.value.lastName,
        phoneNumber: this.updatePatientForm.value.phoneNumber,
        dateOfBirth: this.updatePatientForm.value.dateOfBirth,
      })
      .then(function () {
        console.log('Document successfully updated!');
      });
  }
}
