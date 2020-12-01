import { Injectable } from '@angular/core';
import {AngularFirestore, DocumentChangeAction, DocumentReference} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {Patientdatas} from '../../patientdatas';

@Injectable({
  providedIn: 'root'
})
export class FormDbService {

  constructor(private firestore: AngularFirestore) { }

  getUsers(): Observable<DocumentChangeAction<unknown>[]> {
    return this.firestore.collection('patients').snapshotChanges();
  }

  createUser(user: Patientdatas): Promise<DocumentReference> {
    delete user.id;
    return this.firestore.collection('patients').add({...user});
  }
  deleteUser(userId: string): Promise<void> {
    return this.firestore.collection('patients').doc(userId).delete();
    }
}
