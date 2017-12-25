import { Component, OnInit } from '@angular/core';
import { FoodService } from "../food.service";
import { Router } from "@angular/router";
import { PetTypes } from "../../enums/PetTypes";
import { Food } from "../../dtos/Food";

@Component({
  selector: 'app-food-list',
  templateUrl: './food-list.component.html',
  styleUrls: ['./food-list.component.css'],
  providers:[FoodService]
})
export class FoodListComponent implements OnInit {

  protected petType: string = 'Mammal';
  protected petTypes: string[] = [];
  protected foodList: Food[];

  constructor(private foodService: FoodService,
              private router: Router) { }

  ngOnInit() {
    for(var i in PetTypes) {
      if (typeof PetTypes[i] === 'number') {
        this.petTypes.push(i);
      }
    }

    this.setFoodListFotPetType();
  }

  protected setPetType(type: string): void {
    this.petType = type;
    this.setFoodListFotPetType();
  }

  private setFoodListFotPetType() {
    this.foodService.getFoodList(this.petType).subscribe(
      foodList => {
        this.foodList = foodList;
      }, err => {
        console.log(err);
      }
    );
  }

  protected redirectCreateFood(): void {
    this.router.navigate(['/food/add']);
  }

}
