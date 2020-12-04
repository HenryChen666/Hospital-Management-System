export class Patient {
  constructor(
    public id: string,
    public firstName: string,
    public lastName: string,
    public address: string,
    public phoneNumber: number,
    public dateOfBirth: number,
    public gender: string,
    public martialStatus: string,
    public externalDoctorId: string,
    public nextOfKin: any
  ) {}
}
