export class Prescription {
    constructor(
        public id: string,
        public drugNumber: string,
        public drugName: string,
        public  unitsByDay: string,
        public administrationByDay: string,
        public  administractionListings: string,
        public  administrationMethod: string,
        public  startDate: string,
        public  endDate: string,
      ) {}
}
