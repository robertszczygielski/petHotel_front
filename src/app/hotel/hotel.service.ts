import { Injectable } from '@angular/core';
import { BasicOwnerInfo } from "../dtos/BaseOwnerInfo";
import { Http, Response } from "@angular/http";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch';

@Injectable()
export class HotelService {

  private baseUrl = 'http://localhost:8080/';

  constructor(private http: Http) { }

  getBasicOwnersInfo(): Observable<BasicOwnerInfo[]> {
    return this.http.get(this.baseUrl + 'clients/getAllClients')
      .map((res: Response) => res.json())
      .catch((err: any) => Observable.throw(err.json().error || 'SE'));
  }
}
