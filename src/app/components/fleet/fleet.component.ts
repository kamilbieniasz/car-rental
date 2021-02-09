import { AuthGuardService } from './../../services/auth-guard.service';
import { CarService } from './../../services/car.service';
import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Car } from 'src/app/interfaces/car';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-fleet',
  templateUrl: './fleet.component.html',
  styleUrls: ['./fleet.component.scss']
})
export class FleetComponent implements OnInit {
  @ViewChildren('type')
  types: QueryList<any>

  allCars: Car[];
  selectedCars: Car[];
  carTypes : string[];

  hatchback = true;
  sedan = true;
  coupe = true;
  suv = true;
  miniVan = true;

  constructor(private carService: CarService) { }

  ngOnInit(): void {
    this.carService.getCars().subscribe((cars) => {
      this.allCars = cars;
      this.selectedCars = cars;
    });
    this.carService.getCarTypes().subscribe((types) => {
      this.carTypes = types;
    });
    
  }

  getTypesCars():void{
    //const selectedType: Car[] = [];
    this.selectedCars = [];
    this.allCars.forEach((car) => { 
      if(this.hatchback && car.type === "Hatchback"){
        //selectedType.push(car);
        this.selectedCars.push(car);
      }
      if(this.sedan && car.type === "Sedan"){
        //selectedType.push(car);
        this.selectedCars.push(car);
      }
      if(this.coupe && car.type === "Coupe"){
        //selectedType.push(car);
        this.selectedCars.push(car);
      }
      if(this.suv && car.type === "SUV"){
        //selectedType.push(car);
        this.selectedCars.push(car);
      }
      if(this.miniVan && car.type === "Mini-Van"){
        //selectedType.push(car);
        this.selectedCars.push(car);
      }
    });
    //console.log(this.sedan);
    //this.selectedCars = selectedType;
  }

  selectedItem(item: number): void{
    this.types.toArray()[item].nativeElement.classList.toggle('selectedItem');
    switch(item){
      case 0:
        this.hatchback = !this.hatchback;
        break;
      case 1:
        this.sedan = !this.sedan;
        break;
      case 2:
        this.coupe = !this.coupe;
        break;
      case 3:
        this.suv = !this.suv;
        break;
      case 4:
        this.miniVan = !this.miniVan;
        break;
    }
    this.getTypesCars();
  }
}
