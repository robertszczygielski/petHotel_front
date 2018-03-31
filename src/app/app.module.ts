import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RoomModule } from "./room/room.module";
import { HttpModule } from "@angular/http";
import { HotelModule } from "./hotel/hotel.module";
import { BsDropdownModule } from "ngx-bootstrap";
import { FoodModule } from "./food/food.module";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { FoodDetailsComponent } from "./food/food-details/food-details.component";
import { MatButtonModule, MatInputModule, MatDialogModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    BrowserAnimationsModule,
    // my modules
    RoomModule,
    HotelModule,
    FoodModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
