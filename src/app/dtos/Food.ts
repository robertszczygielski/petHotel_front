export class Food {
  name: string;
  foodType: string;
  amount: number;
  petType: string;
  taste: string;
  price: number;
  id: number;

  constructor(name: string, foodType: string,
              amount: number, petType: string,
              taste: string, price: number,
              id?: number) {
    this.name = name;
    this.foodType = foodType;
    this.amount = amount;
    this.petType = petType;
    this.taste = taste;
    this.price = price;
    this.id = id;
  }

}
