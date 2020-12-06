import { Injectable } from '@angular/core';
import { Division } from '../model/division';
import { Unit } from '../model/unit';
import { HttpClient } from '@angular/common/http';
import { AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';
import { Patient } from 'src/app/patients/model/patient';

@Injectable({
  providedIn: 'root'
})
export class DivisionService {
  // Division Related.
  divisions: Division[] = [];
  selectedDivision: Division;

  // Unit Related.
  selectedDivisionUnits: Unit[] = [];
  selectedUnitInfo = new BehaviorSubject<Unit>(null);
  defaultPatientArray: Patient[] = [ // For testing purposes.
    {
      "id": "1234",
      "firstName": "James",
      "lastName": "Lee",
      "address": "Toronto, Canada",
      "phoneNumber": 61380508244,
      "dateOfBirth": 20011997,
      "gender": "male",
      "maritalStatus": "single",
      "externalDoctorId": "123541",
      "nextOfKin": "Mike Diep",
      "divisionId": null,
      "bedNumAssigned": "1012",
      "bedTypeAssigned": "Long Term"
    },
    {
      "id": "12",
      "firstName": "Ziming",
      "lastName": "Wang",
      "address": "Toronto, Canada",
      "phoneNumber": 61380508244,
      "dateOfBirth": 20011997,
      "gender": "male",
      "maritalStatus": "single",
      "externalDoctorId": "123541",
      "nextOfKin": "Mike Diep",
      "divisionId": null,
      "bedNumAssigned": "1013",
      "bedTypeAssigned": "Long Term"
    },
    {
      "id": "1234",
      "firstName": "Henry",
      "lastName": "Chang",
      "address": "Toronto, Canada",
      "phoneNumber": 61380508244,
      "dateOfBirth": 20011997,
      "gender": "male",
      "maritalStatus": "single",
      "externalDoctorId": "123541",
      "nextOfKin": "Mike Diep",
      "divisionId": null,
      "bedNumAssigned": "1014",
      "bedTypeAssigned": "Long Term"
    },
    {
      "id": "1234",
      "firstName": "Kenny",
      "lastName": "Nguyen",
      "address": "Toronto, Canada",
      "phoneNumber": 61380508244,
      "dateOfBirth": 20011997,
      "gender": "male",
      "maritalStatus": "single",
      "externalDoctorId": "123541",
      "nextOfKin": "Mike Diep",
      "divisionId": null,
      "bedNumAssigned": "1015",
      "bedTypeAssigned": "Long Term"
    },
    {
      "id": "1234",
      "firstName": "Mike ",
      "lastName": "Diep",
      "address": "Toronto, Canada",
      "phoneNumber": 61380508244,
      "dateOfBirth": 20011997,
      "gender": "male",
      "maritalStatus": "single",
      "externalDoctorId": "123541",
      "nextOfKin": "Mike Diep",
      "divisionId": null,
      "bedNumAssigned": "1016",
      "bedTypeAssigned": "Long Term"
    }
  ];

  constructor(private http: HttpClient, private firestore: AngularFirestore) { }

  public getAllDivisions() {
    return this.firestore.collection("divisions").snapshotChanges();
  }

  public getSelectedDivision(): Division {
    return this.selectedDivision;
  }

  public getSelectedDivisionUnit(): any {
    return this.selectedUnitInfo.asObservable();
  }

  public getUnitsForDivision() {
    return this.firestore.collection("divisions").doc(this.selectedDivision.firestoreId).snapshotChanges();
  }

  // For Testing Purposes.
  public getDefaultPatientArray() {
    return this.defaultPatientArray;
  }

  // Set the selected Division and its Units.
  public setSelectedDivision(divisionObject): void {
    // Count the beds for each unit and set as bedCount for the division, also check the Unit Status.
    let bedCount = 0;
    for(let unitIndex in divisionObject.units) {
      let unit = divisionObject.units[unitIndex];

      bedCount = unit.numOfBedsLongTerm + bedCount;
      bedCount = unit.numOfBedsShortTerm + bedCount;

      // Check the status of each Unit.
      if(unit.numOfBedsLongTerm > 0 || unit.numOfBedsShortTerm > 0) {
        unit.status = "Incomplete";
        divisionObject.units[unitIndex] = unit;
      } else {
        unit.status = "Complete";
        divisionObject.units[unitIndex] = unit;
      }
    }

    // Set the Status of the Division based on it's bed counts.
    if(bedCount > 0) {
      divisionObject.status = "Incomplete"
    } else {
      divisionObject.status = "Complete"
    }
    divisionObject.totalBeds = bedCount;

    this.firestore.collection("divisions").doc(divisionObject.firestoreId).set( divisionObject, { merge: true } );

    // Set state of Application.
    this.selectedDivision = divisionObject;
    this.selectedDivisionUnits = divisionObject.units;
  }

  // Set the selected Division Unit.
  public setSelectedDivisionUnit(unitObject): void {
    // Set the next state of the unitObject that is observable.
    this.selectedUnitInfo.next(unitObject);
  }

  // Sends the updated unit to firestore.
  public setUnitStatus(unitObject): void {
    this.selectedUnitInfo.next(unitObject);
    let selectedUnit = this.selectedUnitInfo.getValue();
    // Replace the old unit in selectedDivisionUnits to the updated unit that was exposed to a change in status.
      for(let i=0; i < this.selectedDivisionUnits.length; i++) {
        let tempUnit = this.selectedDivisionUnits[i];
        if(selectedUnit.id === tempUnit.id) {
          this.selectedDivisionUnits[i] = selectedUnit;
          // Call firestore to replace entire selectedDivisionUnits with the new one.
          this.firestore.collection("divisions").doc(this.selectedDivision.firestoreId).set({ units: this.selectedDivisionUnits }, { merge: true });
        }
      }
  }

  // Firestore related services.
  public sendPatientDischargeChange(unit: Unit, patient: Patient): void {
    // Change state of unit for selected division.
    for(let i=0; i<this.selectedDivision.units.length; i++) {
      if(unit.id === this.selectedDivision.units[i].id) {
        this.selectedDivisionUnits[i] = unit
      }
    }

    // Send to firestore the new state of units for the division.
    //this.firestore.collection('divisions').doc(this.selectedDivision.firestoreId).set({ units: this.selectedDivision.units}, {merge: true});
    this.firestore.collection('user').doc(patient.id).set(patient);
  }

}
