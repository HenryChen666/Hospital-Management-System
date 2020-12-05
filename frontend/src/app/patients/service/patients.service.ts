import { Injectable } from '@angular/core';

import {Patient} from '../model/patient';
@Injectable({
  providedIn: 'root'
})
export class PatientsService {
  // Dialog Related
  rationaleRequest: string;

  constructor() { }

  /*public getPatient(id: string): Patient {
    // tslint:disable-next-line:radix
    return this.patients.find(patient => patient.id === String(Number.parseInt(id)));
  }*/

  public setRationaleRequest(rationale: string): void {
    this.rationaleRequest = rationale;
  }
}
