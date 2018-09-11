import { Pet } from "./Pet";
import { Food } from "../Food";

export class Animal extends Pet {
  private petType: string;
  private breakfast: Food;
  private dinner: Food;
  private supper: Food;

  constructor(name: string, comment: string,
              petType: string, roomNumber: number,
              dateIn: Date, dateOut: Date,
              breakfast: Food, dinner: Food,
              supper: Food) {
    super(name, comment, roomNumber, dateIn, dateOut);
    this.petType = petType;
    this.breakfast = breakfast;
    this.dinner = dinner;
    this.supper = supper;
  }

}
