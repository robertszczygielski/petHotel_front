import { Component, OnInit } from '@angular/core';
import { FoodService } from "../food.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-food-list',
  templateUrl: './food-list.component.html',
  styleUrls: ['./food-list.component.css'],
  providers:[FoodService]
})
export class FoodListComponent implements OnInit {

  constructor(private foodService: FoodService,
              private router: Router) { }

  ngOnInit() {
  }

  redirectCreateFood() {
    this.router.navigate(['/food/add']);
  }

}
