import { Component, Inject, Input, OnInit } from '@angular/core';
import { FoodDetails } from "../../dtos/FoodDetails";
import { FoodService } from "../food.service";
import { MAT_DIALOG_DATA, MatCardModule, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-food-details',
  templateUrl: './food-details.component.html',
  styleUrls: ['./food-details.component.css'],
  providers: [FoodService]
})
export class FoodDetailsComponent implements OnInit {

  protected foodDetails: FoodDetails;

  @Input() foodId: number;

  constructor( public dialogRef: MatDialogRef<FoodDetailsComponent>,
               @Inject(MAT_DIALOG_DATA) public data: any,
               private foodService: FoodService) { }

  ngOnInit() {
    this.showDetails();
  }

  showDetails() {
    console.log("ng on: " + this.data.id);
    this.foodService.getDetails(this.data.id).subscribe(
      foodDetails => {
        this.foodDetails = foodDetails;
      }, err => {
        console.log(err);
      }
    );
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
