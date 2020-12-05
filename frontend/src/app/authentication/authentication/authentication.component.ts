import { Component, OnInit } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../security/authentication.service';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {

  constructor(private router: Router, private loginService: AuthenticationService) { }
  tabType = 'Login';

  ngOnInit(): void {
    if(this.loginService.isLoggedIn()){
      this.router.navigate(['profile'])
    }
  }

  //change tab title on tab change
  tabChanged(tabChangeEvent: MatTabChangeEvent): void{
    if(tabChangeEvent.index == 0){
      this.tabType = 'Login';
    }
    else{
      this.tabType = 'Register'
    }
  }

}
