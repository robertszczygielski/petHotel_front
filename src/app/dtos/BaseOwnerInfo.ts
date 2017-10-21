export class BasicOwnerInfo {
  id: number;
  firstName: string;
  lastName: string;
  petNumbers: number;


  constructor(id: number, firstName: string, lastName: string, petNumbers: number) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.petNumbers = petNumbers;
  }
}
