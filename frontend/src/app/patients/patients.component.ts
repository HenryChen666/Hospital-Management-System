import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router, Routes} from '@angular/router';
import {PatientComponent} from './patient/patient.component';

export const patientsRoutes: Routes = [
  {path: ':id', component: PatientComponent}
];

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.css']
})
export class PatientsComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
  }
  
  submit(value: string): void {
    this.router.navigate(['./', value], {relativeTo: this.route});
  }
}
