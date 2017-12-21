import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RoomModule } from "./room/room.module";
import { HttpModule } from "@angular/http";
import { HotelModule } from "./hotel/hotel.module";
import {BsDropdownModule} from "ngx-bootstrap";
import {FoodModule} from "./food/food.module";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BsDropdownModule,
    HttpModule,
    // my modules
    RoomModule,
    HotelModule,
    FoodModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
