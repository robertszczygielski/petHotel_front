import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-hotel-create',
  templateUrl: './hotel-create.component.html',
  styleUrls: ['./hotel-create.component.css']
})
export class HotelCreateComponent implements OnInit {

  private hotelForm: FormGroup;

  constructor(private router: Router) { }

  ngOnInit() {
    this.hotelForm = new FormGroup({
      roomNumber: new FormControl('', Validators.required),
      numberOfPlaces: new FormControl('', Validators.required),
      petType: new FormControl('', Validators.required)
    });

  }

  onSubmit() {

    this.hotelForm.reset();
    this.router.navigate(['/room']);
  }
}
