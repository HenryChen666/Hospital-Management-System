export class Unit {
  constructor(
    public id: number,
    public name: string,
    public status: string,
    public numOfBedsShortTerm: number,
    public numOfBedsLongTerm: number,
    public numOfPatients: number,
    public numOfStaffMembers: number,
    public maxPatientCapacity: number,
    public shortTermBedArray: string[],
    public longTermBedArray: string[]
  ){}
}
