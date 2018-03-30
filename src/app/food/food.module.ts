import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FoodRoutingModule } from './food-routing.module';
import { FoodCreateComponent } from './food-create/food-create.component';
import { FoodListComponent } from './food-list/food-list.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FoodDetailsComponent } from './food-details/food-details.component';

@NgModule({
  imports: [
    CommonModule,
    FoodRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    FoodCreateComponent,
    FoodListComponent
  ],
  entryComponents: [
    FoodDetailsComponent
  ]
})
export class FoodModule { }
