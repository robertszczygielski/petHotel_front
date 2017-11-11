import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Pet } from "../../dtos/Pet";
import { Owner } from "../../dtos/Owner";
import { Address } from "../../dtos/Address";
import { HotelService } from "../hotel.service";

@Component({
  selector: 'app-hotel-create',
  templateUrl: './hotel-create.component.html',
  styleUrls: ['./hotel-create.component.css'],
  providers: [HotelService]
})
export class HotelCreateComponent implements OnInit {

  private ownerForm: FormGroup;
  private petForm: FormGroup;
  private pets: Pet[] = [];
  private owner: Owner;

  constructor(private hotelService: HotelService) { }

  ngOnInit() {

    this.ownerForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      ownerCategory: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      street: new FormControl('', Validators.required),
      numberofHouse: new FormControl('', Validators.required),
      numberofFlat: new FormControl('', Validators.required),
      zipCode: new FormControl('', Validators.required)
    });

    this.petForm = new FormGroup({
      petName: new FormControl('', Validators.required),
      petComment: new FormControl('', Validators.required),
      petType: new FormControl('', Validators.required),
      petRoomNumber: new FormControl('', Validators.required)
    });

  }

  onSubmitPet() {
    if (this.petForm.valid) {
      let pet: Pet = new Pet(
        this.petForm.controls['petName'].value,
        this.petForm.controls['petComment'].value,
        this.petForm.controls['petType'].value,
        this.petForm.controls['petRoomNumber'].value,
      );

      this.pets.push(pet);

      this.petForm.reset();
    }
  }

  onSubmitOwner() {
    if (this.ownerForm.valid) {
      let address: Address = new Address(
        this.ownerForm.controls['city'].value,
        this.ownerForm.controls['street'].value,
        this.ownerForm.controls['numberofHouse'].value,
        this.ownerForm.controls['numberofFlat'].value,
        this.ownerForm.controls['zipCode'].value
      );

      this.owner = new Owner(
        this.ownerForm.controls['firstName'].value,
        this.ownerForm.controls['lastName'].value,
        this.ownerForm.controls['ownerCategory'].value,
        this.pets,
        address
      );

      this.hotelService.saveOwner(this.owner).subscribe();

      this.ownerForm.reset();
      this.petForm.reset();
    }
  }
}
