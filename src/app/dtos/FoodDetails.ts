import { Food } from "./Food";

export class FoodDetails {
  food: Food;
  deliveryAmount: number;
  deliveryDate: Date;

  constructor(food: Food, deliveryAmount: number, deliveryDate: Date) {
    this.food = food;
    this.deliveryAmount = deliveryAmount;
    this.deliveryDate = deliveryDate;
  }
}

