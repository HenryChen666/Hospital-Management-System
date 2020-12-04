import { Injectable } from '@angular/core';

import {Patient} from '../model/patient';
@Injectable({
  providedIn: 'root'
})
export class PatientsService {

  private patients = [
   new Patient('1', 'Bob', 'James', 123456789, 2017),
  ]
  constructor() { }

  public getPatient(id: string): Patient {
    // tslint:disable-next-line:radix
    return this.patients.find(patient => patient.id === String(Number.parseInt(id)));
  }
}
