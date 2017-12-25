export class Food {
  name: string;
  foodType: string;
  amount: number;
  petType: string;
  taste: string;
  price: number;

  constructor(name: string, foodType: string, amount: number, petType: string, taste: string, price: number) {
    this.name = name;
    this.foodType = foodType;
    this.amount = amount;
    this.petType = petType;
    this.taste = taste;
    this.price = price;
  }

}
