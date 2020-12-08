import { Component, OnInit } from '@angular/core';
import { Patient } from '../patients/model/patient';
import { RequestListService } from './request-list-service/request-list-service.service';
import {AngularFirestore} from '@angular/fire/firestore';
import {AuthenticationService} from '../security/authentication.service';
import {Unit} from '../divisions/model/unit';
import {Division} from '../divisions/model/division';
import { MatDialog } from '@angular/material/dialog';
import { RequestDialogComponent } from './request-moreinfo-dialog/request-dialog.component';
import {Router} from '@angular/router';

// Dialog More Info data Related.
export interface DialogDataMoreInfo {
  requestData: any
}

@Component({
  selector: 'app-request-list',
  templateUrl: './request-list.component.html',
  styleUrls: ['./request-list.component.css']
})
export class RequestListComponent implements OnInit {
    requestedPatientList: any[] = [];
    patients: Patient[] = [];

    constructor(private requestListService: RequestListService, private firestore: AngularFirestore, private loginService: AuthenticationService,private dialog: MatDialog, private router: Router) { }
    
  ngOnInit(): void {
    if(this.loginService.getUser() === null){
      this.router.navigate(["auth"]);
    }
    this.requestListService.getRequestedPatientList().subscribe((res)=> {
      this.requestedPatientList = res;
      for(let patient in this.requestedPatientList) {
        this.patients.push(this.requestedPatientList[patient].patient);
      }
    });
  }

  accept(id: string){
    var userFirstName = this.loginService.getFirstname;
    var userLastName = this.loginService.getLastname;
    console.log("current user", userFirstName);
    var docRef = this.firestore.collection("request").doc(id);
    var chargeNurseName: String;
  
    docRef.get().toPromise().then(function(doc) {
      if (doc.exists) {
        let requestObject = doc.data() as any;
        chargeNurseName = requestObject.division.chargeNurse;
        console.log("chargeNurse:", chargeNurseName);
        var userFullName = userFirstName + ' ' + userLastName;
        if (chargeNurseName === userFullName){
          alert("Accept Successfully!");
        }
        else {
          alert("You dont have the access to accept this patient!");
        }
      } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
      }
    }).catch(function(error) {
      console.log("Error getting document:", error);
    });
  }

  discharge(id: string) {
    this.firestore
    .collection('request')
    .doc(id.toString())
    .delete()
    .then(function () {
      window.location.reload();
      console.log('This patient has been discharged!');
    })
    .catch(function (error) {
      console.error('Error discharging patient', error);
    });
  }
  
  openDialogInfo(patientId: string): void {
    // Get the selected request.
    let selectedRequest;
    for(let patientRequest in this.requestedPatientList) {
      let patientIdRequest = this.requestedPatientList[patientRequest].patient.id;
      if(patientIdRequest == patientId) {
        selectedRequest = this.requestedPatientList[patientRequest];
      }
    }
    // Set data to send to Dialog.
    let requestDialogObject = {
      "patientName": selectedRequest.patient.firstName + " " + selectedRequest.patient.lastName,
      "requestedDoctor": selectedRequest.doctor.fName + " " + selectedRequest.doctor.lName,
      "priority": selectedRequest.priority,
      "rationale": selectedRequest.rationale,
      "requestedUnit": selectedRequest.unit.name
    }

    // Open Dialog.
    const dialogRef = this.dialog.open(RequestDialogComponent, {
      width: '75%',   
      data: {
        requestData: requestDialogObject
      }
    })
  }

}

