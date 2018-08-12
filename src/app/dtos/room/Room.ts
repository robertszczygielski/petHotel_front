export class Room {
  roomNumber: number;
  numberOfPlaces: number;
  freePlaces: number;
  price: number;

  constructor(roomNumber: number, numberOfPlaces: number, freePlaces: number, price: number) {
    this.roomNumber = roomNumber;
    this.numberOfPlaces = numberOfPlaces;
    this.freePlaces = freePlaces;
    this.price = price;
  }
}
