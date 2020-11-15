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
export class LoginComponent{
  username = '';
  password = '';
  loggedIn = false;

  constructor(private router: Router,
              private loginService: AuthenticationService,
              private tokenService: TokenService,
              private _snackBar: MatSnackBar) { }

              

  get isLoggedIn(): boolean {
    return this.loginService.isLoggedIn();
  }

  get loggedUser(): string {
    return this.loginService.getUser();
  }

  get loggedRole(): string {
    return this.loginService.getRole();
  }

  //if credentials are valid, save token, username, and role
  checkLogin(): void {
    this.loginService.login(this.username, this.password).subscribe(
      data => {
        this.tokenService.saveToken(data.token);
        this.tokenService.saveUserName(data.username);
        this.tokenService.saveUserRole(data.role);
        this.loggedIn = true;
        //this.router.navigate(['patient'])
      },
      err => {
        this.loggedIn = false;
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
