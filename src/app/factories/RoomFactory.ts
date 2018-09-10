import { PetRoom } from "../dtos/room/PetRoom";
import { FormGroup } from "@angular/forms";
import { Room } from "../dtos/room/Room";
import { PlantRoom } from "../dtos/room/PlantRoom";
import { Shelf } from "../dtos/Shelf";
import { RoomFormUtil } from "../utils/RoomFormUtil";

export class RoomFactory {

  static buildRoom(roomFormUtil: RoomFormUtil): Room {
    return roomFormUtil.isPet
      ? this.buildPetRoom(roomFormUtil)
      : this.buildPlantRoom(roomFormUtil);
  }

  private static buildPetRoom(roomFormUtil: RoomFormUtil): PetRoom {
    let form = roomFormUtil.roomForm;
    return new PetRoom(
      form.controls['roomNumber'].value,
      form.controls['numberOfPlaces'].value,
      form.controls['numberOfPlaces'].value,
      roomFormUtil.petType,
      form.controls['price'].value
    );
  }

  private static buildPlantRoom(roomFormUtil: RoomFormUtil): PlantRoom {
    let shelves: Shelf[] = [];
    let form = roomFormUtil.roomForm;

    for (let i=0; i<roomFormUtil.roomForm.controls['numberOfPlaces'].value; ++i) {
      shelves.push(new Shelf(i+1, true, roomFormUtil.insolation));
    }

    console.log("shelves: " + shelves);

    return new PlantRoom(
      form.controls['roomNumber'].value,
      form.controls['numberOfPlaces'].value,
      form.controls['numberOfPlaces'].value,
      shelves,
      form.controls['temperature'].value,
      form.controls['price'].value
    )
  }

}
