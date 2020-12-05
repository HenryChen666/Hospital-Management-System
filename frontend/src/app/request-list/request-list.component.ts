import { Component, OnInit } from '@angular/core';
import { Patient } from '../patients/model/patient';
import { RequestListService } from './request-list-service/request-list-service.service';

@Component({
  selector: 'app-request-list',
  templateUrl: './request-list.component.html',
  styleUrls: ['./request-list.component.css']
})
export class RequestListComponent implements OnInit {
    requestedPatientList: any[] = [];
    patients: Patient[] = [];
    constructor(private requestListService: RequestListService) { }

  ngOnInit(): void {
    this.requestListService.getRequestedPatientList().subscribe((res)=> {
      this.requestedPatientList = res;
      for(let patient in this.requestedPatientList) {
        this.patients.push(this.requestedPatientList[patient].patient);
      }
    });
  }

  Accept(id: string){
    //
  }

}
