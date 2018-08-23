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
import { MatButtonModule, MatDialogModule, MatInputModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ShelfCreateComponent } from './shelf/shelf-create/shelf-create.component';
import { HomeService } from "./home/home.service";
import { ReactiveFormsModule } from "@angular/forms";
import { HomeModule } from "./home/home.module";

@NgModule({
  declarations: [
    AppComponent,
    FoodDetailsComponent,
    ShelfCreateComponent
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
    ReactiveFormsModule,
    // my modules
    RoomModule,
    HotelModule,
    FoodModule,
    HomeModule
  ],
  providers: [HomeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
