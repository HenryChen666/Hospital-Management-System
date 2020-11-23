import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../security/authentication.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private router: Router, private loginService: AuthenticationService,) { }

  ngOnInit(): void {
  }

  //get user data
  get loggedUser(): string {
    return this.loginService.getUser();
  }

  //get user role
  get loggedRole(): string {
    return this.loginService.getRole();
  }

  logout(): boolean {
    this.loginService.logout();
    this.router.navigate(["auth"]);
    return true;
  }
}
