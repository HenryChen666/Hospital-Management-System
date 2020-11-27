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
  // First Layer of Divisions
  isIntensiveCareDivisionSelected: Boolean;
  isNonIntensiveCareDivisionSelected: Boolean;
  isSpecialityDivisionSelected: Boolean;

  // Second Layer of Divisions
    // Intensive Care
  isNICUs: Boolean;
  isPICUs: Boolean;
  isCCUs: Boolean;
  isSICUs: Boolean;
  isMICUs: Boolean;
  isLTAC: Boolean;
    // Non Intensive Care
  isNNICUs: Boolean;
  isWomen: Boolean;
  isPNICUs: Boolean;
  isPost: Boolean;
  isOncology: Boolean;
  isNCCUs: Boolean;
  isSNICUs: Boolean;
  isMNICUs: Boolean;
  isRehabilitation: Boolean;
  isNLTAC: Boolean;
    // Speciality
  isSBurn: Boolean
  isSOncology: Boolean
  isSTrauma: Boolean
  isSNeurological: Boolean

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  handleChipChangeFirstLevel(chipName): void {
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

  handleChipChangeSecondLevelIntensive(chipName): void {
    switch(chipName) {
      case "Neonatal":
        this.isNICUs = true;
        this.isPICUs = false;
        this.isCCUs = false;
        this.isSICUs = false;
        this.isMICUs = false;
        this.isLTAC = false;
      break;
      case "Pediatric":
        this.isNICUs = false;
        this.isPICUs = true;
        this.isCCUs = false;
        this.isSICUs = false;
        this.isMICUs = false;
        this.isLTAC = false;
      break;
      case "Coronary":
        this.isNICUs = false;
        this.isPICUs = false;
        this.isCCUs = true;
        this.isSICUs = false;
        this.isMICUs = false;
        this.isLTAC = false;
      break;
      case "Surgical":
        this.isNICUs = false;
        this.isPICUs = false;
        this.isCCUs = false;
        this.isSICUs = true;
        this.isMICUs = false;
        this.isLTAC = false;
      break;
      case "Medical":
        this.isNICUs = false;
        this.isPICUs = false;
        this.isCCUs = false;
        this.isSICUs = false;
        this.isMICUs = true;
        this.isLTAC = false;
      break;
      case "Long":
        this.isNICUs = false;
        this.isPICUs = false;
        this.isCCUs = false;
        this.isSICUs = false;
        this.isMICUs = false;
        this.isLTAC = true;
      break;
    }
  }

  handleChipChangeSecondLevelNonIntensive(chipName): void {
    switch(chipName) {
      case "Neonatal":
        this.isNNICUs = true;
        this.isWomen = false;
        this.isPNICUs = false;
        this.isPost = false;
        this.isOncology = false;
        this.isSNICUs = false;
        this.isMNICUs = false;
        this.isRehabilitation = false;
        this.isNLTAC = false;
      break;
      case "Women":
        this.isNNICUs = false;
        this.isWomen = true;
        this.isPNICUs = false;
        this.isPost = false;
        this.isOncology = false;
        this.isSNICUs = false;
        this.isMNICUs = false;
        this.isRehabilitation = false;
        this.isNLTAC = false;
      break;
      case "Pediatric":
        this.isNNICUs = false;
        this.isWomen = false;
        this.isPNICUs = true;
        this.isPost = false;
        this.isOncology = false;
        this.isSNICUs = false;
        this.isMNICUs = false;
        this.isRehabilitation = false;
        this.isNLTAC = false;
      break;
      case "Post-Critical":
        this.isNNICUs = false;
        this.isWomen = false;
        this.isPNICUs = false;
        this.isPost = true;
        this.isOncology = false;
        this.isSNICUs = false;
        this.isMNICUs = false;
        this.isRehabilitation = false;
        this.isNLTAC = false;
      break;
      case "Oncology":
        this.isNNICUs = false;
        this.isWomen = false;
        this.isPNICUs = false;
        this.isPost = false;
        this.isOncology = true;
        this.isSNICUs = false;
        this.isMNICUs = false;
        this.isRehabilitation = false;
        this.isNLTAC = false;
      break;
      case "Surgical":
        this.isNNICUs = false;
        this.isWomen = false;
        this.isPNICUs = false;
        this.isPost = false;
        this.isOncology = false;
        this.isSNICUs = true;
        this.isMNICUs = false;
        this.isRehabilitation = false;
        this.isNLTAC = false;
      break;
      case "Medical":
        this.isNNICUs = false;
        this.isWomen = false;
        this.isPNICUs = false;
        this.isPost = false;
        this.isOncology = false;
        this.isSNICUs = false;
        this.isMNICUs = true;
        this.isRehabilitation = false;
        this.isNLTAC = false;
      break;
      case "Rehabilitation":
        this.isNNICUs = false;
        this.isWomen = false;
        this.isPNICUs = false;
        this.isPost = false;
        this.isOncology = false;
        this.isSNICUs = false;
        this.isMNICUs = false;
        this.isRehabilitation = true;
        this.isNLTAC = false;
      break;
      case "Long":
        this.isNNICUs = false;
        this.isWomen = false;
        this.isPNICUs = false;
        this.isPost = false;
        this.isOncology = false;
        this.isSNICUs = false;
        this.isMNICUs = false;
        this.isRehabilitation = false;
        this.isNLTAC = true;
      break;
    }
  }
  
  handleChipChangeSecondLevelSpeciality(chipName): void {
    switch(chipName) {
      case "Burn":
        this.isSBurn = true;
        this.isSOncology = false;
        this.isSTrauma = false;
        this.isSNeurological = false;
      break;
      case "Oncology":
        this.isSBurn = false;
        this.isSOncology = true;
        this.isSTrauma = false;
        this.isSNeurological = false;
      break;
      case "Trauma":
        this.isSBurn = false;
        this.isSOncology = false;
        this.isSTrauma = true;
        this.isSNeurological = false;
      break;
      case "Neurological":
        this.isSBurn = false;
        this.isSOncology = false;
        this.isSTrauma = false;
        this.isSNeurological = true;
      break;
    }
  }
  submit(value: string): void {
    this.router.navigate(['./', value], {relativeTo: this.route});
  }

}
