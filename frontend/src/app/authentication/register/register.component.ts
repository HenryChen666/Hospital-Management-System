import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from '../../security/authentication.service';
import {MatSnackBar} from '@angular/material/snack-bar';

function passwordMatcher(pwGrp: FormGroup): { [s: string]: boolean } | null {
  return pwGrp.controls.password.value ===
      pwGrp.controls.confirmPassword.value ? null : {mismatch: true};
}


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  signupForm = this.builder.group({
    username: ['', Validators.required],
    firstname: ['', Validators.required],
    lastname: ['', Validators.required],
    pwGroup: this.builder.group({
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    }, { validator: passwordMatcher }),
    usertype: ['', Validators.required]
  });

  get username(): AbstractControl {return this.signupForm.get('username'); }
  get firstname(): AbstractControl {return this.signupForm.get('firstname'); }
  get lastname(): AbstractControl {return this.signupForm.get('lastname'); }
  get password(): AbstractControl {return this.signupForm.get('pwGroup').get('password'); }
  get confirmPassword(): AbstractControl {return this.signupForm.get('pwGroup').get('confirmPassword'); }
  get pwGroup(): AbstractControl {return this.signupForm.get('pwGroup'); }
  get usertype(): AbstractControl {return this.signupForm.get('usertype'); }

  constructor(private builder: FormBuilder, private authService: AuthenticationService,private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  //clear inputs and display register output for 3 seconds.
  register(): void {
    this.authService.register(this.username.value, this.firstname.value, this.lastname.value, this.password.value, this.usertype.value).subscribe(
      data => {
        this._snackBar.open(data.message, 'Close', {
          duration: 3000
        });
        //this.signupForm.reset();
      },
      error => {
        this._snackBar.open('Registration ' + error.error.message, 'Close', {
          duration: 3000
        });
      }
    );
  }

}