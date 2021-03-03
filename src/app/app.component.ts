import { AuthenticationService } from 'src/app/services/authentication.service';
import { AuthGuardService } from './services/auth-guard.service';
import { Route } from '@angular/compiler/src/core';
import { Component, OnChanges, OnInit, ViewChild } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
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

  constructor(private router: Router, private auth: AuthenticationService){}

  ngOnInit(): void {
    this.loginStatus$ = this.auth.isLoginIn;
    this.username$ = this.auth.currentUser;
    this.loginStatus$.subscribe(data => console.log(data));
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

  logout(): void{
    this.auth.logout();
  }
}
