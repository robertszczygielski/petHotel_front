import { Component, OnDestroy, OnInit } from '@angular/core';
import { RoomService } from "../room.service";
import { ActivatedRoute, Router } from "@angular/router";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { PetTypes } from "../../enums/PetTypes";
import { Regnum } from "../../enums/Regnum";
import { PetRoom } from "../../dtos/room/PetRoom";
import { RoomFactory } from "../../factories/RoomFactory";
import { Room } from "../../dtos/room/Room";
import { PlantInsolationType } from "../../enums/PlantInsolationType";
import { RoomFormUtil } from "../../utils/RoomFormUtil";

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
  protected petType: string = 'petAnimal type';
  protected regnum: string[] = [];
  protected regna: string = 'pet';
  protected isPetAnimal: boolean = true;
  protected insolations: string[] = [];
  protected insolation: string = 'medium';

  constructor(private route: ActivatedRoute,
              private router: Router,
              private roomService: RoomService) { }

  ngOnInit() {
    this.preparePetType();
    this.prepateRegnum();
    this.preparePlantInsolation();

    this.sub = this.route.params.subscribe(params => {
      this.roomNumber = params['roomNumber']
    });

    this.roomForm = this.prepareRoomForm();

    if (this.roomNumber) {
      this.getRoomFromServerSide();
    }
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  onSubmit() {
    if (this.roomForm.valid) {
      let roomFormUtil = new RoomFormUtil(this.roomForm, this.petType, this.isPetAnimal, this.insolation.toLocaleUpperCase());
      if (this.roomNumber) {
        this.updateRoom(roomFormUtil)
      } else {
        this.saveRoom(roomFormUtil)
      }
    }

    this.roomForm.reset();
    this.redirectRoomPage();
  }

  private prepareRoomForm(): FormGroup {
    return new FormGroup({
      roomNumber: new FormControl('', Validators.required),
      numberOfPlaces: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required),
      temperature: new FormControl('')
    });
  }

  private prepareRoomFormForEdit(room: Room) {
    this.roomNumber = room.roomNumber;

    this.roomForm.controls['numberOfPlaces'].setValue(room.numberOfPlaces);
    this.roomForm.controls['price'].setValue(room.price);
    this.roomForm.controls['roomNumber'].setValue(this.roomNumber);

    if (this.isPetRoomAnimal(room)) {
      this.petType = (<PetRoom>room).petType;
    }
  }

  private getRoomFromServerSide() {
    this.roomService.findByRoomNumber(this.roomNumber).subscribe(
      room => {
        this.prepareRoomFormForEdit(room);
      }, err => {
        console.log(err);
      }
    )
  }

  private updateRoom(roomFormUtil: RoomFormUtil) {
    this.roomService
      .updateRoom(
        RoomFactory.buildRoom(roomFormUtil))
      .subscribe();
  }

  private saveRoom(roomFormUtil: RoomFormUtil) {
    this.roomService
      .saveRoom(
        RoomFactory.buildRoom(roomFormUtil))
      .subscribe();
  }

  public redirectRoomPage() {
    this.router.navigate(['/room']);
  }

  public setPetType(type: string) {
    this.petType = type;
  }

  public petTypeIsValid() {
    return this.petType === "isPetAnimal type";
  }

  public setRegna(regna: string){
    this.regna = regna;
    this.isPetAnimal = this.regna.toLocaleLowerCase() === Regnum.PET.toString().toLocaleLowerCase();
  }

  public isNewRoom(): boolean {
    return this.roomNumber === undefined;
  }

  private preparePetType(): void {
    for (var i in PetTypes) {
      this.petTypes.push(i.toLocaleLowerCase());
    }
  }

  private prepateRegnum(): void {
    for (var i in Regnum) {
      this.regnum.push(i.toLocaleLowerCase());
    }
  }

  public isPet(): boolean {
    return this.isPetAnimal;
  }

  private isPetRoomAnimal(room: Room): boolean {
    return (<PetRoom>room).petType !== undefined;
  }

  public setInsolation(insolation: string) {
        this.insolation = insolation;
  }

  private preparePlantInsolation() {
    for(var i in PlantInsolationType) {
      this.insolations.push(i.toLocaleLowerCase());
    }
  }
}
