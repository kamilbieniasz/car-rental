import { Router, ActivatedRoute } from '@angular/router';
import { UserLogin } from './../interfaces/userLogin';
import { AccountI } from './../interfaces/accountI';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private url = 'http://car-rental.net/';

  private loginStatus = new BehaviorSubject<boolean>(this.checkLoginStatus());
  private userName = new BehaviorSubject<string>(localStorage.getItem('username'));

  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute) {}

  login(username: string, password: string): any{
    const user: UserLogin = {
      username,
      password
    }
    return this.http.post<AccountI>(this.url + 'api/login', user).pipe(
      map(result => {
        if(result){
          this.loginStatus.next(true);
          localStorage.setItem("loginStatus", "1");
          localStorage.setItem("userId", result.id.toString());
          localStorage.setItem("username", result.username);
          localStorage.setItem("email", result.email);
          if(this.route.snapshot.queryParams['redirectURL']){
            this.router.navigate([this.route.snapshot.queryParams['redirectURL']]);
          } else{
            this.router.navigate(['/']);
          }
        }
        return result;
      })
    );
  }

  async register(email, username, password){
    const user: AccountI = {
      email,
      username,
      password
    }

    return await this.http.post(this.url + 'api/register', user).toPromise();
  }

  logout(): void{
    this.loginStatus.next(false);
    localStorage.removeItem("loginStatus");
    localStorage.removeItem("username");
    localStorage.removeItem("email");
    this.router.navigate(['/login']);
  }

  checkLoginStatus(): boolean{
    const loginStatus = localStorage.getItem("loginStatus");
    if(loginStatus){
      return true;
    }
    return false;
  }

  get isLoginIn(){
    return this.loginStatus.asObservable();
  }
  
  get currentUser(){
    return this.userName.asObservable();
  }
}
