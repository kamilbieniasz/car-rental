import { AuthenticationService } from 'src/app/services/authentication.service';
import { Component, OnInit, ViewChild, ElementRef, ViewChildren, QueryList, HostListener } from '@angular/core';
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
  @ViewChild('navbar') navbar: ElementRef;

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
    this.closeMenuWhenClick();
  }

  showMenu(): void{
    this.hamburgerBtn.nativeElement.classList.toggle('hamburger-btn--active');
    this.navbar.nativeElement.classList.toggle('navbar--active');
  }

  closeMenuWhenClick(): void{
    this.hamburgerBtn.nativeElement.classList.remove('hamburger-btn--active');
    this.navbar.nativeElement.classList.remove('navbar--active');
  }

  @HostListener('document:click', ['$event'])
  closeMenuWhenClickOutside(){
    if(!this.navbar.nativeElement.contains(event.target) && !this.hamburgerBtn.nativeElement.contains(event.target)){
      this.hamburgerBtn.nativeElement.classList.remove('hamburger-btn--active');
      this.navbar.nativeElement.classList.remove('navbar--active');
    }
  }

}
