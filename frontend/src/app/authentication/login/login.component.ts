import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../security/authentication.service';
import {Router} from '@angular/router';
import {TokenService} from '../../security/token.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  username = '';
  password = '';

  constructor(private router: Router,
              private loginService: AuthenticationService,
              private tokenService: TokenService,
              private _snackBar: MatSnackBar) { }

  //if user is logged in, navigate to /home
  ngOnInit(){
    /*if(this.isLoggedIn){
      this.router.navigate(['home']);
    }*/
  }              

  //check jwt token if user is logged in
  get isLoggedIn(): boolean {
    return this.loginService.isLoggedIn();
  }

  //get user data
  get loggedUser(): string {
    return this.loginService.getUser();
  }

  //get user role
  get loggedRole(): string {
    return this.loginService.getRole();
  }

  //if credentials are valid, save token, username, and role
  checkLogin(): void {
    this.loginService.login(this.username, this.password).subscribe(
      data => {
        this.tokenService.saveToken(data.token);
        this.tokenService.saveUsername(data.username);
        this.tokenService.saveFirstname(data.firstname);
        this.tokenService.saveLastname(data.lastname);
        this.tokenService.saveUserRole(data.role);
        this.router.navigate(['profile']);
      },
      err => {
        this._snackBar.open('Invalid Login' + err.error.message, 'Close', {
          duration: 3000
        });
      }
    );
  }

  logout(): boolean {
    this.loginService.logout();
    return true;
  }

}
