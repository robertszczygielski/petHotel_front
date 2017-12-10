export class Pet {
  name: string;
  comment: string;
  petType: string;
  roomNumber: number;
  dateIn: Date;
  dateOut: Date;


  constructor(name: string, comment: string, petType: string, roomNumber: number, beginDate: Date,
  endDate: Date) {
    this.name = name;
    this.comment = comment;
    this.petType = petType;
    this.roomNumber = roomNumber;
    this.dateIn = beginDate;
    this.dateOut = endDate;
  }
}
