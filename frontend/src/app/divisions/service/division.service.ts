import { Injectable } from '@angular/core';
import { Division } from '../model/division';
import { Unit } from '../model/unit';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient, HttpParams } from '@angular/common/http';

const divisions = [{
  "id": 1000,
  "category": "Intensive Care",
  "units": [
    {
      "id": 1010,
      "name": "Neonatal (NICUs)",
      "numOfBedsShortTerm": 10,
      "numOfBedsLongTerm": 5,
      "numOfPatients": 10,
      "numOfStaffMembers": 4,
      "maxPatientCapacity":20
    },
    {
      "id": 1020,
      "name": "Pediatric (PICUs)",
      "numOfBedsShortTerm": 10,
      "numOfBedsLongTerm": 5,
      "numOfPatients": 10,
      "numOfStaffMembers": 4,
      "maxPatientCapacity":20
    },
    {
      "id": 1030,
      "name": "Coronary & Cardiothoracic (CCUs/CTUs)",
      "numOfBedsShortTerm": 10,
      "numOfBedsLongTerm": 5,
      "numOfPatients": 10,
      "numOfStaffMembers": 4,
      "maxPatientCapacity":20
    },
    {
      "id": 1040,
      "name": "Surgical (SICUs)",
      "numOfBedsShortTerm": 10,
      "numOfBedsLongTerm": 5,
      "numOfPatients": 10,
      "numOfStaffMembers": 4,
      "maxPatientCapacity":20
    },
    {
      "id": 1050,
      "name": "Medical (MICUs)",
      "numOfBedsShortTerm": 10,
      "numOfBedsLongTerm": 5,
      "numOfPatients": 10,
      "numOfStaffMembers": 4,
      "maxPatientCapacity":20
    },
    {
      "id": 1060,
      "name": "Long Term (LTAC ICUs)",
      "numOfBedsShortTerm": 10,
      "numOfBedsLongTerm": 5,
      "numOfPatients": 10,
      "numOfStaffMembers": 4,
      "maxPatientCapacity":20
    }
  ]
},
{
  "id": 2000,
  "category": "Non Intensive Care",
  "units": [
    {
      "id": 2010,
      "name": "Neonatal",
      "numOfBedsShortTerm": 10,
      "numOfBedsLongTerm": 5,
      "numOfPatients": 10,
      "numOfStaffMembers": 4,
      "maxPatientCapacity":20
    },
    {
      "id": 2020,
      "name": "Women & Infant",
      "numOfBedsShortTerm": 10,
      "numOfBedsLongTerm": 5,
      "numOfPatients": 10,
      "numOfStaffMembers": 4,
      "maxPatientCapacity":20
    },
    {
      "id": 2030,
      "name": "Pediatric",
      "numOfBedsShortTerm": 10,
      "numOfBedsLongTerm": 5,
      "numOfPatients": 10,
      "numOfStaffMembers": 4,
      "maxPatientCapacity":20
    },
    {
      "id": 2040,
      "name": "Post-Critical",
      "numOfBedsShortTerm": 10,
      "numOfBedsLongTerm": 5,
      "numOfPatients": 10,
      "numOfStaffMembers": 4,
      "maxPatientCapacity":20
    },
    {
      "id": 2050,
      "name": "Oncology",
      "numOfBedsShortTerm": 10,
      "numOfBedsLongTerm": 5,
      "numOfPatients": 10,
      "numOfStaffMembers": 4,
      "maxPatientCapacity":20
    },
    {
      "id": 2060,
      "name": "Surgical",
      "numOfBedsShortTerm": 10,
      "numOfBedsLongTerm": 5,
      "numOfPatients": 10,
      "numOfStaffMembers": 4,
      "maxPatientCapacity":20
    },
    {
      "id": 2070,
      "name": "Medical",
      "numOfBedsShortTerm": 10,
      "numOfBedsLongTerm": 5,
      "numOfPatients": 10,
      "numOfStaffMembers": 4,
      "maxPatientCapacity":20
    },
    {
      "id": 2080,
      "name": "Rehabilitation",
      "numOfBedsShortTerm": 10,
      "numOfBedsLongTerm": 5,
      "numOfPatients": 10,
      "numOfStaffMembers": 4,
      "maxPatientCapacity":20
    },
    {
      "id": 2090,
      "name": "Long Term",
      "numOfBedsShortTerm": 10,
      "numOfBedsLongTerm": 5,
      "numOfPatients": 10,
      "numOfStaffMembers": 4,
      "maxPatientCapacity":20
    }
  ]
},
{
  "id": 3000,
  "category": "Specialty",
  "units": [
    {
      "id": 3010,
      "name": "Burn",
      "numOfBedsShortTerm": 10,
      "numOfBedsLongTerm": 5,
      "numOfPatients": 10,
      "numOfStaffMembers": 4,
      "maxPatientCapacity":20
    },
    {
      "id": 3020,
      "name": "Oncology",
      "numOfBedsShortTerm": 10,
      "numOfBedsLongTerm": 5,
      "numOfPatients": 10,
      "numOfStaffMembers": 4,
      "maxPatientCapacity":20
    },
    {
      "id": 3030,
      "name": "Trauma",
      "numOfBedsShortTerm": 10,
      "numOfBedsLongTerm": 5,
      "numOfPatients": 10,
      "numOfStaffMembers": 4,
      "maxPatientCapacity":20
    },
    {
      "id": 3040,
      "name": "Neurological",
      "numOfBedsShortTerm": 10,
      "numOfBedsLongTerm": 5,
      "numOfPatients": 10,
      "numOfStaffMembers": 4,
      "maxPatientCapacity":20
    }
  ]
}]; 

@Injectable({
  providedIn: 'root'
})
export class DivisionService {
  divisions: Division[] = [];
  selectedDivisionUnits: Unit[] = [];

  constructor(private http: HttpClient) {
    // Parse the Data.
    for(let i=0; i<divisions.length; i++) {
      let tempDivisionObject = divisions[i];
      let unitArray = [];
      for(let j=0; j<tempDivisionObject.units.length; j++) {
        let tempUnitObject = tempDivisionObject.units[j];
        let tempUnit = new Unit(tempUnitObject.id, tempUnitObject.name, tempUnitObject.numOfBedsShortTerm, tempUnitObject.numOfBedsLongTerm, tempUnitObject.numOfPatients, tempUnitObject.numOfStaffMembers, tempUnitObject.maxPatientCapacity);
        unitArray.push(tempUnit);
      }
      let tempDivision = new Division(tempDivisionObject.id, tempDivisionObject.category, unitArray);
      this.divisions.push(tempDivision);
    }
  }

  public getAllDivisions(): Division[] {
    return this.divisions;
  }

  public getUnitsForDivision(divisionName): Unit[] {
    for(let i=0; i < this.divisions.length; i++) {
      if(this.divisions[i].category === divisionName) {
        return this.divisions[i].units;
      }
    }
  }
}
