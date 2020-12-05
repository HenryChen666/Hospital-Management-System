import { Component, OnInit } from '@angular/core';
import { Patient } from '../patients/model/patient';
import { RequestListService } from './request-list-service/request-list-service.service';
import { MatDialog } from '@angular/material/dialog';
import { RequestDialogComponent } from './request-moreinfo-dialog/request-dialog.component';

// Dialog More Info data Related.
export interface DialogDataMoreInfo {
  requestData: any
}

@Component({
  selector: 'app-request-list',
  templateUrl: './request-list.component.html',
  styleUrls: ['./request-list.component.css']
})
export class RequestListComponent implements OnInit {
    requestedPatientList: any[] = [];
    patients: Patient[] = [];
    constructor(private requestListService: RequestListService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.requestListService.getRequestedPatientList().subscribe((res)=> {
      this.requestedPatientList = res;
      for(let patient in this.requestedPatientList) {
        this.patients.push(this.requestedPatientList[patient].patient);
      }
    });
  }

  openDialogInfo(patientId: string): void {
    // Get the selected request.
    let selectedRequest;
    for(let patientRequest in this.requestedPatientList) {
      let patientIdRequest = this.requestedPatientList[patientRequest].patient.id;
      if(patientIdRequest == patientId) {
        selectedRequest = this.requestedPatientList[patientRequest];
      }
    }
    // Set data to send to Dialog.
    let requestDialogObject = {
      "patientName": selectedRequest.patient.firstName + " " + selectedRequest.patient.lastName,
      "requestedDoctor": selectedRequest.doctor.fName + " " + selectedRequest.doctor.lName,
      "priority": selectedRequest.priority,
      "rationale": selectedRequest.rationale,
      "requestedUnit": selectedRequest.unit.name
    }

    // Open Dialog.
    const dialogRef = this.dialog.open(RequestDialogComponent, {
      width: '75%',   
      data: {
        requestData: requestDialogObject
      }
    })
  }

  Accept(id: string){
    //
  }

}
