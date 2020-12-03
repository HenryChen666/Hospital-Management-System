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

  public getSelectedDivisionUnit(): Unit {
    return this.selectedDivisionUnit
  }

  public getUnitsForDivision(divisionName): Unit[] {
    for(let i=0; i < this.divisions.length; i++) {
      if(this.divisions[i].category === divisionName) {
        return this.divisions[i].units;
      }
    }
  }

  public setDivision(divisionObject): void {
    this.selectedDivision = divisionObject;
  }

  public setSelectedDivisionUnit(unitObject): void {
    this.selectedDivisionUnit = unitObject;
  }

  public setUnitStatus(unitObject): void {
    this.selectedDivisionUnit = unitObject;
    for(let i=0; i < this.selectedDivisionUnits.length; i++) {
      let unit = this.selectedDivisionUnits[i];
      if(this.selectedDivisionUnit.id === unit.id) {
        this.selectedDivisionUnits[i] = this.selectedDivisionUnit;
      }
    }
    //this.firestore.collection("divisions").doc(this.selectedDivision.firestoreId).set({})
  }

}
