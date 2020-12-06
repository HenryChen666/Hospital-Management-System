import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../security/authentication.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  constructor(private router: Router, private loginService: AuthenticationService) { }
  links = [];
  activeLink = this.router.url.split("/")[1];

  ngOnInit(): void {
    if(this.router.url === "/"){
      this.router.navigate(["/profile"])
    }
    if(this.loginService.getRole() == "ROLE_NURSE" || this.loginService.getRole() == "ROLE_CHARGE_NURSE"){
      this.links = ['patients', 'requestlist','registerpatient','divisions','profile'];
    }
    else if(this.loginService.getRole() == "ROLE_DOCTOR"){
      this.links = ['patients', 'registerpatient','profile'];
    }
    else if(this.loginService.getRole() == "ROLE_MD"){
      this.links = ['patients', 'registerpatient','profile'];
    }
    else if(this.loginService.getRole() == "ROLE_PO"){
      this.links = ['patients', 'log','profile'];
    }
    else{
      this.links = ['patients', 'requestlist','registerpatient','divisions','profile', 'log'];
    }
  }

  //get user data
  get loggedUser(): string {
    return this.loginService.getUser();
  }

  //get user role
  get loggedRole(): string {
    return this.loginService.getRole();
  }

  route(link){
    this.activeLink = link;
    this.router.navigate([link]);
  }

}
