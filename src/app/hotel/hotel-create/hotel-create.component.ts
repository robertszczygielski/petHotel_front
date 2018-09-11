import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Pet } from "../../dtos/pet/Pet";
import { Owner } from "../../dtos/Owner";
import { Address } from "../../dtos/Address";
import { HotelService } from "../hotel.service";
import { PetTypes } from "../../enums/PetTypes";
import { OwnerTypes } from "../../enums/OwnerTypes";
import { Router } from "@angular/router";
import { Food } from "../../dtos/Food";
import { FoodService } from "../../food/food.service";
import { Room } from "../../dtos/room/Room";
import { Animal } from "../../dtos/pet/Animal";
import { Plant } from "../../dtos/pet/Plant";

@Component({
  selector: 'app-hotel-create',
  templateUrl: './hotel-create.component.html',
  styleUrls: ['./hotel-create.component.css'],
  providers: [HotelService, FoodService]
})
export class HotelCreateComponent implements OnInit {

  protected ownerForm: FormGroup;
  protected petForm: FormGroup;
  protected plantForm: FormGroup;

  protected pets: Pet[] =  [];
  protected owner: Owner;

  protected petTypes: string[] = [];
  protected petType: string = "isPetAnimal type";
  protected ownerTypes: string[] = [];
  protected ownerType: string = "Owner Type";

  protected animalRooms: Room[] = [];
  protected plantRooms: Room[] = [];
  protected roomAnimalNumber: number = 0;
  protected roomPlantNumber: number = 0;
  protected shelfNumber: number = 0;
  protected planInsolation: string;

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
      this.petTypes.push(i.toLocaleLowerCase());
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

    this.plantForm = new FormGroup({
      plantName: new FormControl('', Validators.required),
      plantComment: new FormControl('', Validators.required),
      shelf: new FormControl(''),
      toWater: new FormControl(''),
      minTemperature: new FormControl('', Validators.required),
      maxTemperature: new FormControl('', Validators.required),
      plantInsolation: new FormControl('')
    })

  }

  protected onSubmitPet() {
    if (this.petForm.valid) {
      let parts = this.petForm.controls['beginDate'].value.split('/');
      let newBdata: Date = new Date(+parts[2], +parts[1] - 1, +parts[0]);
      parts = this.petForm.controls['endDate'].value.split('/');
      let newEdata: Date = new Date(+parts[2], +parts[1] - 1, +parts[0]);

      let pet: Pet = new Animal(
        this.petForm.controls['petName'].value,
        this.petForm.controls['petComment'].value,
        this.petType,
        this.roomAnimalNumber,
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

  protected onSubmitPlant() {
    if (this.plantForm.valid) {
      let parts = this.petForm.controls['beginDate'].value.split('/');
      let newBdata: Date = new Date(+parts[2], +parts[1] - 1, +parts[0]);
      parts = this.petForm.controls['endDate'].value.split('/');
      let newEdata: Date = new Date(+parts[2], +parts[1] - 1, +parts[0]);


      let pet: Pet = new Plant(
        this.plantForm.controls['plantName'].value,
        this.plantForm.controls['plantComment'].value,
        this.roomAnimalNumber,
        this.shelfNumber,
        newBdata,
        newEdata,
        this.plantForm.controls['toWater'].value,
        this.plantForm.controls['minTemperature'].value,
        this.plantForm.controls['maxTemperature'].value,
        this.planInsolation
      );

      console.log(pet);

      this.pets.push(pet);

      this.petForm.reset();
    }
  }

  protected onSubmitOwner() {
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

  protected setPetType(type: string) {
    this.petType = type;

    this.hotelService.getRoomsForType(type.toUpperCase()).subscribe(
      rooms => {
        this.animalRooms = rooms;
        this.roomAnimalNumber = 0;
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

  protected setRoom(room: Room) {
    this.roomAnimalNumber = room.roomNumber;
  }

  protected setOwnerType(ownerType: string) {
    this.ownerType = ownerType;
  }

  protected selectedAllDropdownForPet(): boolean {
    return !(this.roomAnimalNumber === 0
      && this.petType === "isPetAnimal type");
  }

  protected redirectRoomPage() {
    this.router.navigate(['/hotel']);
  }

  protected setBreakfast(food: Food) {
    this.petBreakfast = food;
  }

  protected setDinner(food: Food) {
    this.petDinner = food;
  }

  protected setSupper(food: Food) {
    this.petSupper = food;
  }

  protected minTempChange() {
    if (this.plantForm.controls['maxTemperature'].valid) {
      this.hotelService.getRoomsForTemperature(
        this.plantForm.controls['maxTemperature'].value,
        this.plantForm.controls['maxTemperature'].value).subscribe(
        rooms => {
          this.plantRooms = rooms;
          this.roomPlantNumber = 0;
        }, err => {
          console.log(err);
        }
      );
    }
  }

  protected maxTempChange() {
    if (this.plantForm.controls['minTemperature'].valid) {
      this.hotelService.getRoomsForTemperature(
        this.plantForm.controls['minTemperature'].value,
        this.plantForm.controls['maxTemperature'].value).subscribe(
        rooms => {
          this.plantRooms = rooms;
          this.roomPlantNumber = 0;
        }, err => {
          console.log(err);
        }
      );
    }
  }
}
