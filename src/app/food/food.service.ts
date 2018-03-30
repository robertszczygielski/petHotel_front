import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { Food } from "../dtos/Food";
import { Http, Response } from "@angular/http";
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch';
import { FoodDetails } from "../dtos/FoodDetails";

@Injectable()
export class FoodService {

  private baseUrl = 'http://localhost:8080/food/';

  constructor(private http: Http) { }

  getFoodList(petType: string): Observable<Food[]> {
    return this.http.get(this.baseUrl + 'getfood/' + petType.toUpperCase())
      .map((res: Response) => res.json())
      .catch((err: any) => Observable.throw(err.json().error || 'SE'));
  }

  saveFood(foods: Food[]): Observable<Food[]> {
    return this.http.post(this.baseUrl + 'addfood', foods)
      .catch((err: any) => Observable.throw(err.json().error || 'SE'));
  }

  getDetails(id: number): Observable<FoodDetails> {
    return this.http.get(this.baseUrl + 'getfood/id/' + id)
      .map((res: Response) => res.json())
      .catch((err: any) => Observable.throw(err.json().error || 'SE'));
  }
}
