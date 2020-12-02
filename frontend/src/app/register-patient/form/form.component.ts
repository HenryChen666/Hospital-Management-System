import { Component } from '@angular/core';
import {AbstractControl, FormBuilder, Validators} from '@angular/forms';
import {Patientdatas} from '../patientdatas';
import {FormDbService} from './firestore/form-db.service';



@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})



//export class FormComponent implements OnInit {
  export class FormComponent  {
  message: string;
  hideMsg = true;
  msgStyle = {
    color: null,
    'background-color': 'white',
    'font-size': '150%',
  };

  users: Patientdatas[] = [];
  userForm = this.fromBuilder.group({
    phone: ['', [Validators.required, Validators.pattern('[1-9][0-9][0-9][1-9][0-9][0-9][0-9][0-9][0-9][0-9]')]],
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    dateofbirth: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]]
  });
  
  get phone(): AbstractControl{return this.userForm.get('phone'); }
  get firstName(): AbstractControl{return this.userForm.get('firstName'); }
  get lastName(): AbstractControl{return this.userForm.get('lastName'); }
  get email(): AbstractControl{return this.userForm.get('email'); }
  get dateofbirth() : AbstractControl{return this.userForm.get('dateofbirth'); }

  constructor(private  fromBuilder: FormBuilder, private store: FormDbService) { }

  
  ngOnInit(): void {
    this.message = '';
    this.store.getUsers().subscribe(data => {
      this.users = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...(e.payload.doc.data() as object)
        } as Patientdatas;
      });
    });
  }

  showMessage(type: string, msg: string): void {
    this.msgStyle.color = type === 'error' ? 'red' : 'blue';
    this.message = msg;
    this.hideMsg = false;
    setTimeout(
      () => {
        this.hideMsg = true;
      }, 3500
    );
  }
  
  onSubmit(): void{
    var number = this.users.length + Math.floor(Math.random() * 20) + 1
    const user = new Patientdatas(
      null,
      number.toString(),
      this.userForm.value.lastName,
      this.userForm.value.firstName,
      Number(this.userForm.value.phone),
      this.userForm.value.dateofbirth,
      this.userForm.value.email);
    this.users.push(user);
    this.store.createUser(user)
      .then(
        docRef => {
          //user.id = number.toString();
          user.id = docRef.id;
          this.showMessage('info', 'Sucessfully Save');
          console.log(user.id)
          console.log(number)
          }
    )
    .catch(_ =>
      this.showMessage('error', 'Save Unsuccessful')
    );
    this.userForm.reset();

  }

  delete(id: string): void {
    this.store.deleteUser(id)
      .then(_ =>
        this.showMessage('info', 'Sucessfully Delete')
    )
    .catch(_ =>
      this.showMessage('error', 'Delete Unsuccessful')
    );
  }

}
