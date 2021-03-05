import { Reservation } from './../../../interfaces/reservation';
import { ReservationService } from './../../../services/reservation.service';
import { AuthGuardService } from './../../../services/auth-guard.service';
import { CarService } from './../../../services/car.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router, RouterStateSnapshot } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Car } from 'src/app/interfaces/car';
import { Observable} from 'rxjs';
import { faTools, faCar, faCalendarAlt, faPaintBrush, faBuilding, faDollarSign } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  faTools = faTools;
  faCar = faCar;
  faCalendarAlt = faCalendarAlt;
  faPaintBrush = faPaintBrush;
  faBuilding = faBuilding;
  faDollarSign = faDollarSign;

  carDetails: Observable<Car>;

  dateFrom = null;
  dateTo = null;
  dayCounter = null;
  priceTmp = null;
  price = null;
  isLogged = false;
  error = '';
  id_car = null;
  car_location = null;
  location_to = null;
  userId = null;

  constructor(private http: CarService, private route: ActivatedRoute, private auth: AuthGuardService, private router: Router, private reservation: ReservationService) { }

  ngOnInit(): void {
    this.carDetails = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => this.http.getCarDetails(params.get('id')))
    );
    this.carDetails.subscribe(car => { this.priceTmp = car.price; });
    this.isLogged = this.auth.canActivate();
    this.route.params.subscribe(params => {
      this.id_car = params['id'];
    });
    this.carDetails.subscribe(car => this.car_location = car.location);
    this.userId = localStorage.getItem('userId');
  }

  async calculateDays(): Promise<void>{
    this.checkDate(this.dateFrom, this.dateTo);
    if(this.dateFrom && this.dateTo){
      this.dayCounter = (this.dateTo - this.dateFrom) / (1000 * 3600 * 24);
      this.price = this.priceTmp *  this.dayCounter;
    }
  }

  checkDate(dateFrom: Date, dateTo: Date): void{
    const currentDate = new Date();
    if(dateTo && dateFrom){
      if(dateTo < dateFrom){
        this.error = 'data zakończenia nie może być mniejsza od daty rozpoczęcia!';
      } else{
        this.error = '';
      }
    } else if(dateFrom && dateFrom < currentDate){
      this.error = 'Data rozpoczęcia nie może być mniejsza od bieżacej daty!';
    } else if(dateTo && dateTo < currentDate){
      this.error = 'Data zakończenia nie może być mniejsza od bieżacej daty!';
    }else{
      this.error = '';
    }
    console.log(currentDate > dateTo);
    console.log(currentDate);
    console.log(dateTo);
  }

  gotoLogin(){
    this.router.navigate(['login'], {queryParams: {'redirectURL':this.router.url}});
  }

  handleSelectOption(location: string){
    console.log(location);
    this.location_to = location;
  }

  addReservation(){
    const date_from = this.dateFrom.getFullYear() + '-' + this.dateFrom.getMonth() + '-' + this.dateFrom.getDate();
    const date_to = this.dateTo.getFullYear() + '-' + this.dateTo.getMonth() + '-' + this.dateTo.getDate();
    console.log(this.location_to);
    const reservation: Reservation = {
      id_car: this.id_car,
      date_from,
      date_to,
      location_from: this.car_location,
      location_to: this.location_to,
      price: this.price,
      id_user: this.userId
    }

    this.reservation.addReservation(reservation).subscribe();
  }
}
