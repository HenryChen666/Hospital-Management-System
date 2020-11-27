export class Division {
  constructor(
    public id: number,
    public category: string,
    public numOfBedsShortTerm: number,
    public numOfBedsLongTerm: number,
    public numOfPatients: number,
    public numOfStaffMembers: number,
    public maxPatientCapacity: number
  ){}
}
