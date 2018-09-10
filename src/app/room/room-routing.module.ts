import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RoomListComponent} from "./room-list/room-list.component";
import {RoomCreateComponent} from "./room-create/room-create.component";

const routes: Routes = [
  { path: 'room', component: RoomListComponent },
  { path: 'room/create', component: RoomCreateComponent },
  { path: 'room/edit/:roomAnimalNumber', component: RoomCreateComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoomRoutingModule { }
