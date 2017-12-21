import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {FoodListComponent} from "./food-list/food-list.component";
import {FoodCreateComponent} from "./food-create/food-create.component";

const routes: Routes = [
  { path: 'food', component: FoodListComponent },
  { path: 'food/add', component: FoodCreateComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FoodRoutingModule { }
