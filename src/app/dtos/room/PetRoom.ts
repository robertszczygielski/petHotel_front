import { Room } from "./Room";

export class PetRoom extends Room {
  petType: string;
  orgin: string = "PetRoom";

  constructor(roomNumber: number, numberOfPlaces: number, freePlaces: number, petType: string, price: number) {
    super(roomNumber, numberOfPlaces, freePlaces, price);
    this.petType = petType;
  }

}
