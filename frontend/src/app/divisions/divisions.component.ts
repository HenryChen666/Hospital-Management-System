import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Routes } from '@angular/router';
import { DivisionService } from './service/division.service';
import { Subscription } from 'rxjs';
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
  private subscription: Subscription;
  selectedDivison: Division = null;
  isDivisionSelected: Boolean = false;
  divisionIdValue: Number;
  divisions: Division[] = [];
  selectedUnit: Unit = null;

  constructor(private router: Router, private route: ActivatedRoute, private divisionsService: DivisionService) { }

  ngOnInit(): void {
    this.divisions = this.divisionsService.getAllDivisions()
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

  handleSelectedUnit(unitObject): void {
    this.selectedUnit = unitObject;
    this.divisionIdValue = this.selectedUnit.id;
  }

  handleIsSelectedUnit(unitObject): Boolean {
    if(this.selectedUnit !== null) {
      return this.selectedUnit.name === unitObject.name;
    }
  }

  submit(value: string): void {
    this.router.navigate(['./', value], {relativeTo: this.route});
  }

}
