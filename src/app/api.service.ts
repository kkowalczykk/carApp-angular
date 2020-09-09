import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Car } from 'src/models/Car.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  api = 'https://kowalczyk-car-app.herokuapp.com/api/cars';


  car: Car;
  list: Car[];

  constructor(private httpClient: HttpClient) {

  }

  getData() {
    return this.httpClient.get(this.api + '/all')
      .toPromise().then(res => this.list = res as Car[]).then(res => console.log(this.list));
  }

  postData(cassette: Car) {
    return this.httpClient.post(this.api, cassette);
  }

  putData(cassette: Car) {
    return this.httpClient.put(this.api, cassette);
  }

  deleteData(id: number) {
    return this.httpClient.delete(this.api + '?index=' + id);
  }

}
