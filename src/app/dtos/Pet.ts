import { Food } from "./Food";

export class Pet {
  private name: string;
  private comment: string;
  private petType: string;
  private roomNumber: number;
  private dateIn: Date;
  private dateOut: Date;
  private breakfast: Food;
  private dinner: Food;
  private supper: Food;


  constructor(name: string, comment: string, petType: string, roomNumber: number, dateIn: Date, dateOut: Date, breakfast: Food, dinner: Food, supper: Food) {
    this.name = name;
    this.comment = comment;
    this.petType = petType;
    this.roomNumber = roomNumber;
    this.dateIn = dateIn;
    this.dateOut = dateOut;
    this.breakfast = breakfast;
    this.dinner = dinner;
    this.supper = supper;
  }
}
