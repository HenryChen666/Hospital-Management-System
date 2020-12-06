import { Component, OnInit } from '@angular/core';
import { Patient } from '../patients/model/patient';
import { RequestListService } from './request-list-service/request-list-service.service';
import {AngularFirestore} from '@angular/fire/firestore';
import {AuthenticationService} from '../security/authentication.service';
import {Unit} from '../divisions/model/unit';
import {Division} from '../divisions/model/division';
import { MatDialog } from '@angular/material/dialog';
import { RequestDialogComponent } from './request-moreinfo-dialog/request-dialog.component';
import { templateJitUrl } from '@angular/compiler';
import { stringify } from 'querystring';

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
    patientsArray: Patient[] = [];
    selectedPatient: Patient;
    requestedPatient: Patient;
    unit: Unit;
    constructor(private requestListService: RequestListService, private firestore: AngularFirestore, private loginService: AuthenticationService,private dialog: MatDialog) { }
    
  ngOnInit(): void {
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
    var chargeNurseName: String;
    var bedNumberSelected: String;
    var bedTypeSelected: String;
    var docRef = this.firestore.collection("request").doc(id);
    docRef.get().toPromise().then((doc)=> {
      if (doc.exists) {
        let requestObject = doc.data() as any;
        chargeNurseName = requestObject.division.chargeNurse;
        console.log("chargeNurse:", chargeNurseName);
        var userFullName = userFirstName + ' ' + userLastName;
        if (chargeNurseName === "Lee Sin"){
          alert("Accept Successfully!");
          //var totalBeds = requestObject.totalBeds -1 
          //this.firestore.collection('request').doc(id).set({totalBeds:totalBeds},{merge:true});
          var bedRef = this.firestore.collection("divisions", ref =>ref.where('chargeNurse' ,"==", chargeNurseName));
          bedRef.get().toPromise().then(ref =>{
            ref.forEach((data)=>{
              //console.log("work");
              let divisionObject = data.data() as any;
              var totalBeds = divisionObject.totalBeds;           
              this.firestore.collection('divisions').doc(data.id).set({totalBeds:totalBeds-1},{merge: true});  
              //console.log(data.id,"=>",divisionObject.units.length); 
              for(let unit of divisionObject.units) {
                //console.log("test",unit)
                var numOfPatients = unit.numOfPatients;
                //console.log("patientnum",numOfPatients);
                //console.log("unit_id",unit.id)
                //console.log("doc_id",doc.data().unit.id);
                //console.log("equal?", unit.id === doc.data().unit.id)
                if (unit.id === requestObject.unit.id){
                  var old_unit = unit;
                  var temp;
                  
                  bedNumberSelected = requestObject.bedNumberSelected;
                  bedTypeSelected = requestObject.bedTypeSelected;

                  this.selectedPatient = requestObject.patient
                  this.requestedPatient = new Patient(
                    this.selectedPatient.id,
                    this.selectedPatient.lastName,
                    this.selectedPatient.firstName,
                    this.selectedPatient.address,
                    this.selectedPatient.phoneNumber,
                    this.selectedPatient.dateOfBirth,
                    this.selectedPatient.gender,
                    this.selectedPatient.maritalStatus,
                    this.selectedPatient.nextOfKin,
                    this.selectedPatient.externalDoctorId,
                    this.selectedPatient.divisionId,
                    this.selectedPatient.bedNumAssigned
                    )

                  this.patientsArray = old_unit.patientArray.push({id: this.requestedPatient.id, patient:this.requestedPatient})
                  console.log("patientsarray after",typeof(this.patientsArray)) 
                  console.log("requestedPatient",typeof(old_unit.patientArray))

                  if (bedTypeSelected === "Long Term"){
                    var indexOfbed = old_unit.longTermBedArray.indexOf(bedNumberSelected);
                    console.log("indexOfBed",indexOfbed)
                    temp = old_unit.longTermBedArray
                    temp.splice(indexOfbed,1)
                    console.log("bedarray", temp)

                    var new_unit = {
                      id: old_unit.id,
                      longTermBedArray: temp,
                      maxPatientCapacity: old_unit.maxPatientCapacity,
                      name: old_unit.name,
                      numOfBedsLongTerm: old_unit.numOfBedsLongTerm,
                      numOfBedsShortTerm: old_unit.numOfBedsShortTerm,
                      numOfPatients: old_unit.numOfPatients+1,
                      numOfStaffMembers: old_unit.numOfStaffMembers,
                      patientArray: this.patientsArray,
                      shortTermBedArray:old_unit.shortTermBedArray,

                    }
                  }
                  else{
                    var indexOfbed = old_unit.shortTermBedArray.indexOf(bedNumberSelected);
                    temp = old_unit.longTermBedArray
                    temp.splice(indexOfbed,1)
                    this.selectedPatient = requestObject.patient
                    var new_unit = {
                      id: old_unit.id,
                      longTermBedArray:old_unit.longTermBedArray,
                      maxPatientCapacity: old_unit.maxPatientCapacity,
                      name: old_unit.name,
                      numOfBedsLongTerm: old_unit.numOfBedsLongTerm,
                      numOfBedsShortTerm: old_unit.numOfBedsShortTerm,
                      numOfPatients: old_unit.numOfPatients+1,
                      numOfStaffMembers: old_unit.numOfStaffMembers,
                      patientArray: this.patientsArray,
                      shortTermBedArray:temp,

                    }                    
                  }
                  this.firestore.collection("divsions").doc(data.id).set({unit:new_unit}) 
                }               
              }
            })
          })
    
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
    this.handleDischargeButton(id);
    this.firestore
    .collection('request')
    .doc(id.toString())
    .delete()
    .then(function () {
      //window.location.reload();
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

  handleDischargeButton(id: string){
    var userFirstName = this.loginService.getFirstname;
    var userLastName = this.loginService.getLastname;
    var chargeNurseName: String;
    var bedNumberSelected: String;
    var bedTypeSelected: String;
    var docRef = this.firestore.collection("request").doc(id);
    docRef.get().toPromise().then((doc)=> {
      if (doc.exists) {
        let requestObject = doc.data() as any;
        chargeNurseName = requestObject.division.chargeNurse;
        //console.log("chargeNurse:", chargeNurseName);
        var userFullName = userFirstName + ' ' + userLastName;
        if (chargeNurseName === "Lee Sin"){
          alert("DisCharge Successfully!");
          var bedRef = this.firestore.collection("divisions", ref =>ref.where('chargeNurse' ,"==", chargeNurseName));
          bedRef.get().toPromise().then(ref =>{
            ref.forEach((data)=>{
              //console.log("work");
              let divisionObject = data.data() as any;
              var totalBeds = divisionObject.totalBeds;           
              this.firestore.collection('divisions').doc(data.id).set({totalBeds:totalBeds+1},{merge: true});  
              console.log(data.id,"=>",totalBeds); 
              for(let unit of divisionObject.units) {
                //console.log("test",unit)
                var numOfPatients = unit.numOfPatients;
                //console.log("patientnum",numOfPatients);
                //console.log("unit_id",unit.id)
                //console.log("doc_id",doc.data().unit.id);
                //console.log("equal?", unit.id === doc.data().unit.id)
                if (unit.id === requestObject.unit.id){
                  var old_unit = unit;
                  var tempBed;
                  var tempPatient;
                  bedNumberSelected = requestObject.bedNumberSelected;
                  bedTypeSelected = requestObject.bedTypeSelected;
                  this.selectedPatient = requestObject.patient
                  if (bedTypeSelected === "Long Term"){
                    var indexOfPatiet = old_unit.patientArray.indexOf(this.selectedPatient)
                    tempBed = old_unit.longTermBedArray
                    tempBed.push(bedNumberSelected)
                    console.log("bedarray", tempBed)
                    tempPatient = old_unit.patientArray
                    tempPatient = tempPatient.splice(indexOfPatiet,1)
                    var new_unit = {
                      id: old_unit.id,
                      longTermBedArray: tempBed,
                      maxPatientCapacity: old_unit.maxPatientCapacity,
                      name: old_unit.name,
                      numOfBedsLongTerm: old_unit.numOfBedsLongTerm,
                      numOfBedsShortTerm: old_unit.numOfBedsShortTerm,
                      numOfPatients: old_unit.numOfPatients-1,
                      numOfStaffMembers: old_unit.numOfStaffMembers,
                      patientArray: tempPatient,
                      shortTermBedArray:old_unit.shortTermBedArray,

                    }
                  }
                  else{
                    var indexOfPatiet = old_unit.patientArray.indexOf(this.selectedPatient)
                    tempBed = old_unit.longTermBedArray
                    tempBed.push(bedNumberSelected)
                    console.log("bedarray", tempBed)
                    tempPatient = old_unit.patientArray
                    tempPatient = tempPatient.splice(indexOfPatiet,1)
                    var new_unit = {
                      id: old_unit.id,
                      longTermBedArray:old_unit.longTermBedArray,
                      maxPatientCapacity: old_unit.maxPatientCapacity,
                      name: old_unit.name,
                      numOfBedsLongTerm: old_unit.numOfBedsLongTerm,
                      numOfBedsShortTerm: old_unit.numOfBedsShortTerm,
                      numOfPatients: old_unit.numOfPatients-1,
                      numOfStaffMembers: old_unit.numOfStaffMembers,
                      patientArray: tempPatient,
                      shortTermBedArray:tempBed,

                    }                    
                  }
                  this.firestore.collection("divsions").doc(data.id).set({unit:new_unit}) 
                }               
              }
            })
          })
    
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
}
