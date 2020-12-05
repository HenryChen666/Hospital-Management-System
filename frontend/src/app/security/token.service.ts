import { Injectable } from '@angular/core';

export const TOKEN = 'token';
export const USER_NAME = 'username';
export const USER_FIRSTNAME = 'firstname';
export const USER_LASTNAME = 'lastname';
export const USER_ROLE = 'role';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  signOut(): void {
    window.sessionStorage.clear();
  }

  public saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN);
    window.sessionStorage.setItem(TOKEN, token);
  }

  public getToken(): string {
    return sessionStorage.getItem(TOKEN);
  }

  public saveUsername(username: string): void {
    window.sessionStorage.removeItem(USER_NAME);
    window.sessionStorage.setItem(USER_NAME, username);
  }

  public saveFirstname(firstname: string): void {
    window.sessionStorage.removeItem(USER_FIRSTNAME);
    window.sessionStorage.setItem(USER_FIRSTNAME, firstname);
  }

  public saveLastname(lastname: string): void {
    window.sessionStorage.removeItem(USER_LASTNAME);
    window.sessionStorage.setItem(USER_LASTNAME, lastname);
  }

  public saveUserRole(role: string): void {
    window.sessionStorage.removeItem(USER_ROLE);
    window.sessionStorage.setItem(USER_ROLE, role);
  }

  public getUser(): string {
    return sessionStorage.getItem(USER_NAME);
  }

  public getFirstname(): string {
    return sessionStorage.getItem(USER_FIRSTNAME);
  }

  public getLastname(): string {
    return sessionStorage.getItem(USER_LASTNAME);
  }

  public getRole(): string {
    return sessionStorage.getItem(USER_ROLE);
  }
}
