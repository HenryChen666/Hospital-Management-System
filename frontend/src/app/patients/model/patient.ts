import { Division } from 'src/app/divisions/model/division';

export class Patient {
  constructor(
    public id: string,
    public firstName: string,
    public lastName: string,
    public address: string,
    public phoneNumber: number,
    public dateOfBirth: number,
    public gender: string,
    public maritalStatus: string,
    public externalDoctorId: string,
    public nextOfKin: any,
    public divisionId: Division,
    public bedNumAssigned: string,
  ) {}
}


export class Doctor {
  constructor(
    public id: number,
    public username: string,
    public firstname: string,
    public lastname: string
  ){}
}