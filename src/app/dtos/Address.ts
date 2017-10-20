export class Address {
  city: string;
  street: string;
  numberofHouse: string;
  numberofFlat: string;
  zipCode: string;


  constructor(city: string, street: string, numberofHouse: string, numberofFlat: string, zipCode: string) {
    this.city = city;
    this.street = street;
    this.numberofHouse = numberofHouse;
    this.numberofFlat = numberofFlat;
    this.zipCode = zipCode;
  }
}
