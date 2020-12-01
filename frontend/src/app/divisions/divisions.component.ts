import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Routes } from '@angular/router';
import { DivisionComponent } from './division/division.component';
import { Division } from './model/division';

export const divisionsRoutes: Routes = [
  {path: ':id', component: DivisionComponent}
]

const divisions = [{
    "id": 1000,
    "category": "Intensive Care",
    "units": ["Neonatal (NICUs)", "Pediatric (PICUs)", "Coronary & Cardiothoracic (CCUs/CTUs)", "Surgical (SICUs)", "Medical (MICUs)", "Long Term (LTAC ICUs)"]
  },
  {
    "id": 2000,
    "category": "Non Intensive Care",
    "units": ["Neonatal", "Women & Infant", "Pediatric", "Post-Critical", "Oncology", "Surgical","Medical","Rehabilitation","Long Term"]
  },
  {
    "id": 3000,
    "category": "Specialty",
    "units": ["Burn", "Oncology", "Trauma", "Neurological"]
  }]; 

@Component({
  selector: 'app-divisions',
  templateUrl: './divisions.component.html',
  styleUrls: ['./divisions.component.css']
})
export class DivisionsComponent implements OnInit {
  selectedDivison: Division = null;
  isDivisionSelected: Boolean = false;
  divisionIdValue: Number;
  divisions: Division[] = [];
  selectedUnit: String;

  constructor(private router: Router, private route: ActivatedRoute) {
    for(let i=0; i<divisions.length; i++) {
      let tempDivisionObject = divisions[i];
      let tempDivision = new Division(tempDivisionObject.id, tempDivisionObject.category, tempDivisionObject.units);
      this.divisions.push(tempDivision);
    }
  }

  ngOnInit(): void {
  }

  handleSelectedDivision(divisionName): void {
    // Set the selected division.
    for(let i=0; i<this.divisions.length; i++) {
      if(this.divisions[i].category === divisionName) {
        this.selectedDivison =  this.divisions[i];
        this.divisionIdValue = this.selectedDivison.id;
      }
    }
    // Indicate that a division has been selected.
    if(this.selectedDivison.category !== '') {
      this.isDivisionSelected = true;
    } else {
      this.isDivisionSelected = false;
    }
  }

  handleIsSelectedDivision(divisionName): Boolean {
    if(this.selectedDivison !== null) {
      return this.selectedDivison.category === divisionName;
    } else {
      return false;
    }
  }

  handleSelectedUnit(unitName): void {
    this.selectedUnit = unitName;
  }

  handleIsSelectedUnit(unitName): Boolean {
    return this.selectedUnit === unitName;
  }

  submit(value: string): void {
    this.router.navigate(['./', value], {relativeTo: this.route});
  }

}
