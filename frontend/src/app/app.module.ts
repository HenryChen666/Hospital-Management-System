import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './authentication/login/login.component';
import { authInterceptorProviders } from './security/authentication-interceptor.service';
import { RegisterComponent } from './authentication/register/register.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AuthenticationComponent } from './authentication/authentication/authentication.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatRadioModule } from '@angular/material/radio';
import {MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import {MatSelectModule} from '@angular/material/select';
import { PatientsComponent } from './patients/patients.component';
import { RequestListComponent } from './request-list/request-list.component';
import { RegisterPatientComponent } from './register-patient/register-patient.component';
import { LayoutComponent } from './layout/layout.component';
import { ProfileComponent } from './profile/profile.component';
import { DivisionsComponent } from './divisions/divisions.component';
import { DivisionComponent } from './divisions/division/division.component';
import { PatientComponent } from './patients/patient/patient.component';
import { PrescribeMedicationModalComponent } from './patients/patient/prescribe-medication-modal/prescribe-medication-modal.component';
import { UpdatePatientModalComponent } from './patients/patient/update-patient-modal/update-patient-modal.component';

import {AngularFireModule} from '@angular/fire';
import {environment} from '../environments/environment';
import { PatientAdmissionRequestDialogComponent } from './patients/patient/patient-admission-request-dialog/patient-admission-request-dialog.component';
import { PatientAdmissionRequestDialogTwoComponent } from './patients/patient/patient-admission-request-dialog-two/patient-admission-request-dialog-two.component';
import { RequestDialogComponent } from './request-list/request-moreinfo-dialog/request-dialog.component';
import { LogComponent } from './log/log.component';
import { PatientAdmissionRequestDialogThreeComponent } from './patients/patient/patient-admission-request-dialog-three/patient-admission-request-dialog-three.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    AuthenticationComponent,
    PatientsComponent,
    RequestListComponent,
    RegisterPatientComponent,
    LayoutComponent,
    ProfileComponent,
    DivisionsComponent,
    DivisionComponent,
    PatientComponent,
    PrescribeMedicationModalComponent,
    UpdatePatientModalComponent,
    PatientAdmissionRequestDialogComponent,
    PatientAdmissionRequestDialogTwoComponent,
    RequestDialogComponent,
    LogComponent,
    PatientAdmissionRequestDialogThreeComponent
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatDialogModule,
    MatToolbarModule,
    MatInputModule,
    MatFormFieldModule,
    MatTabsModule,
    MatButtonModule,
    MatSnackBarModule,
    MatRadioModule,
    MatChipsModule,
    MatIconModule,
    MatTableModule,
    MatDialogModule,
    MatSelectModule
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
