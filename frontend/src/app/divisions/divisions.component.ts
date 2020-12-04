import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Routes } from '@angular/router';
import { DivisionService } from './service/division.service';
import { DivisionComponent } from './division/division.component';
import { Division } from './model/division';
import { Unit } from './model/unit';

export const divisionsRoutes: Routes = [
  {path: ':id', component: DivisionComponent}
]

@Component({
  selector: 'app-divisions',
  templateUrl: './divisions.component.html',
  styleUrls: ['./divisions.component.css']
})
export class DivisionsComponent implements OnInit {
  selectedDivison: Division = {
    "category": "Please select a division",
    "firestoreId": null,
    "id": 0,
    "units": null
  };
  isDivisionSelected: Boolean = false;
  divisionIdValue: Number;
  divisions: Division[] = [];

  // Unit Related.
  unitIdsArray: number[] = [];
  selectedUnit: Unit = {
    "id": 0,
    "maxPatientCapacity": 0,
    "name": "null",
    "numOfBedsLongTerm": 0,
    "numOfBedsShortTerm": 0,
    "numOfPatients": 0,
    "numOfStaffMembers": 0
  }

  constructor(private router: Router, private route: ActivatedRoute, private divisionsService: DivisionService) { }

  ngOnInit(): void {
    this.divisionsService.getAllDivisions().subscribe((res)=>(
      this.divisions = [],
      this.unitIdsArray = [],
      res.map((division)=>{
        let tempDivision = division.payload.doc.data() as Division;

        // Push the Division into the components Division Array.
        tempDivision.firestoreId = division.payload.doc.id;
        this.divisions.push(tempDivision);

        // Push it's Units and their Ids in an Array so it can be queried.
        for(let i=0; i<tempDivision.units.length; i++) {
          let unit = tempDivision.units[i];
          this.unitIdsArray.push(unit.id);
        }
      })
    ));
  }

  handleSelectedDivision(divisionId): void {
    // Set the selected division.
    for(let i=0; i<this.divisions.length; i++) {
      if(this.divisions[i].id === divisionId) {
        this.selectedDivison =  this.divisions[i];
        this.divisionsService.setDivision(this.divisions[i]);
        this.divisionIdValue = this.selectedDivison.id;
      }
    }
    // Indicate that a division has been selected.
    if(this.selectedDivison.id !== null) {
      this.isDivisionSelected = true;
    } else {
      this.isDivisionSelected = false;
    }
  }

  handleSelectedUnit(unitObject): void {
    this.selectedUnit = unitObject;
    this.divisionsService.setSelectedDivisionUnit(unitObject);
    this.divisionIdValue = this.selectedUnit.id;
  }

  findDivisionId(value): void {
    for(let unitId in this.unitIdsArray) {
      if(this.unitIdsArray[unitId] == value) {
        let divisionId = value.substring(0,2) + "00";
        this.handleSelectedDivision(divisionId)
      }
    }
  }

  submit(value: string): void {
    this.router.navigate(['./', value], {relativeTo: this.route});
  }

}
