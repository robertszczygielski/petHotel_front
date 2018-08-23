import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class HomeService {

  private authUrl = 'http://localhost:8080/home/auth';

  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) {
  }

  login(username: string, password: string): Observable<boolean> {
    // return this.http.post(this.authUrl, JSON.stringify({username: username, password: password}), {headers: this.headers})
    //   .map((response: Response) => {
    //     let token = response.json() && response.json().token;
    //     if (token) {
    //       localStorage.setItem('currentUser', JSON.stringify({ username: username, token: token }));
    //       console.log("tocken true");
    //       return true;
    //
    //     } else {
    //       console.log("tocken false");
    //       return false;
    //     }
    //   }).catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    return Observable.of(true);
  }

  getToken(): String {
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    var token = currentUser && currentUser.token;
    return token ? token : "";
  }

  logout(): void {
    localStorage.removeItem('currentUser');
  }
}
