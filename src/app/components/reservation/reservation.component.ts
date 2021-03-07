import { ReservationService } from './../../services/reservation.service';
import { Component, OnInit } from '@angular/core';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss']
})
export class ReservationComponent implements OnInit {
  reservationList = [];
  faTrashAlt = faTrashAlt;

  constructor(private reservation: ReservationService) { }

  ngOnInit(): void {
    const id_user = localStorage.getItem('userId');
    if(id_user){
      this.reservation.getUserReservation(parseInt(id_user)).subscribe(reservation => {
        this.reservationList = reservation;
      });
    }
    
    
  }

}
