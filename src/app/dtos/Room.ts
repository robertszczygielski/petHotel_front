export class Room {
  roomNumber: number;
  numberOfPlaces: number;
  freePlaces: number;
  petType: string;
  price: number;

  constructor(roomNumber: number, numberOfPlaces: number, freePlaces: number, petType: string, price: number) {
    this.roomNumber = roomNumber;
    this.numberOfPlaces = numberOfPlaces;
    this.freePlaces = freePlaces;
    this.petType = petType;
    this.price = price;
  }
}
