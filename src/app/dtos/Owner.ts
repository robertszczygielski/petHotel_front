import { Pet } from "./pet/Pet";
import { Address } from "./Address";

export class Owner {
  firstName: string;
  lastName: string;
  ownerCategory: string;
  petList: Pet[];
  address: Address;


  constructor(firstName: string, lastName: string, ownerCategory: string, petList: Pet[], address: Address) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.ownerCategory = ownerCategory;
    this.petList = petList;
    this.address = address;
  }
}
