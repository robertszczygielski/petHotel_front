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
    this.prepareTypesFromEnum();

    this.foodForm = this.prepareFoodForm();
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

  public onSubmitAllFood() {
    if (!this.nothingToSend()) {
      this.foodService.saveFood(this.allFood).subscribe();
    }

    this.redirectFoodPage()
  }

  public setFoodType(foodType: string) {
    this.foodType = foodType;
  }

  public setPetType(petType: string) {
    this.petType = petType;
  }

  public selectedAllDropdownForFood(): boolean {
    return this.petType !== 'Pet type' && this.foodType !== 'Food type';
  }

  public nothingToSend(): boolean {
    return this.allFood.length === 0;
  }

  private redirectFoodPage() {
    this.router.navigate(['/food']);
  }

  private prepareTypesFromEnum() {
    for (var i in PetTypes) {
      this.petTypes.push(i.toLocaleLowerCase());
    }

    for (var i in FoodTypes) {
      this.foodTypes.push(i.toLocaleLowerCase());
    }
  }

  private prepareFoodForm(): FormGroup {
    return new FormGroup({
      foodName: new FormControl('', Validators.required),
      foodTaste: new FormControl('', Validators.required),
      foodType: new FormControl(''),
      petType: new FormControl(''),
      amount: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required)
    });
  }
}
