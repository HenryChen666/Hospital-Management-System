import { Unit } from './unit';

export class Division {
  constructor(
    public id: number,
    public firestoreId: string,
    public category: string,
    public units: Unit[]
  ){}
}