import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Pet } from "../../dtos/Pet";
import { Owner } from "../../dtos/Owner";
import { Address } from "../../dtos/Address";
import { HotelService } from "../hotel.service";
import { Room } from "../../dtos/Room";
import { PetTypes } from "../../enums/PetTypes";
import { OwnerTypes } from "../../enums/OwnerTypes";
import { Router } from "@angular/router";
import { Food } from "../../dtos/Food";
import { FoodService } from "../../food/food.service";

@Component({
  selector: 'app-hotel-create',
  templateUrl: './hotel-create.component.html',
  styleUrls: ['./hotel-create.component.css'],
  providers: [HotelService, FoodService]
})
export class HotelCreateComponent implements OnInit {

  protected ownerForm: FormGroup;
  protected petForm: FormGroup;

  protected pets: Pet[] =  [];
  protected owner: Owner;

  protected petTypes: string[] = [];
  protected petType: string = "pet type";
  protected ownerTypes: string[] = [];
  protected ownerType: string = "Owner Type";

  protected rooms: Room[] = [];
  protected roomNumber: number = 0;

  protected petBreakfast: Food;
  protected petDinner: Food;
  protected petSupper: Food;
  protected foods: Food[] = [];

  constructor(private hotelService: HotelService,
              private foodService: FoodService,
              private router: Router) {
  }

  ngOnInit() {
    let tmpFood: Food = new Food('food', 'non', 0, 'non', 'non', 0);
    this.petBreakfast = tmpFood;
    this.petDinner = tmpFood;
    this.petSupper = tmpFood;

    for (var i in PetTypes) {
      if (typeof PetTypes[i] === 'number') {
        this.petTypes.push(i);
      }
    }

    for (var i in OwnerTypes) {
      if (typeof OwnerTypes[i] === 'number') {
        this.ownerTypes.push(i);
      }
    }

    this.ownerForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
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
      let newBdata: Date = new Date(+parts[2], +parts[1] - 1, +parts[0]);
      parts = this.petForm.controls['endDate'].value.split('/');
      let newEdata: Date = new Date(+parts[2], +parts[1] - 1, +parts[0]);

      let pet: Pet = new Pet(
        this.petForm.controls['petName'].value,
        this.petForm.controls['petComment'].value,
        this.petType,
        this.roomNumber,
        newBdata,
        newEdata,
        this.petBreakfast,
        this.petDinner,
        this.petSupper
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
        this.ownerType,
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
    );

    this.foodService.getFoodList(type.toUpperCase()).subscribe(
      foods => {
        this.foods = foods;
      }, err => {
        console.log(err);
      }
    );
  }

  setRoom(room: Room) {
    this.roomNumber = room.roomNumber;
  }

  setOwnerType(ownerType: string) {
    this.ownerType = ownerType;
  }

  selectedAllDropdownForPet(): boolean {
    return !(this.roomNumber === 0
      && this.petType === "pet type");
  }

  redirectRoomPage() {
    this.router.navigate(['/hotel']);
  }

  setBreakfast(food: Food) {
    this.petBreakfast = food;
  }

  setDinner(food: Food) {
    this.petDinner = food;
  }

  setSupper(food: Food) {
    this.petSupper = food;
  }
}
