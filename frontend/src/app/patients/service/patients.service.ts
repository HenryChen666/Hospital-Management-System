import { Injectable } from '@angular/core';
import { Division } from 'src/app/divisions/model/division';
import { Unit } from 'src/app/divisions/model/unit';
import { AngularFirestore } from '@angular/fire/firestore';
import {Patient} from '../model/patient';

@Injectable({
  providedIn: 'root'
})
export class PatientsService {
  selectedPatient: Patient;
  doctorsArray: Object[] = [
    {
      "fName": "Frank",
      "lName": "Wang"
    },
    {
      "fName": "Jon",
      "lName": "Snow"
    },
    {
      "fName": "Arya",
      "lName": "Stark"
    }
  ];

  // Dialog Related to Submitting a Patient Request
  rationaleRequest: string;
  divisionsRequest: Division;
  priorityRequest: string;
  unitSelectedRequest: Unit;
  doctorSelectedRequest: Object;
  bedTypeSelected: string = '';
  bedNumberSelected: string = '';

  constructor(private firestore: AngularFirestore) { }

  /*public getPatient(id: string): Patient {
    // tslint:disable-next-line:radix
    return this.patients.find(patient => patient.id === String(Number.parseInt(id)));
  }*/

  public getAllDoctors(): Object[] {
    return this.doctorsArray;
  }

  public setSelectedPatient(patient: Patient): void {
    this.selectedPatient = patient;
  } 

  // Dialog 1/3 Related Requests for Requesting Patient Admission
  public getUnitSelectedRequest(): Unit {
    return this.unitSelectedRequest;
  }

  public getDoctorSelectedRequest(): Object {
    return this.doctorSelectedRequest;
  }

  public setRationaleRequest(rationale: string): void {
    this.rationaleRequest = rationale;
  }

  public setDivisionsRequest(division: Division): void {
    this.divisionsRequest = division;
  }

  public setPriorityRequest(priority: string): void {
    this.priorityRequest = priority;
  }

  // Dialog 2/3 Related Requests for Requesting Patient Admission
  public setDoctorRequest(doctor: Object): void {
    this.doctorSelectedRequest = doctor;
  }

  public setUnitSelectedRequest(unit: Unit): void {
    this.unitSelectedRequest = unit;
  }

  // Dialog 3/3
  public getBedTypeSelected(): string {
    return this.bedTypeSelected;
  }

  public getBedNumberSelected(): string {
    return this.bedNumberSelected;
  }

  public setBedTypeSelected(bedType: string): void {
    this.bedTypeSelected = bedType;
  }

  public setBedNumberSelected(bedNum: string): void {
    this.bedNumberSelected = bedNum;
  }

  // Send Request Patient Admission to Firebase.
  public sendPatientAdmissionRequest(): void {
    for(let prop in this.selectedPatient){
      if(this.selectedPatient[prop] === undefined) {
        this.selectedPatient[prop] = ""
      }
    }
    let requestObject = {
      patient: Object.assign({}, this.selectedPatient),
      rationale: this.rationaleRequest,
      priority: this.priorityRequest,
      unit: this.unitSelectedRequest,
      doctor: this.doctorSelectedRequest,
      division: this.divisionsRequest,
      bedTypeSelected: this.bedTypeSelected,
      bedNumberSelected: this.bedNumberSelected,
    }
    this.firestore.collection("request").doc(this.selectedPatient.id.toString()).set(Object.assign({}, requestObject))
    .then((res)=> {
      // Reset the state.
      this.rationaleRequest = "";
      this.divisionsRequest = null;
      this.priorityRequest = ""
      this.unitSelectedRequest = null;
      this.doctorSelectedRequest = null;
      this.bedTypeSelected = '';
      this.bedNumberSelected = '';
    });
  }
}
