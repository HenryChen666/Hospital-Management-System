import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PatientsComponent } from './patients/patients.component';
import {PatientComponent} from './patients/patient/patient.component';
import { AuthenticationComponent } from './authentication/authentication/authentication.component';
import { RequestListComponent } from './request-list/request-list.component';
import { RegisterPatientComponent } from './register-patient/register-patient.component';
import { ProfileComponent } from './profile/profile.component';
import { LayoutComponent } from './layout/layout.component';
import { DivisionsComponent } from './divisions/divisions.component';
import { Route } from '@angular/compiler/src/core';

const patientsRoutes: Routes = [
  {path: ':id', component: PatientComponent}
];

const routes: Routes = [
  {path: 'auth', component: AuthenticationComponent},
  {path: '', component: LayoutComponent,
    children: [
      {path: 'patients', component: PatientsComponent, children:patientsRoutes},
      {path: 'requestlist', component: RequestListComponent},
      {path: 'registerpatient', component: RegisterPatientComponent},
      {path: 'divisions', component: DivisionsComponent},
      {path: 'profile', component: ProfileComponent},
    ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
