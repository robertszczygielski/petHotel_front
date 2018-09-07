import { Component, OnInit } from '@angular/core';
import { RoomService } from "../room.service";
import { Room } from "../../dtos/room/Room";
import { Router } from "@angular/router";
import { Regnum} from "../../enums/Regnum";

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
  protected regna: string = 'pet';
  protected regnum: string[] = [];

  constructor(private roomService: RoomService,
              private router: Router) { }

  ngOnInit() {
    for(var i in Regnum) {
      this.regnum.push(i.toLocaleLowerCase());
    }

    this.getAllRooms(this.regna, this.page, this.size, this.isSorted, this.asc);
  }

  protected getAllRooms(regna: string, page: number, size: number, sortedBy: string, asc: boolean) {
    this.roomService.findAll(regna, page, size, sortedBy, asc).subscribe(
      rooms => {
        this.rooms = rooms;
      }, err => {
        console.log(err);
      }
    );

    this.roomService.totalPageNumbers(this.regna).subscribe(
      pages => {
        this.pages = new Array(Math.ceil(pages / this.size));
      }
    )
  }

  protected editRoomPage(room: Room) {
    if (room) {
      this.router.navigate(['/room/edit', room.roomNumber]);
    }
  }

  protected deleteRoom(room: Room) {
    if (room) {
      this.roomService.deleteRoomByRoomNumber(room.roomNumber).subscribe(
        res => {
          this.router.navigate(['/room']);
          console.log('remove: ' + room)
        }
      );
    }
  }

  protected redirectNewRoomPage() {
    this.router.navigate(['/room/create']);
  }

  protected setPage(i: any, event: any) {
    event.preventDefault();
    this.page = i;
    this.getAllRooms(this.regna, this.page, this.size, this.isSorted, this.asc);
  }

  protected sort(isSorted: string, event: any) {
    event.preventDefault();
    this.isSorted = isSorted;
    this.asc = !this.asc;
    this.getAllRooms(this.regna, this.page, this.size, this.isSorted, this.asc);
  }

  protected setRegna(regna): void {
    this.regna = regna;
    this.getAllRooms(this.regna, this.page, this.size, this.isSorted, this.asc)
  }

  protected isPet(): boolean {
    return this.regna === 'pet';
  }
}
