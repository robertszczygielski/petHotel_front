import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RoomModule } from "./room/room.module";
import { HttpModule } from "@angular/http";
import { HotelModule } from "./hotel/hotel.module";
import { BsDropdownModule } from "ngx-bootstrap";
import { FoodModule } from "./food/food.module";
import { MatDialogModule } from '@angular/material/dialog';
import { NgbModal, NgbModalOptions, NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { FoodDetailsComponent } from "./food/food-details/food-details.component";

@NgModule({
  declarations: [
    AppComponent,
    FoodDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BsDropdownModule,
    HttpModule,
    NgbModule.forRoot(),
    // my modules
    RoomModule,
    HotelModule,
    FoodModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
