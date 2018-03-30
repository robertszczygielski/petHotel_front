///<reference path="../hotel.service.ts"/>
import { Component, OnInit } from '@angular/core';
import { BasicOwnerInfo } from "../../dtos/BaseOwnerInfo";
import { HotelService } from "../hotel.service";
import { Pet } from "../../dtos/Pet";
import { Router } from "@angular/router";


@Component({
  selector: 'app-hotel-list',
  templateUrl: './hotel-list.component.html',
  styleUrls: ['./hotel-list.component.css'],
  providers:[HotelService]
})
export class HotelListComponent implements OnInit {

  protected baseOwnerInfos: BasicOwnerInfo[];
  protected ownerPets: Pet[];

  constructor(private hotelService: HotelService,
              private router: Router) { }

  ngOnInit() {
    this.getBasicOwnerInfo();
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

  allOwnerPets(id: Number) {
    this.hotelService.getAllOwnerPets(id).subscribe(
      ownerPets => {
        this.ownerPets = ownerPets;
      }, err => {
        console.log(err);
      }
    );
  }

  deleteOwner(id: Number) {
    if (id) {
      this.hotelService.deleteOwner(id).subscribe(
        res => {
          console.log("Deleted Owner: " + id);
        }
      );
    }
  }

  redirectNewCustomerPage() {
    this.router.navigate(['/hotel/add']);
  }
}
