import { Router } from '@angular/router';
import { Reservation } from './../interfaces/reservation';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  urlPHP = 'http://car-rental.net/';

  constructor(private http: HttpClient, private router: Router) { }

  addReservation(reservation: Reservation){
    this.router.navigate(['/reservation']);
    return this.http.post(this.urlPHP + 'api/reservation', reservation).pipe(tap(console.log));
  }

  getUserReservation(id_user: number){
    const reservation = {
      id_user
    }
    return this.http.post(this.urlPHP + 'api/reservations', reservation).pipe(tap(console.log));
  }

  deleteUserReservation(id_reservation: number){
    console.log("service działa");
    return this.http.delete(this.urlPHP + 'api/reservation/' + id_reservation).pipe(tap(console.log));
  }
}
