export class Unit {
  constructor(
    public id: number,
    public name: string,
    public numOfBedsShortTerm: number,
    public numOfBedsLongTerm: number,
    public numOfPatients: number,
    public numOfStaffMembers: number,
    public maxPatientCapacity: number
  ){}
}
