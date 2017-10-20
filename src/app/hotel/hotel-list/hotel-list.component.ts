import { Component, OnInit } from '@angular/core';
import { BasicOwnerInfo } from "../../dtos/BaseOwnerInfo";
import { HotelService } from "../hotel.service";


@Component({
  selector: 'app-hotel-list',
  templateUrl: './hotel-list.component.html',
  styleUrls: ['./hotel-list.component.css'],
  providers:[HotelService]
})
export class HotelListComponent implements OnInit {

  private baseOwnerInfos: BasicOwnerInfo[];

  constructor(private hotelService: HotelService) { }

  ngOnInit() {
    this.getBasicOwnerInfo();
    this.baseOwnerInfos.push(new BasicOwnerInfo(1, "a", "b", 1));
  }

  private getBasicOwnerInfo() {
    this.hotelService.getBasicOwnersInfo().subscribe(
      baseOwnerInfos => {
        this.baseOwnerInfos = baseOwnerInfos;
      }, err => {
        console.log(err);
      }
    );
  }

  openModal(id: Number) {

  }
}
