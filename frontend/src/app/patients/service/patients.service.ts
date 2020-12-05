import { Injectable } from '@angular/core';
import { Division } from 'src/app/divisions/model/division';
import { Unit } from 'src/app/divisions/model/unit';

import {Patient} from '../model/patient';
@Injectable({
  providedIn: 'root'
})
export class PatientsService {
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
  doctorSelectedRequest: string;

  constructor() { }

  /*public getPatient(id: string): Patient {
    // tslint:disable-next-line:radix
    return this.patients.find(patient => patient.id === String(Number.parseInt(id)));
  }*/

  public getAllDoctors(): Object[] {
    return this.doctorsArray;
  }

  // Dialog Related Requests for Requesting Patient Admission
  public getUnitSelectedRequest(): Unit {
    return this.unitSelectedRequest;
  }

  public getDoctorSelectedRequest(): string {
    return this.doctorSelectedRequest;
  }

  public setRationaleRequest(rationale: string): void {
    this.rationaleRequest = rationale;
  }

  public setDivisionsRequest(division: Division): void {
    this.divisionsRequest = division;
    console.log(this.divisionsRequest);
  }

  public setPriorityRequest(priority: string): void {
    this.priorityRequest = priority;
  }
}
