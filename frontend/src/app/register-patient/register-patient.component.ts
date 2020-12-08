import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {AngularFirestore, DocumentChangeAction, DocumentReference} from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { identifierName } from '@angular/compiler';

import {MatSnackBar} from '@angular/material/snack-bar';
// Interface used for select menus
interface Gender {
  value: string;
  viewValue: string;
}

interface MaritalStatus{
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-register-patient',
  templateUrl: './register-patient.component.html',
  styleUrls: ['./register-patient.component.css']
})
export class RegisterPatientComponent implements OnInit {

  registerForm: FormGroup;
  submitted = false;
  genders: Gender[] = [
    {value: 'Male', viewValue: "Male"},
    {value: 'Female', viewValue: "Female"},
    {value: 'Other', viewValue: "Other"},
  ];

  maritalStatuses: MaritalStatus[] = [
    {value: 'Single', viewValue: 'Single'},
    {value: 'Relationship', viewValue: 'Relationship'},
    {value: 'Married', viewValue: 'Married'},
    {value: 'Divorced', viewValue: 'Divorced'},
    {value: 'Widowed', viewValue: 'Widowed'},
  ]
  
  constructor(private formBuilder: FormBuilder, private firestore: AngularFirestore, private route: Router, private _snackBar: MatSnackBar) { 
  }

  ngOnInit() {
      this.registerForm = this.formBuilder.group({
          firstName: ['', Validators.required],
          lastName: ['', Validators.required],
          address: ['', Validators.required],
          phoneNumber: ['', [Validators.required, Validators.minLength(10),Validators.pattern('[1-9]\\d{2}[1-9]\\d{6}')]],
          dateOfBirth: ['', Validators.required],
          gender:['', Validators.required],
          maritalStatus: ['', Validators.required],
          externalDoctor: ['', Validators.required],
          nextOfKin: ['', Validators.required]

        });
  }

  get f() { return this.registerForm.controls; }
  get firstName(){return this.registerForm.get('firstName'); }
  get lastName(){return this.registerForm.get('lastName'); }
  get phoneNumber(){return this.registerForm.get('phoneNumber'); }
  get address(){return this.registerForm.get('address'); }
  get dateOfBirth(){return this.registerForm.get('dateOfBirth'); }
  get gender(){return this.registerForm.get('gender'); }
  get maritalStatus(){return this.registerForm.get('maritalStatus'); }
  get externalDoctor(){return this.registerForm.get('externalDoctor'); }
  get nextOfKin(){return this.registerForm.get('nextOfKin'); }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2500,
    });

  }
  
  register() {
      this.submitted = true;

      if (this.registerForm.invalid) {
          return;
      }
      var identifier = Math.floor(Math.random() * 20) + 1
      const firstName = this.registerForm.get('firstName').value;
      const lastName = this.registerForm.get('lastName').value;
      const phoneNumber = this.registerForm.get('phoneNumber').value;
      const address = this.registerForm.get('address').value;
      const dateOfBirth = this.registerForm.get('dateOfBirth').value;
      const gender = this.registerForm.get('gender').value;
      const maritalStatus = this.registerForm.get('maritalStatus').value;
      const externalDoctor = this.registerForm.get('externalDoctor').value;
      const nextOfKin = this.registerForm.get('nextOfKin').value;

      this.route.navigate(['/user', firstName, lastName, phoneNumber, address,dateOfBirth,gender,maritalStatus,externalDoctor,nextOfKin]);
      this.firestore.collection('patients').doc(identifier.toString()).set({
        id: identifier,
        firstName: firstName,
        lastName: lastName,
        phoneNumber: phoneNumber,
        address: address,
        dateOfBirth: dateOfBirth,
        gender: gender,
        maritalStatus: maritalStatus,
        externalDoctor: externalDoctor,
        nextOfKin: nextOfKin,
        divisionId: null,
        bedNumAssigned: null,
        bedTypeAssigned: null,
        doctor: null,      
      })
      
      this.registerForm.reset()

      this.openSnackBar('Sucessfully Save', 'Undo')

  }
}