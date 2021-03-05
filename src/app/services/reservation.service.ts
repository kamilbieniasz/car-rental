import { Reservation } from './../interfaces/reservation';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  urlPHP = 'http://car-rental.net/';

  constructor(private http: HttpClient) { }

  addReservation(reservation: Reservation){
    return this.http.post(this.urlPHP + 'api/reservation', reservation).pipe(tap(console.log));
  }
}
