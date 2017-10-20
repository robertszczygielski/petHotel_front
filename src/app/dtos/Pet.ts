export class Pet {
  name: string;
  comment: string;
  petType: string;
  roomNumber: number;


  constructor(name: string, comment: string, petType: string, roomNumber: number) {
    this.name = name;
    this.comment = comment;
    this.petType = petType;
    this.roomNumber = roomNumber;
  }
}
