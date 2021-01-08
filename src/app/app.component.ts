import { Route } from '@angular/compiler/src/core';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { HomeComponent } from './components/home/home.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'car-rental';
  @ViewChild(RouterOutlet, {static: true}) outlet;

  constructor(private router: Router){}

  ngOnInit(): void {
    
  }

  gotoLogin(){
    this.router.navigate(['login']);
  }

  gotoByName(name: string): void{
    console.log(this.outlet);
    if (this.outlet.component.__proto__.constructor.name === 'HomeComponent'){
    eval(`this.outlet.component.` + name + `.nativeElement.scrollIntoView({behavior: 'smooth'})`);
    }
  }
}
