import { Component, OnInit } from '@angular/core';
import { RoomService } from "../room.service";
import { Room } from "../Room";
import { Router } from "@angular/router";

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.css'],
  providers: [RoomService]
})
export class RoomListComponent implements OnInit {

  private rooms: Room[];

  constructor(private roomService: RoomService,
              private router: Router) { }

  ngOnInit() {
    this.getAllRooms();
  }

  getAllRooms() {
    this.roomService.findAll().subscribe(
      rooms => {
        this.rooms = rooms;
      }, err => {
        console.log(err);
      }
    );
  }

  editRoomPage(room: Room) {
    if (room) {
      this.router.navigate(['/room/edit', room.roomNumber]);
    }
  }

  deleteRoom(room: Room) {
    if (room) {
      this.roomService.deleteRoomByRoomNumber(room.roomNumber).subscribe(
        res => {
          this.getAllRooms();
          this.router.navigate(['/room']);
          console.log('remove: ' + room)
        }
      );
    }
  }

  redirectNewRoomPage() {
    this.router.navigate(['/room/create']);
  }
}
