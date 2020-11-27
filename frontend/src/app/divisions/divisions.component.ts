import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Routes } from '@angular/router';
import { DivisionComponent } from './division/division.component';

export const divisionsRoutes: Routes = [
  {path: ':id', component: DivisionComponent}
]

@Component({
  selector: 'app-divisions',
  templateUrl: './divisions.component.html',
  styleUrls: ['./divisions.component.css']
})
export class DivisionsComponent implements OnInit {
  selectedDivison: 'IntensiveCareDivision';
  isIntensiveCareDivisionSelected: Boolean;
  isNonIntensiveCareDivisionSelected: Boolean;
  isSpecialityDivisionSelected: Boolean

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  handleChipChange(chipName): void {
    switch(chipName) {
      case "IntensiveCareDivision":
        this.isIntensiveCareDivisionSelected = true;
        this.isNonIntensiveCareDivisionSelected = false;
        this.isSpecialityDivisionSelected = false;
        break;
      case "NonIntensiveCareDivision":
        this.isIntensiveCareDivisionSelected = false;
        this.isNonIntensiveCareDivisionSelected = true;
        this.isSpecialityDivisionSelected = false;
        break;
      case "SpecialityDivision":
        this.isIntensiveCareDivisionSelected = false;
        this.isNonIntensiveCareDivisionSelected = false;
        this.isSpecialityDivisionSelected = true;
        break;
    }
  }

  submit(value: string): void {
    this.router.navigate(['./', value], {relativeTo: this.route});
  }

}
