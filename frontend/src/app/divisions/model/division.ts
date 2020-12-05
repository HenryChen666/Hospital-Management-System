import { Unit } from './unit';

export class Division {
  constructor(
    public id: number,
    public firestoreId: string,
    public chargeNurse: string,
    public telephoneExt: string,
    public totalBeds: string,
    public status: string,
    public location: string,
    public category: string,
    public units: Unit[]
  ){}
}