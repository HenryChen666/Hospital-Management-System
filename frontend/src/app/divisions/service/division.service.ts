import { Injectable } from '@angular/core';
import { Division } from '../model/division';
import { Unit } from '../model/unit';
import { HttpClient } from '@angular/common/http';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class DivisionService {
  divisions: Division[] = [];
  selectedDivision: Division;
  selectedDivisionUnits: Unit[] = [];
  selectedDivisionUnit: Unit;

  constructor(private http: HttpClient, private firestore: AngularFirestore) { }

  public getAllDivisions() {
    return this.firestore.collection("divisions").snapshotChanges();
  }

  public getSelectedDivision(): Division {
    return this.selectedDivision;
  }

  public getSelectedDivisionUnit() {
    return this.selectedDivisionUnit;
  }

  public getUnitsForDivision() {
    return this.firestore.collection("divisions").doc(this.selectedDivision.firestoreId).snapshotChanges();
  }

  // Set the selected Division and its Units.
  public setDivision(divisionObject): void {
    this.selectedDivision = divisionObject;
    this.selectedDivisionUnits = divisionObject.units;
  }

  // Set the selected Division Unit.
  public setSelectedDivisionUnit(unitObject): void {
    this.selectedDivisionUnit = unitObject;
  }

  // Sends the updated unit to firestore.
  public setUnitStatus(unitObject): void {
    this.selectedDivisionUnit = unitObject;
    // Replace the old unit in selectedDivisionUnits to the updated unit that was exposed to a change in status.
    for(let i=0; i < this.selectedDivisionUnits.length; i++) {
      let unit = this.selectedDivisionUnits[i];
      if(this.selectedDivisionUnit.id === unit.id) {
        this.selectedDivisionUnits[i] = this.selectedDivisionUnit;
      }
    }

    // Call firestore to replace entire selectedDivisionUnits with the new one.
    this.firestore.collection("divisions").doc(this.selectedDivision.firestoreId).set({ units: this.selectedDivisionUnits }, { merge: true });
  }

}
