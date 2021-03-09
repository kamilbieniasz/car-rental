import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  @ViewChild('aboutUs')
  aboutUs: ElementRef;
  @ViewChild('introduction')
  introduction: ElementRef;
  @ViewChild('services')
  services: ElementRef;
  
  constructor() { }

  ngOnInit(): void {
  }

  gotoByName(name: string): void{
    switch(name){
      case 'introduction':
        this.introduction.nativeElement.scrollIntoView({behavior: 'smooth'});
        break;
      case 'aboutUs':
        this.aboutUs.nativeElement.scrollIntoView({behavior: 'smooth'});
        break;
      case 'services':
        this.services.nativeElement.scrollIntoView({behavior: 'smooth'});
        break;
    }
  }

}
