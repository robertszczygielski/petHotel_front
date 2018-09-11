import { Pet } from "./Pet";

export class Plant extends Pet {
    private shelf: number;
    private toWater: number;
    private minTemperature: number;
    private maxTemperature: number;
    private plantInsolation: string;

    constructor(name: string, comment: string,
                roomNumber: number, shelf: number,
                dateIn: Date, dateOut: Date,
                toWater: number, minTemperature: number,
                maxTemperature: number, plantInsolation: string) {
      super(name, comment, roomNumber, dateIn, dateOut);
      this.shelf = shelf;
      this.toWater = toWater;
      this.minTemperature = minTemperature;
      this.maxTemperature = maxTemperature;
      this.plantInsolation = plantInsolation;
    }
}
