export class Shelf {
  number: number;
  free: boolean;
  plantInsolation: string;

  constructor(number: number, free: boolean, plantInsolation: string) {
    this.number = number;
    this.free = free;
    this.plantInsolation = plantInsolation;
  }
}
