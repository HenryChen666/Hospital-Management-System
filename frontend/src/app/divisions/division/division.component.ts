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
  }

}
