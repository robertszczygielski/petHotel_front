import { FormGroup } from "@angular/forms";

export class RoomFormUtil {
  roomForm: FormGroup;
  petType: string;
  isPet: boolean;
  insolation: string;

  constructor(roomForm: FormGroup, petType: string, isPet: boolean, insolation: string) {
    this.roomForm = roomForm;
    this.petType = petType;
    this.isPet = isPet;
    this.insolation = insolation;
  }
}
