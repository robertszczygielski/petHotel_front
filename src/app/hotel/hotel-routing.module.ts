import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HotelCreateComponent } from "./hotel-create/hotel-create.component";
import {HotelListComponent} from "./hotel-list/hotel-list.component";

const routes: Routes = [
  { path: 'hotel', component: HotelListComponent },
  { path: 'hotel/add', component: HotelCreateComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HotelRoutingModule { }
