import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from './security/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = "Patient Management System";
  isAuthenticated = this.authService.isLoggedIn()
  constructor(private authService: AuthenticationService) {}

  ngOnInit(): void {
    this.register();
  }
  register(): void {
    for(let i =100; i<= 300; i=i+100){
      this.authService.register("nurse" + i, "nurse_firstname", "nurse_lastname", "nurse", "charge_nurse").subscribe(
        data => {
          console.log("default nurse" +i + " registered");
          this.authService.register("doctor" + i, "doctor_firstname", "doctor_lastname", "doctor", "doctor").subscribe(
            data => {
              console.log("default doctor"+i +" registered");
            },
            error => {
              console.log("doctor error");
            }
          );
        },
        error => {
          console.log("nurse error");
        }
      );
    }
  }
}