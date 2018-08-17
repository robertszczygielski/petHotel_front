import { Room } from "./Room";
import { Shelf } from "../Shelf";

export class PlantRoom extends Room {
  shelves: Shelf[] ;
  temperature: number;
  orgin: string = "PlantRoom";

  constructor(roomNumber: number, numberOfPlaces: number, freePlaces: number, shelves: Shelf[], temperature: number, price: number) {
    super(roomNumber, numberOfPlaces, freePlaces, price);
    this.shelves = shelves;
    this.temperature = temperature;
  }

}
