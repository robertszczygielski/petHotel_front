import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FoodRoutingModule } from './food-routing.module';
import { FoodCreateComponent } from './food-create/food-create.component';
import { FoodListComponent } from './food-list/food-list.component';

@NgModule({
  imports: [
    CommonModule,
    FoodRoutingModule
  ],
  declarations: [FoodCreateComponent, FoodListComponent]
})
export class FoodModule { }
