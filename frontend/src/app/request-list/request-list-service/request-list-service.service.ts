import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RequestListService {
  requestedPatientListArray: any[] = [];
  requestedPatientListArrayObservable = new BehaviorSubject<any[]>(null);

  constructor(private firestore: AngularFirestore) {
    // Get all items in requested list in firestore. 
    this.firestore.collection("request").get().subscribe((res)=> {
      this.requestedPatientListArray = [];
      res.docs.map((res)=> {
        this.requestedPatientListArray.push(res.data());
      });
      this.requestedPatientListArrayObservable.next(this.requestedPatientListArray);
    });
  }

  public getRequestedPatientList(): any {
    return this.requestedPatientListArrayObservable.asObservable();
  }

}
