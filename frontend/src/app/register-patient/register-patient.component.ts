import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {AngularFirestore, DocumentChangeAction, DocumentReference} from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { identifierName } from '@angular/compiler';

@Component({
  selector: 'app-register-patient',
  templateUrl: './register-patient.component.html',
  styleUrls: ['./register-patient.component.css']
})
export class RegisterPatientComponent implements OnInit {

  registerForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder, private firestore: AngularFirestore, private route: Router) { 
  
  }

  ngOnInit() {
      this.registerForm = this.formBuilder.group({
          firstName: ['', Validators.required],
          lastName: ['', Validators.required],
          phoneNumber: ['', [Validators.required, Validators.minLength(10),Validators.pattern('[1-9]\\d{2}[1-9]\\d{6}')]],
          email: ['', [Validators.required, Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]]
      });
  }

  get f() { return this.registerForm.controls; }
  get firstName(){return this.registerForm.get('firstName'); }
  get lastName(){return this.registerForm.get('lastName'); }
  get phoneNumber(){return this.registerForm.get('phoneNumber'); }
  get email(){return this.registerForm.get('email'); }

  register() {
      this.submitted = true;

      if (this.registerForm.invalid) {
          return;
      }
      var identifier = Math.floor(Math.random() * 20) + 1
      const firstName = this.registerForm.get('firstName').value;
      const lastName = this.registerForm.get('lastName').value;
      const phoneNumber = this.registerForm.get('phoneNumber').value;
      const email = this.registerForm.get('email').value;
      this.route.navigate(['/user', firstName, lastName, phoneNumber, email]);
      this.firestore.collection('user').doc(identifier.toString()).set({
        id: identifier,
        firstName: firstName,
        lastName: lastName,
        phoneNumber: phoneNumber,
        email: email        
      })
  }
}


