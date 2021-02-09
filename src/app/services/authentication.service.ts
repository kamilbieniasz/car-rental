import { AccountI } from './../interfaces/accountI';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private url = 'https://db-car-rental.herokuapp.com';
  public isLogged = false;

  constructor(private http: HttpClient) {}

  getAccount(): Observable<AccountI[]>{
    return this.http.get<AccountI[]>(this.url + '/accounts');
  }


  async authentication(username: string, password: string): Promise<AccountI>{
    const accounts = await this.getAccount().toPromise();

    return accounts.find((account) => {
      if(account.username === username && account.password === password){
        this.isLogged = true;
        console.log(this.isLogged);
        return account;
      }
    });
  }
}
