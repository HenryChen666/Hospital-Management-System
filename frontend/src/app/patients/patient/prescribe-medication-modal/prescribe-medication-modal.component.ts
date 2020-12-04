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
  selector: 'app-prescribe-medication-modal',
  templateUrl: './prescribe-medication-modal.component.html',
  styleUrls: ['./prescribe-medication-modal.component.css']
})
export class PrescribeMedicationModalComponent implements OnInit {

  prescriptionForm: FormGroup;
  selectedPatient: Patient;
  patient: PatientComponent;
  patientId: any;
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      id: string;
      medicine: string;
      duration: string;
      frequency: string;
    },
    private fb: FormBuilder,
    private firestore: AngularFirestore,
    private dialog: MatDialogModule,
    private route: ActivatedRoute
  ) {
    this.prescriptionForm = this.fb.group({
      id: this.data.id,
      medicine: ['', Validators.required],
      duration: ['', Validators.required],
      frequency: ['', Validators.required],
    });
  }
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const id = params.id;
    });
  }

  onSubmit(): void {
    console.log(this.prescriptionForm.value);
    console.log(`patient id: ${this.data.id}`);
    this.prescribeMedicine(this.data.id.toString());
  }

  prescribeMedicine(id: string): void {
    // To update age and favorite color:
    this.firestore
      .collection('prescriptions')
      .doc(id)
      .set({
        id: this.prescriptionForm.value.id,
        medicine: this.prescriptionForm.value.medicine,
        duration: this.prescriptionForm.value.duration,
        frequency: this.prescriptionForm.value.frequency,
      })
      .then(function () {
        console.log('Document successfully updated!');
      });
  }
}

