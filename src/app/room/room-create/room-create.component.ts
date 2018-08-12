import { Component, OnDestroy, OnInit } from '@angular/core';
import { RoomService } from "../room.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Room } from "../../dtos/room/Room";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { PetTypes } from "../../enums/PetTypes";
import { Regnum} from "../../enums/Regnum";
import { PetRoom } from "../../dtos/room/PetRoom";

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
  protected petTypes: string[] = [];
  protected petType: string = 'pet type';
  protected regnum: string[] = [];
  protected regna: string = 'pet';
  protected pet: boolean = true;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private roomService: RoomService) { }

  ngOnInit() {

    this.preparePetType();
    this.prepateRegnum();

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
          this.roomForm.patchValue({
            roomNumber: room.roomNumber,
            numberOfPlaces: room.numberOfPlaces,
            price: room.price,
          });
          if (room instanceof PetRoom) {
            this.petType = room.petType;
          }
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
      let petRoom: PetRoom = new PetRoom(
        this.roomNumber,
        this.roomForm.controls['numberOfPlaces'].value,
        this.roomForm.controls['numberOfPlaces'].value,
        this.petType,
        this.roomForm.controls['price'].value);
      this.roomService.updateRoom(petRoom).subscribe();
      } else {
        let petRoom: PetRoom = new PetRoom(
          this.roomForm.controls['roomNumber'].value,
          this.roomForm.controls['numberOfPlaces'].value,
          this.roomForm.controls['numberOfPlaces'].value,
          this.petType,
          this.roomForm.controls['price'].value);
        this.roomService.saveRoom(petRoom).subscribe();
      }

    }

    this.roomForm.reset();
    this.redirectRoomPage();
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

  setRegna(regna: string){
    this.regna = regna;
    this.pet = this.regna.toLocaleLowerCase() === Regnum.PET.toString().toLocaleLowerCase();
  }

  private preparePetType(): void {
    for (var i in PetTypes) {
      if(typeof PetTypes[i] === 'number') {
        this.petTypes.push(i);
      }
    }
  }

  private prepateRegnum(): void {
    for (var i in Regnum) {
        this.regnum.push(i.toLocaleLowerCase());
    }
  }

  isPet(): boolean {
    return this.pet;
  }
}
