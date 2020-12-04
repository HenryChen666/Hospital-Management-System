import { Injectable } from '@angular/core';
import { Division } from '../model/division';
import { Unit } from '../model/unit';
import { HttpClient } from '@angular/common/http';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class DivisionService {
  // Division Related.
  divisions: Division[] = [];
  selectedDivision: Division;

  // Unit Related.
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

}
