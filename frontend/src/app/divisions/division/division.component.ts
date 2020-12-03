import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Division } from '../model/division';
import { Unit } from '../model/unit';
import { DivisionService } from '../service/division.service';

export interface UnitElement {
  name: string;
  num: number;
}

@Component({
  selector: 'app-division',
  templateUrl: './division.component.html',
  styleUrls: ['./division.component.css']
})
export class DivisionComponent implements OnInit {
  private subscription: Subscription;
  unit: Unit;

  // Table related items.
  displayedColumns: string[] = ['name', 'num', 'button'];
  tableNames: string[] = ['Short Term Beds Available', 'Long Term Beds Available', 'Number of Patients in Unit', 'Number of Staff Members in Unit', 'Max Patient Capacity'];
  unitNames: string[] = ['numOfBedsShortTerm', 'numOfBedsLongTerm', 'numOfPatients', 'numOfStaffMembers', 'maxPatientCapacity'];
  tableData: UnitElement[] = [];

  constructor(private divisionsService: DivisionService) { }

  ngOnInit(): void {
    // Formatting table data.
    this.unit = this.divisionsService.getSelectedDivisionUnit();
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

  handleButtonControl(name, movement) {
    console.log(name);
    console.log(movement);
    switch(name){
      case "Short Term Beds Available":
        if(movement === "up") {
          this.unit.numOfBedsShortTerm = this.unit.numOfBedsShortTerm-1;
        } else {
          this.unit.numOfBedsShortTerm = this.unit.numOfBedsShortTerm+1;
        }
      break;
      case "Long Term Beds Available":
        if(movement === "up") {
          this.unit.numOfBedsLongTerm = this.unit.numOfBedsLongTerm-1;
        } else {
          this.unit.numOfBedsLongTerm = this.unit.numOfBedsLongTerm+1;
        }
      break;
      case "Number of Patients in Unit":
        if(movement === "up") {
          this.unit.numOfPatients = this.unit.numOfPatients-1;
        } else {
          this.unit.numOfPatients = this.unit.numOfPatients+1;
        }
      break;
      case "Number of Staff Members in Unit":
        if(movement === "up") {
          this.unit.numOfStaffMembers = this.unit.numOfStaffMembers-1;
        } else {
          this.unit.numOfStaffMembers = this.unit.numOfStaffMembers+1;
        }
      break;
      case "Max Patient Capacity":
        if(movement === "up") {
          this.unit.maxPatientCapacity = this.unit.maxPatientCapacity-1;
        } else {
          this.unit.maxPatientCapacity = this.unit.maxPatientCapacity+1;
        }
      break;
    }
    this.divisionsService.setUnitStatus(this.unit)
  }

}
