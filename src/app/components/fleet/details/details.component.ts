import { AuthGuardService } from './../../../services/auth-guard.service';
import { CarService } from './../../../services/car.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap, map } from 'rxjs/operators';
import { Car } from 'src/app/interfaces/car';
import { BehaviorSubject, Observable} from 'rxjs';
import { faTools, faCar, faCalendarAlt, faPaintBrush, faBuilding, faDollarSign } from '@fortawesome/free-solid-svg-icons';
import { ThrowStmt } from '@angular/compiler';


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

  constructor(private http: CarService, private route: ActivatedRoute, private auth: AuthGuardService) { }

  ngOnInit(): void {
    this.carDetails = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => this.http.getCarDetails(params.get('id')))
    );
    this.carDetails.subscribe(car => { this.priceTmp = car.price; });
    this.isLogged = this.auth.canActivate();
    
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
}
