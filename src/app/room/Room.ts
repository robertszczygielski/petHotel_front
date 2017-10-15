export class Room {
  roomNumber: number;
  numberOfPlaces: number;
  freePlaces: number;
  petType: string;


  constructor(roomNumber: number, numberOfPlaces: number, freePlaces: number, petType: string) {
    this.roomNumber = roomNumber;
    this.numberOfPlaces = numberOfPlaces;
    this.freePlaces = freePlaces;
    this.petType = petType;
  }
}
