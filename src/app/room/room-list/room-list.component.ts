import { Component, OnInit } from '@angular/core';
import { RoomService } from "../room.service";
import { Room } from "../../dtos/Room";
import { Router } from "@angular/router";

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.css'],
  providers: [RoomService]
})
export class RoomListComponent implements OnInit {

  protected rooms: Room[];
  protected page: number = 0;
  protected size: number = 5;
  protected pages: Array<number>;
  protected asc: boolean = false;
  protected isSorted: string = '';

  constructor(private roomService: RoomService,
              private router: Router) { }

  ngOnInit() {
    this.getAllRooms(this.page, this.size, this.isSorted, this.asc);
  }

  getAllRooms(page: number, size: number, name: string, asc: boolean) {
    this.roomService.findAll(page, size, name, asc).subscribe(
      rooms => {
        this.rooms = rooms;
      }, err => {
        console.log(err);
      }
    );

    this.roomService.totalPageNumbers().subscribe(
      pages => {
        this.pages = new Array(Math.ceil(pages / this.size));
      }
    )
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
          this.router.navigate(['/room']);
          console.log('remove: ' + room)
        }
      );
    }
  }

  redirectNewRoomPage() {
    this.router.navigate(['/room/create']);
  }

  setPage(i: any, event: any) {
    event.preventDefault();
    this.page = i;
    this.getAllRooms(this.page, this.size, this.isSorted, this.asc);
  }

  sort(isSorted: string, event: any) {
    event.preventDefault();
    this.isSorted = isSorted;
    this.asc = !this.asc;
    this.getAllRooms(this.page, this.size, this.isSorted, this.asc);
  }
}
