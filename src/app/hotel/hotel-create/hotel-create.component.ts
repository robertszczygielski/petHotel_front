import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Pet } from "../../dtos/Pet";
import { Owner } from "../../dtos/Owner";
import { Address } from "../../dtos/Address";
import { HotelService } from "../hotel.service";
import {Room} from "../../dtos/Room";

@Component({
  selector: 'app-hotel-create',
  templateUrl: './hotel-create.component.html',
  styleUrls: ['./hotel-create.component.css'],
  providers: [HotelService]
})
export class HotelCreateComponent implements OnInit {

  protected ownerForm: FormGroup;
  protected petForm: FormGroup;
  protected pets: Pet[] = [];
  protected owner: Owner;
  protected petTypes: string[] = ["Fish", "Bird", "Mammal"];
  protected petType: string = "pet type";
  protected rooms: Room[] = [];
  protected roomNumber: number = 0;

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
      petComment: new FormControl(''),
      petType: new FormControl(''),
      petRoomNumber: new FormControl(''),
      beginDate: new FormControl(''),
      endDate: new FormControl('')
    });

  }

  onSubmitPet() {
    if (this.petForm.valid) {
      let parts = this.petForm.controls['beginDate'].value.split('/');
      let newBdata: Date = new Date(+parts[2],+parts[1]-1, +parts[0]);
      parts = this.petForm.controls['endDate'].value.split('/');
      let newEdata: Date = new Date(+parts[2],+parts[1]-1, +parts[0]);

      let pet: Pet = new Pet(
        this.petForm.controls['petName'].value,
        this.petForm.controls['petComment'].value,
        this.petType,
        this.roomNumber,
        newBdata,
        newEdata
      );

      console.log(pet);

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

  setPetType(type: string) {
    this.petType = type;
    this.hotelService.getRoomsForType(type.toUpperCase()).subscribe(
      rooms => {
        this.rooms = rooms;
        this.roomNumber = 0;
      }, err => {
        console.log(err);
      }
    );;
  }

  setRoom(room: Room) {
    this.roomNumber = room.roomNumber;
  }
}
