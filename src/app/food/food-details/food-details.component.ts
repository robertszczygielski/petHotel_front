import { Component, Input, OnInit } from '@angular/core';
import { FoodDetails } from "../../dtos/FoodDetails";
import { FoodService } from "../food.service";

@Component({
  selector: 'app-food-details',
  templateUrl: './food-details.component.html',
  styleUrls: ['./food-details.component.css'],
  providers: [FoodService]
})
export class FoodDetailsComponent implements OnInit {

  protected foodDetails: FoodDetails;

  @Input() foodId: number;

  constructor(private foodService: FoodService) { }

  ngOnInit() {
    this.showDetails();
  }

  showDetails() {
    console.log("ng on: " + this.foodId);
    this.foodService.getDetails(this.foodId).subscribe(
      foodDetails => {
        this.foodDetails = foodDetails;
      }, err => {
        console.log(err);
      }
    );
    console.log("ng on: " + this.foodDetails);

  }
}
