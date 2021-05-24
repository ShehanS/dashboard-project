import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) { }
  public getLocation() {
    return new Promise(resolve => {
      this.http.get('/api/location').subscribe(res => {
        resolve(res);
      }, err => {
        console.log(err);
      });
    });
  }

}
