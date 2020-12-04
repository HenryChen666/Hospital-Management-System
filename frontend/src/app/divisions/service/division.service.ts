import { Injectable } from '@angular/core';
import { Division } from '../model/division';
import { Unit } from '../model/unit';
import { HttpClient } from '@angular/common/http';
import { AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DivisionService {
  divisions: Division[] = [];
  selectedDivision: Division;
  selectedDivisionUnits: Unit[] = [];
  selectedUnitInfo = new BehaviorSubject<Unit>(null);

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

  // Set the selected Division and its Units.
  public setDivision(divisionObject): void {
    this.selectedDivision = divisionObject;
    this.selectedDivisionUnits = divisionObject.units;
  }

  // Set the selected Division Unit.
  public setSelectedDivisionUnit(unitObject): void {
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

}
