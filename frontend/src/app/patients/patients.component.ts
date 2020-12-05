import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router, Routes} from '@angular/router';
import { RegisterDbService } from './firestore/register-db.service';
import {PatientComponent} from './patient/patient.component';
import { Patient } from '../patients/model/patient';
import {AngularFirestore, DocumentChangeAction, DocumentReference} from '@angular/fire/firestore';
import {AuthenticationService} from '../security/authentication.service';

export const patientsRoutes: Routes = [
  {path: ':id', component: PatientComponent}
];

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.css']
})
export class PatientsComponent implements OnInit {
  displayedColumns: string[] = ['id','firstname', 'lastname', 'address',
'phonenumber', 'dob', 'gender', 'ms', 'edId', 'nok', 'delete'];
  patients: Patient[] = [];


  constructor(
    private router: Router, 
    private store: RegisterDbService,
    private route: ActivatedRoute,
    private firestore: AngularFirestore,
    private loginService: AuthenticationService,
    ) { }

  ngOnInit(): void {
    this.store.getPatients().subscribe(data => {
      this.patients = data.map(e => {
        return {
          id: e.payload.doc.data(),
          ...(e.payload.doc.data() as object)
        } as Patient;
      });
      console.log(this.patients);
    });
  }
  
  submit(value: string): void {
    var identifier = Math.floor(Math.random() * 20) + 1
    this.router.navigate(['./', value], {relativeTo: this.route});
    if (value != ""){
      this.firestore.collection('logUser').doc(identifier.toString()).set({
        userName: this.loginService.getUser(),
        access: value,
        time: new Date()
      })
    }
  }

  delete(id: string){
    this.firestore.collection('user').doc(id.toString()).delete();
    this.firestore.collection('request').doc(id.toString()).delete();
  }
}
