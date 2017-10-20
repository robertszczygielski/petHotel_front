import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HotelRoutingModule } from './hotel-routing.module';
import { HotelCreateComponent } from './hotel-create/hotel-create.component';
import { HotelListComponent } from './hotel-list/hotel-list.component';
import { PetModalComponent } from './pet-modal/pet-modal.component';

@NgModule({
  imports: [
    CommonModule,
    HotelRoutingModule
  ],
  declarations: [
    HotelCreateComponent,
    HotelListComponent,
    PetModalComponent
  ]
})
export class HotelModule { }
