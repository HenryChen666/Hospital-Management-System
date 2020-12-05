import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {TokenService} from './token.service';

const Url = 'http://localhost:8080/auth/';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private router: Router,
    private http: HttpClient,
    private tokenService: TokenService) {}
  
  login(username: string, password: string): Observable<any> {
    return this.http.post(Url + 'login', {
      username,
      password
    });
  }

  logout(): void {
    this.tokenService.signOut();
  }

  getUser(): string {
    return this.tokenService.getUser();
  }

  getRole(): string {
    return this.tokenService.getRole();
  }

  isLoggedIn(): boolean {
    return this.getUser() !== null;
  }

  isAdmin(): boolean {
    return this.tokenService.getRole() === 'ROLE_ADMIN';
  }

  register(username: string, firstname: string, lastname: string, password: string, role: string): Observable<any> {
    return this.http.post(Url + 'register', {
      username,
      firstname,
      lastname,
      password,
      role
    });
  }

  getDoctor(){
    return this.http.get(Url + 'getDoctors');
  }
}
