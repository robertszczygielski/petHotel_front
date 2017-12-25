import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { FoodService } from "../food.service";
import { Router } from "@angular/router";
import { PetTypes } from "../../enums/PetTypes";
import { FoodTypes } from "../../enums/FoodType";
import { Food } from "../../dtos/Food";

@Component({
  selector: 'app-food-create',
  templateUrl: './food-create.component.html',
  styleUrls: ['./food-create.component.css'],
  providers: [FoodService]
})
export class FoodCreateComponent implements OnInit {

  protected foodForm: FormGroup;
  protected allFood: Food[] = [];
  protected petTypes: string[] = [];
  protected petType: string = 'Pet type';
  protected foodTypes: string[] = [];
  protected foodType: string = 'Food type';

  constructor(private foodService: FoodService,
              private router: Router) { }

  ngOnInit() {

    for (var i in PetTypes) {
      if (typeof PetTypes[i] === 'number') {
        this.petTypes.push(i);
      }
    }

    for (var i in FoodTypes) {
      if (typeof FoodTypes[i] === 'number') {
        this.foodTypes.push(i);
      }
    }

    this.foodForm = new FormGroup({
      foodName: new FormControl('', Validators.required),
      foodTaste: new FormControl('', Validators.required),
      foodType: new FormControl(''),
      petType: new FormControl(''),
      amount: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required)
    });

  }

  onSubmitFood() {
    if (this.foodForm.valid) {
      let food: Food = new Food(
        this.foodForm.controls['foodName'].value,
        this.foodType,
        this.foodForm.controls['amount'].value,
        this.petType,
        this.foodForm.controls['foodTaste'].value,
        this.foodForm.controls['price'].value
      );

      this.allFood.push(food);

      this.foodForm.reset();
    }
  }

  onSubmitAllFood() {
    if (!this.nothingToSend()) {
      this.foodService.saveFood(this.allFood).subscribe();
    }

    this.redirectFoodPage()
  }

  redirectFoodPage() {
    this.router.navigate(['/food']);
  }

  setFoodType(foodType: string) {
    this.foodType = foodType;
  }

  setPetType(petType: string) {
    this.petType = petType;
  }

  selectedAllDropdownForFood(): boolean {
    return this.petType !== 'Pet type' && this.foodType !== 'Food type';
  }

  nothingToSend(): boolean {
    return this.allFood.length === 0;
  }
}
