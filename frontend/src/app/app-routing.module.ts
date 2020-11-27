import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PatientsComponent } from './patients/patients.component';
import { AuthenticationComponent } from './authentication/authentication/authentication.component';
import { RequestListComponent } from './request-list/request-list.component';
import { RegisterPatientComponent } from './register-patient/register-patient.component';
import { ContactComponent } from './contact/contact.component';
import { ProfileComponent } from './profile/profile.component';
import { LayoutComponent } from './layout/layout.component';
import { DivisionsComponent } from './divisions/divisions.component';

const routes: Routes = [
  {path: 'auth', component: AuthenticationComponent},
  {path: '', component: LayoutComponent,
    children: [
      {path: 'home', component: HomeComponent},
      {path: 'patients', component: PatientsComponent},
      {path: 'requestlist', component: RequestListComponent},
      {path: 'registerpatient', component: RegisterPatientComponent},
      {path: 'divisions', component: DivisionsComponent},
      {path: 'contact', component: ContactComponent},
      {path: 'profile', component: ProfileComponent},
    ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
