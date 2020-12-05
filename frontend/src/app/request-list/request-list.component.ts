import { Component, OnInit } from '@angular/core';
import { Patient } from '../patients/model/patient';
import { RequestListService } from './request-list-service/request-list-service.service';
import {AngularFirestore} from '@angular/fire/firestore';
import {AuthenticationService} from '../security/authentication.service';
import {Unit} from '../divisions/model/unit';
import {Division} from '../divisions/model/division';

@Component({
  selector: 'app-request-list',
  templateUrl: './request-list.component.html',
  styleUrls: ['./request-list.component.css']
})
export class RequestListComponent implements OnInit {
    requestedPatientList: any[] = [];
    patients: Patient[] = [];
    constructor(private requestListService: RequestListService, private firestore: AngularFirestore, private loginService: AuthenticationService) { }

  ngOnInit(): void {
    this.requestListService.getRequestedPatientList().subscribe((res)=> {
      this.requestedPatientList = res;
      for(let patient in this.requestedPatientList) {
        this.patients.push(this.requestedPatientList[patient].patient);
      }
    });
  }

  accept(id: string){
    var user = this.loginService.getUser();
    console.log("current user", user);
    var docRef = this.firestore.collection("request").doc(id);
    var unit;
    docRef.get().toPromise().then(function(doc) {
      if (doc.exists) {
        let requestObject = doc.data() as any;
        unit = requestObject.unit.name;
        console.log("Document data:", unit);
      } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
      }
  }).catch(function(error) {
      console.log("Error getting document:", error);
  });

  var chargeNurse = this.firestore.collection('divisions',ref => ref.where('category','==','Pediatric'));
  var chargeNurseName;
  chargeNurse
  .get()
  .toPromise()
  .then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
          // doc.data() is never undefined for query doc snapshots
          let divisions = doc.data() as any 
          chargeNurseName = divisions.chargeNurse;
          console.log("charge nurse",chargeNurseName);
      });
  })
  .catch(function(error) {
      console.log("Error getting documents: ", error);
  });

  if (chargeNurseName === user){
    alert("Accept Successfully!");
  }
  else {
    alert("You dont have the access to accept this patient!");
  }
  }

}
