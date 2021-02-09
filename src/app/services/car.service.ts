import { Car } from './../interfaces/car';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  url = 'https://db-car-rental.herokuapp.com';

  constructor(private http: HttpClient) { }

  getCars(): Observable<Car[]>{
    return this.http.get<Car[]>(this.url + '/car');
  }

  getCarTypes(): Observable<string[]>{
    return this.http.get<string[]>(this.url + '/carTypes')
  }

  getCarDetails(id: string): Observable<Car>{
    return this.http.get<Car>(this.url + '/car/' + id);
  }
}
