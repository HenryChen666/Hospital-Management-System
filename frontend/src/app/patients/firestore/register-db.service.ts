import { Injectable } from '@angular/core';
import {AngularFirestore, DocumentChangeAction, DocumentReference} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {Patient} from '../model/patient';

@Injectable({
  providedIn: 'root'
})
export class RegisterDbService {

  constructor(private firestore: AngularFirestore) { }

  getPatientById(id: string):any{
    console.log(this.firestore.doc('id'))
    return this.firestore.doc('id').snapshotChanges();
  }
  updatePatient(patient: Patient): Promise<void> {
    const patientId = patient.id;
    delete patient.id;
    return this.firestore.collection('user').doc(patientId).update(patient);
  }

  getRequestedPatients(): Observable<DocumentChangeAction<unknown>[]> {
    return this.firestore.collection('request').snapshotChanges()
  }
  getPatients(): Observable<DocumentChangeAction<unknown>[]> {
    return this.firestore.collection('user').snapshotChanges()
  }

}
