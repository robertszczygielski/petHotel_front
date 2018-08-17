import { PetRoom } from "../dtos/room/PetRoom";
import { FormGroup } from "@angular/forms";
import { Room } from "../dtos/room/Room";
import { PlantRoom } from "../dtos/room/PlantRoom";
import { Shelf } from "../dtos/Shelf";

export class RoomFactory {

  static buildRoom(roomForm: FormGroup, petType: string, isPet: boolean): Room {
    return isPet
      ? this.buildPetRoom(roomForm, petType)
      : this.buildPlantRoom(roomForm);
  }

  private static buildPetRoom(roomForm: FormGroup, petType: string): PetRoom {
    return new PetRoom(
      roomForm.controls['roomNumber'].value,
      roomForm.controls['numberOfPlaces'].value,
      roomForm.controls['numberOfPlaces'].value,
      petType,
      roomForm.controls['price'].value
    );
  }

  private static buildPlantRoom(roomForm: FormGroup): PlantRoom {
    return new PlantRoom(
      roomForm.controls['roomNumber'].value,
      roomForm.controls['numberOfPlaces'].value,
      roomForm.controls['numberOfPlaces'].value,
      [new Shelf(1, true)],
      roomForm.controls['temperature'].value,
      roomForm.controls['price'].value
    )
  }

}
