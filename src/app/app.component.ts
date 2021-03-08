import { AuthenticationService } from 'src/app/services/authentication.service';
import { AuthGuardService } from './services/auth-guard.service';
import { Route } from '@angular/compiler/src/core';
import { Component, OnChanges, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'car-rental';
  loginStatus$: Observable<boolean>;
  username$: Observable<string>;

  @ViewChild(RouterOutlet, {static: true}) outlet;
  @ViewChild('hamburgerBtn') hamburgerBtn: ElementRef;
  @ViewChild('navbar') navbar:ElementRef;

  constructor(private router: Router, private auth: AuthenticationService){}

  ngOnInit(): void {
    this.loginStatus$ = this.auth.isLoginIn;
    this.username$ = this.auth.currentUser;
    this.loginStatus$.subscribe(data => console.log(data));
  }
  

  gotoLogin(){
    this.router.navigate(['login']);
  }

  logout(): void{
    this.auth.logout();
  }

  showMenu():void{
    this.hamburgerBtn.nativeElement.classList.toggle('hamburger-btn--active');
    this.navbar.nativeElement.classList.toggle('navbar--active');
  }
}
