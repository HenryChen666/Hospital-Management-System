import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PatientsComponent } from './patients/patients.component';
import { AuthenticationComponent } from './authentication/authentication/authentication.component';
import { RequestListComponent } from './request-list/request-list.component';
import { RegisterPatientComponent } from './register-patient/register-patient.component';
import { ContactComponent } from './contact/contact.component';

const routes: Routes = [
  {path: 'auth', component: AuthenticationComponent},
  {path: 'home', component: HomeComponent},
  {path: 'patients', component: PatientsComponent},
  {path: 'requestList', component: RequestListComponent},
  {path: 'registerPatient', component: RegisterPatientComponent},
  {path: 'contact', component: ContactComponent},
  {path: '', component: AuthenticationComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
