import { Component, OnDestroy, OnInit } from '@angular/core';
import { RoomService } from "../room.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Room } from "../../dtos/Room";
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-room-create',
  templateUrl: './room-create.component.html',
  styleUrls: ['./room-create.component.css'],
  providers: [RoomService]
})
export class RoomCreateComponent implements OnInit, OnDestroy {

  private roomNumber: number;
  private roomForm: FormGroup;
  private sub: any;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private roomService: RoomService) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.roomNumber = params['roomNumber']
    });

    this.roomForm = new FormGroup({
      roomNumber: new FormControl('', Validators.required),
      numberOfPlaces: new FormControl('', Validators.required),
      petType: new FormControl('', Validators.required)
    });

    if (this.roomNumber) {
      this.roomService.findByRoomNumber(this.roomNumber).subscribe(
        room => {
          this.roomNumber = room.roomNumber;
          this.roomForm.patchValue({
            roomNumber: room.roomNumber,
            numberOfPlaces: room.numberOfPlaces,
            petType: room.petType,
          });
        }, err => {
          console.log(err);
        }
      );
    }
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  onSubmit() {
    if (this.roomForm.valid) {
      if (this.roomNumber) {
      let room: Room = new Room(
        this.roomNumber,
        this.roomForm.controls['numberOfPlaces'].value,
        this.roomForm.controls['numberOfPlaces'].value,
        this.roomForm.controls['petType'].value);
      this.roomService.updateRoom(room).subscribe();
      } else {
        let room: Room = new Room(
          this.roomForm.controls['roomNumber'].value,
          this.roomForm.controls['numberOfPlaces'].value,
          this.roomForm.controls['numberOfPlaces'].value,
          this.roomForm.controls['petType'].value);
        this.roomService.saveRoom(room).subscribe();
      }

    }

    this.roomForm.reset();
    this.router.navigate(['/room']);
  }

  redirectRoomPage() {
    this.router.navigate(['/room']);
  }
}
