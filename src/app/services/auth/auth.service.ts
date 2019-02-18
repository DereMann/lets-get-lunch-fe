import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { User } from './user';
//import { LocalStorageService, SessionStorageService } from 'ngx-webstorage'; // removed to to provider problems in karma
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient
              //,private localStorage: LocalStorageService
              ) { }

  signup(credentials: User): Observable<object> {
    return this.http.post('http://localhost:8080/api/users', credentials)
      .mergeMap(res => this.login(credentials));
  }

  login(credentials: User): Observable<object> {
    return this.http.post('http://localhost:8080/api/sessions', credentials)
      .map((res: any) => {
        localStorage.setItem('Authorization', res.token);
        res.token = localStorage.getItem('Authorization'); //just for testing purposes
        return res;
      });
  }
}
