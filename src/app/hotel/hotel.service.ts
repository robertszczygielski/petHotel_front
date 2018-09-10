import { Injectable } from '@angular/core';
import { BasicOwnerInfo } from "../dtos/BaseOwnerInfo";
import { Http, Response } from "@angular/http";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch';
import { Pet } from "../dtos/pet/Pet";
import { Owner } from "../dtos/Owner";

@Injectable()
export class HotelService {

  private baseUrl = 'http://localhost:8080/';

  constructor(private http: Http) { }

  getBasicOwnersInfo(): Observable<BasicOwnerInfo[]> {
    return this.http.get(this.baseUrl + 'clients/getAllClients')
      .map((res: Response) => res.json())
      .catch((err: any) => Observable.throw(err.json().error || 'SE'));
  }

  getAllOwnerPets(id: Number): Observable<Pet[]> {
    return this.http.get(this.baseUrl + 'clients/showAllPets/' + id)
      .map((res: Response) => res.json())
      .catch((err: any) => Observable.throw(err.json().error || 'SE'));
  }

  deleteOwner(id: Number): Observable<boolean> {
    return this.http.delete(this.baseUrl + 'clients/delete/' + id)
      .catch((err: any) => Observable.throw(err.json().error || 'SE'));
  }

  saveOwner(owner: Owner): Observable<Owner> {
    return this.http.post(this.baseUrl + 'hotel/add', owner)
      .catch((err: any) => Observable.throw(err.json().error || "Save Owner SE"));
  }

  getRoomsForType(type: string) {
    return this.http.get(this.baseUrl + 'hotel/getAllRoomsByType/' + type)
      .map((res: Response) => res.json())
      .catch((err: any) => Observable.throw(err.json().error || "room for SE"));
  }

  getRoomsForTemperature(minTemp: number, maxTemp: number) {
    return this.http.get(this.baseUrl + 'hotel/tempRange/m/' + minTemp + '/' + maxTemp)
      .map((res: Response) => res.json())
      .catch((err: any) => Observable.throw(err.json().error || "room for SE"));
  }
}
