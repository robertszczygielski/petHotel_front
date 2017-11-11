import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HotelRoutingModule } from './hotel-routing.module';
import { HotelCreateComponent } from './hotel-create/hotel-create.component';
import { HotelListComponent } from './hotel-list/hotel-list.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@NgModule({
  imports: [
    CommonModule,
    HotelRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    HotelCreateComponent,
    HotelListComponent
  ]
})
export class HotelModule { }
