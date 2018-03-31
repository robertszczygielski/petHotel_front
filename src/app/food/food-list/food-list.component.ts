import { Component, OnInit } from '@angular/core';
import { FoodService } from "../food.service";
import { Router } from "@angular/router";
import { PetTypes } from "../../enums/PetTypes";
import { Food } from "../../dtos/Food";
import { FoodDetails } from "../../dtos/FoodDetails";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { FoodDetailsComponent } from "../food-details/food-details.component";
import { MatDialog } from "@angular/material/dialog";

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
  // protected foodDetails: FoodDetails;

  constructor(private foodService: FoodService,
              private router: Router,
              public dialog: MatDialog) { }

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

  openDetails(id: number) {
    const modalRef = this.dialog.open(FoodDetailsComponent, {
      width: '250px',
      data: { id: id }
    });

    modalRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed' + result);
    });
  }
}
