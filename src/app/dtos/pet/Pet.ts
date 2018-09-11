export class Pet {
  private name: string;
  private comment: string;
  private roomNumber: number;
  private dateIn: Date;
  private dateOut: Date;

  constructor(name: string, comment: string,
              roomNumber: number, dateIn: Date,
              dateOut: Date) {
    this.name = name;
    this.comment = comment;
    this.roomNumber = roomNumber;
    this.dateIn = dateIn;
    this.dateOut = dateOut;
  }
}
