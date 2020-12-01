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
  selectedHeaderDivision: String;
  selectedDivison: Division = null;
  isDivisionSelected: Boolean = false;
  divisionIdValue: Number;
  divisions: Division[] = [];

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

  handleChipChangeFirstLevel(chipName): void {
    switch(chipName) {
      case "IntensiveCareDivision":
        this.isIntensiveCareDivisionSelected = true;
        this.isNonIntensiveCareDivisionSelected = false;
        this.isSpecialityDivisionSelected = false;
        this.selectedHeaderDivision = "Intensive Care Division";
        break;
      case "NonIntensiveCareDivision":
        this.isIntensiveCareDivisionSelected = false;
        this.isNonIntensiveCareDivisionSelected = true;
        this.isSpecialityDivisionSelected = false;
        this.selectedHeaderDivision = "Non Intensive Care Division";
        break;
      case "SpecialityDivision":
        this.isIntensiveCareDivisionSelected = false;
        this.isNonIntensiveCareDivisionSelected = false;
        this.isSpecialityDivisionSelected = true;
        this.selectedHeaderDivision = "Specialty Division";
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
        this.selectedDivison.category = "Neonatal (NICUs)";
        this.divisionIdValue = 10;
      break;
      case "Pediatric":
        this.isNICUs = false;
        this.isPICUs = true;
        this.isCCUs = false;
        this.isSICUs = false;
        this.isMICUs = false;
        this.isLTAC = false;
        this.selectedDivison.category = "Pediatric (PICUs)";
        this.divisionIdValue = 11;
      break;
      case "Coronary":
        this.isNICUs = false;
        this.isPICUs = false;
        this.isCCUs = true;
        this.isSICUs = false;
        this.isMICUs = false;
        this.isLTAC = false;
        this.selectedDivison.category = "Coronary & Cardiothoracic (CCUs/CTUs)";
        this.divisionIdValue = 12;
      break;
      case "Surgical":
        this.isNICUs = false;
        this.isPICUs = false;
        this.isCCUs = false;
        this.isSICUs = true;
        this.isMICUs = false;
        this.isLTAC = false;
        this.selectedDivison.category = "Surgical (SICUs)";
        this.divisionIdValue = 13;
      break;
      case "Medical":
        this.isNICUs = false;
        this.isPICUs = false;
        this.isCCUs = false;
        this.isSICUs = false;
        this.isMICUs = true;
        this.isLTAC = false;
        this.selectedDivison.category = "Medical (MICUs)";
        this.divisionIdValue = 14;
      break;
      case "Long":
        this.isNICUs = false;
        this.isPICUs = false;
        this.isCCUs = false;
        this.isSICUs = false;
        this.isMICUs = false;
        this.isLTAC = true;
        this.selectedDivison.category = "Long Term (LTAC ICUs)";
        this.divisionIdValue = 15;
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
        this.selectedDivison.category = "Neonatal";
        this.divisionIdValue = 20;
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
        this.selectedDivison.category = "Women and infant";
        this.divisionIdValue = 21;
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
        this.selectedDivison.category = "Pediatric";
        this.divisionIdValue = 22;
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
        this.selectedDivison.category = "Post-Critical";
        this.divisionIdValue = 23;
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
        this.selectedDivison.category = "Oncology";
        this.divisionIdValue = 24;
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
        this.selectedDivison.category = "Surgical";
        this.divisionIdValue = 25;
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
        this.selectedDivison.category = "Medical";
        this.divisionIdValue = 26;
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
        this.selectedDivison.category = "Rehabilitation";
        this.divisionIdValue = 27;
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
        this.selectedDivison.category = "Long Term";
        this.divisionIdValue = 28;
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
        this.selectedDivison.category = "Burn";
        this.divisionIdValue = 30;
      break;
      case "Oncology":
        this.isSBurn = false;
        this.isSOncology = true;
        this.isSTrauma = false;
        this.isSNeurological = false;
        this.selectedDivison.category = "Oncology";
        this.divisionIdValue = 31;
      break;
      case "Trauma":
        this.isSBurn = false;
        this.isSOncology = false;
        this.isSTrauma = true;
        this.isSNeurological = false;
        this.selectedDivison.category = "Trauma";
        this.divisionIdValue = 32;
      break;
      case "Neurological":
        this.isSBurn = false;
        this.isSOncology = false;
        this.isSTrauma = false;
        this.isSNeurological = true;
        this.selectedDivison.category = "Neurological";
        this.divisionIdValue = 33;
      break;
    }
  }
  submit(value: string): void {
    this.router.navigate(['./', value], {relativeTo: this.route});
  }

}
