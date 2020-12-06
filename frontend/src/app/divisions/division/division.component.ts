import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Division } from '../model/division';
import { Unit } from '../model/unit';
import { DivisionService } from '../service/division.service';

// Table Related.
export interface UnitElement {
  name: string;
  num: number;
}
export interface UnitElementPatientList {
  patientId: string;
  name: string;
  phoneNumber: number;
  gender: string;
  bedNumAssigned: string;
}

@Component({
  selector: 'app-division',
  templateUrl: './division.component.html',
  styleUrls: ['./division.component.css']
})
export class DivisionComponent implements OnInit {
  private subscription: Subscription;
  unit: Unit = {
    "id": 0,
    "name": "loading...",
    "status": "...",
    "numOfBedsShortTerm": 0,
    "numOfBedsLongTerm": 0,
    "numOfPatients": 0,
    "numOfStaffMembers": 0,
    "maxPatientCapacity": 0,
    "shortTermBedArray": [],
    "longTermBedArray": [],
    "patientArray": [],
  };
  unitTotalBeds: number;

  // Table related items.
  displayedColumns: string[] = ['name', 'num'];
  tableNames: string[] = ['Short Term Beds Available', 'Long Term Beds Available', 'Number of Patients in Unit', 'Number of Staff Members in Unit', 'Max Patient Capacity'];
  unitNames: string[] = ['numOfBedsShortTerm', 'numOfBedsLongTerm', 'numOfPatients', 'numOfStaffMembers', 'maxPatientCapacity'];
  tableData: UnitElement[] = [];
  unitDiagrams: string[] = ['../../../assets/images/SpecialtyWard.png','../../../assets/images/IntensiveCareWard.png','../../../assets/images/NonIntensiveCareWard.png']
  unitDiagramSelected: string;

  // Patient Table related items.
  displayedColumnsPatientTable: string[] = ["patientId", "name", "phoneNumber", "gender", "bedNumAssigned", "dischargeButton"];
  tableDataPatient: UnitElementPatientList[] = [];

  constructor(private divisionsService: DivisionService) { }

  ngOnInit(): void {
    // Get selected division unit.
    this.divisionsService.getSelectedDivisionUnit().subscribe((unit) => {
      // Set unit.
      this.unit = unit;

      // Testing Purposes: Set defaultPatientArray to patientArray of unit.
      this.unit.patientArray = this.divisionsService.getDefaultPatientArray();

      // Set total bed count.
      this.unitTotalBeds = this.unit.numOfBedsShortTerm + this.unit.numOfBedsLongTerm;

      // Determining Diagram to show based on Unit Id.
      if(this.unit.id > 3000) {
        this.unitDiagramSelected = this.unitDiagrams[0];
      } else if (this.unit.id < 3000 && this.unit.id > 2000) {
        this.unitDiagramSelected = this.unitDiagrams[2];
      } else {
        this.unitDiagramSelected = this.unitDiagrams[1];
      }

      // Format the tableData accordingly.
      this.formatTableData();
      this.formatPatientTableData();
    });

    // Get the updated data for unit then set it as well in divisions service.
    this.divisionsService.getUnitsForDivision().subscribe((res)=>{
      const division = res.payload.data() as Division;
      let units = division.units;
      for(let unit in units) {
        if(this.unit.id === units[unit].id) {
          this.unit = units[unit];
          this.divisionsService.setSelectedDivisionUnit(units[unit]);
          this.formatTableData();
        }
      }
    });
  }

  formatTableData() {
    this.tableData = [];
    for(let tableNamesIndex in this.tableNames) {
      let tableName = this.tableNames[tableNamesIndex];
      for(let item in this.unit) {
        if(this.unitNames[tableNamesIndex] === item) {
          let itemObj = {
            "name": tableName,
            "num": this.unit[item],
          }
          this.tableData.push(itemObj);
        }
      }
    }
  }

  formatPatientTableData() {
    // Reset State of Patient Data.
    this.tableDataPatient = [];
    // Loop through each patient for each row on table, grab necessary data of patient into an object, push object into tableData to be displayed in table.
    for(let patientIndex in this.unit.patientArray) {
      let patient = this.unit.patientArray[patientIndex];
      let itemObj = {
        "patientId": patient.id,
        "name": patient.firstName + " " + patient.lastName,
        "phoneNumber": patient.phoneNumber,
        "gender": patient.gender,
        "bedNumAssigned": patient.bedNumAssigned
      }
      this.tableDataPatient.push(itemObj);
    }
  }

  handleDischargeButton(patientId: string): void {
    this.divisionsService.sendPatientDischarge(patientId);
  }

  // Deprecated: not allowing control of bed counts.
  handleButtonControl(name, movement) {
    switch(name){
      case "Short Term Beds Available":
        if(movement === "up") {
          this.unit.numOfBedsShortTerm = this.unit.numOfBedsShortTerm+1;
        } else {
          this.unit.numOfBedsShortTerm = this.unit.numOfBedsShortTerm-1;
        }
      break;
      case "Long Term Beds Available":
        if(movement === "up") {
          this.unit.numOfBedsLongTerm = this.unit.numOfBedsLongTerm+1;
        } else {
          this.unit.numOfBedsLongTerm = this.unit.numOfBedsLongTerm-1;
        }
      break;
      case "Number of Patients in Unit":
        if(movement === "up") {
          this.unit.numOfPatients = this.unit.numOfPatients+1;
        } else {
          this.unit.numOfPatients = this.unit.numOfPatients-1;
        }
      break;
      case "Number of Staff Members in Unit":
        if(movement === "up") {
          this.unit.numOfStaffMembers = this.unit.numOfStaffMembers+1;
        } else {
          this.unit.numOfStaffMembers = this.unit.numOfStaffMembers-1;
        }
      break;
      case "Max Patient Capacity":
        if(movement === "up") {
          this.unit.maxPatientCapacity = this.unit.maxPatientCapacity+1;
        } else {
          this.unit.maxPatientCapacity = this.unit.maxPatientCapacity-1;
        }
      break;
    }
    this.divisionsService.setUnitStatus(this.unit);
  }

}
