import { Component, Input, OnInit, Inject } from '@angular/core';
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router, Routes } from '@angular/router';
import {MatSelectModule} from '@angular/material/select'; 
import {
  AngularFirestore
} from '@angular/fire/firestore';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Patient } from '../../model/patient';
import { PatientComponent } from '../patient.component';

// Interface used for select menus
interface Gender {
  value: string;
  viewValue: string;
}

interface MartialStatus{
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-update-patient-modal',
  templateUrl: './update-patient-modal.component.html',
  styleUrls: ['./update-patient-modal.component.css'],
})
export class UpdatePatientModalComponent implements OnInit {
  updatePatientForm: FormGroup;
  selectedPatient: Patient;
  patient: PatientComponent;
  genders: Gender[] = [
    {value: 'Male', viewValue: "Male"},
    {value: 'Female', viewValue: "Female"},
    {value: 'Other', viewValue: "Other"},
  ];

  martialStatuses: MartialStatus[] = [
    {value: 'Single', viewValue: 'Single'},
    {value: 'Relationship', viewValue: 'Relationship'},
    {value: 'Married', viewValue: 'Married'},
    {value: 'Divorced', viewValue: 'Divorced'},
    {value: 'Widowed', viewValue: 'Widowed'},

  ]

  selectedGender: string;
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      id: string;
      firstName: string;
      lastName: string;
      address: string;
      phoneNumber: string;
      dateOfBirth: string;
      gender: string;
      martialStatus: string;
      externalDoctorId: string;
      nextOfKin: any;
    },
    private fb: FormBuilder,
    private firestore: AngularFirestore,
    private dialog: MatDialogModule,
    private route: ActivatedRoute
  ) {
    this.updatePatientForm = this.fb.group({
      firstName: [data.firstName, Validators.required],
      lastName: [data.lastName, Validators.required],
      address: [data.address, Validators.required],
      phoneNumber: [
        data.phoneNumber,
        [
          Validators.required,
          Validators.minLength(10),
          Validators.pattern('[1-9]\\d{2}[1-9]\\d{6}'),
        ],
      ],
      dateOfBirth: [data.dateOfBirth, Validators.required],
      gender: [data.gender, Validators.required],
      martialStatus: [data.martialStatus, Validators.required],
      externalDoctorId: [data.externalDoctorId, Validators.required],
      nextOfKin: [data.nextOfKin, Validators.required],
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
        address: this.updatePatientForm.value.address,
        phoneNumber: this.updatePatientForm.value.phoneNumber,
        dateOfBirth: this.updatePatientForm.value.dateOfBirth,
        gender: this.updatePatientForm.value.gender,
        martialStatus: this.updatePatientForm.value.martialStatus,
        externalDoctorId: this.updatePatientForm.value.externalDoctorId,
        nextOfKin: this.updatePatientForm.value.nextOfKin,
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
        address: this.updatePatientForm.value.address,
        phoneNumber: this.updatePatientForm.value.phoneNumber,
        dateOfBirth: this.updatePatientForm.value.dateOfBirth,
        gender: this.updatePatientForm.value.gender,
        martialStatus: this.updatePatientForm.value.martialStatus,
        externalDoctorId: this.updatePatientForm.value.externalDoctorId,
        nextOfKin: this.updatePatientForm.value.nextOfKin,
      })
      .then(function () {
        console.log('Document successfully updated!');
      });
  }
  updateGender(gender: string): void{
    console.log(`gender: ${gender}`)
  }

}