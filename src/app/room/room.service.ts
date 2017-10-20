import { Injectable } from '@angular/core';
import { Http, Response } from "@angular/http";
import { Observable } from "rxjs/Observable";
import { Room } from "../dtos/Room";
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch';

@Injectable()
export class RoomService {

  private baseUrl = 'http://localhost:8080/room/';

  constructor(private http: Http) { }

  findAll(): Observable<Room[]> {
    return this.http.get(this.baseUrl + 'getAllRooms')
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error) || 'Server error');
  }

  saveRoom(room: Room): Observable<Room> {
    return this.http.post(this.baseUrl + 'add', room)
      .catch((err: any) => Observable.throw(err.json().error) || 'Server error');
  }

  findByRoomNumber(roomNumber: number): Observable<Room> {
    return this.http.get(this.baseUrl + 'findByRoomNumber/' + roomNumber)
      .map((res: Response) => res.json())
      .catch((err: any) => Observable.throw(err.json().error) || 'Server Error');
  }

  updateRoom(room: Room): Observable<Room> {
    return this.http.put(this.baseUrl + 'updateRoom', room)
      .map((res: Response) => res.json())
      .catch((err: any) => Observable.throw(err.json().error) || 'Server error');
  }

  deleteRoomByRoomNumber(roomNumber: number): Observable<boolean> {
    return this.http.delete(this.baseUrl + '/' + roomNumber)
      .catch((err: any) => Observable.throw(err.json().error) || 'Server error');
  }
}
