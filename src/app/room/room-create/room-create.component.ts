import { Component, OnDestroy, OnInit } from '@angular/core';
import { RoomService } from "../room.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Room } from "../../dtos/Room";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import {PetTypes} from "../../enums/PetTypes";

@Component({
  selector: 'app-room-create',
  templateUrl: './room-create.component.html',
  styleUrls: ['./room-create.component.css'],
  providers: [RoomService]
})
export class RoomCreateComponent implements OnInit, OnDestroy {

  protected roomNumber: number;
  protected roomForm: FormGroup;
  protected sub: any;
  protected petTypes: String[] = [];
  protected petType: string = "pet type";

  constructor(private route: ActivatedRoute,
              private router: Router,
              private roomService: RoomService) { }

  ngOnInit() {

    for (var i in PetTypes) {
      if(typeof PetTypes[i] === 'number') {
        this.petTypes.push(i);
      }
    }

    this.sub = this.route.params.subscribe(params => {
      this.roomNumber = params['roomNumber']
    });

    this.roomForm = new FormGroup({
      roomNumber: new FormControl('', Validators.required),
      numberOfPlaces: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required)
    });

    if (this.roomNumber) {
      this.roomService.findByRoomNumber(this.roomNumber).subscribe(
        room => {
          this.roomNumber = room.roomNumber;
          this.petType = room.petType;
          this.roomForm.patchValue({
            roomNumber: room.roomNumber,
            numberOfPlaces: room.numberOfPlaces,
            price: room.price,
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
        this.petType,
        this.roomForm.controls['price'].value);
      this.roomService.updateRoom(room).subscribe();
      } else {
        let room: Room = new Room(
          this.roomForm.controls['roomNumber'].value,
          this.roomForm.controls['numberOfPlaces'].value,
          this.roomForm.controls['numberOfPlaces'].value,
          this.petType,
          this.roomForm.controls['price'].value);
        this.roomService.saveRoom(room).subscribe();
      }

    }

    this.roomForm.reset();
    this.router.navigate(['/room']);
  }

  redirectRoomPage() {
    this.router.navigate(['/room']);
  }

  setPetType(type: string) {
    this.petType = type;
  }

  petTypeIsValid() {
    return this.petType === "pet type";
  }
}
