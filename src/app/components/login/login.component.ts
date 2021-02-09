import { AuthenticationService } from './../../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  faUser = faUser;
  faLock = faLock;
  username: string;
  password: string;
  loggedUser

  constructor(private auth: AuthenticationService, private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
  }

  async Authentication(): Promise<void>{
    await this.auth.authentication(this.username, this.password)
    if(await this.auth.authentication(this.username, this.password)){
      this.loggedUser = await this.auth.authentication(this.username, this.password);
      sessionStorage.setItem('CURRENT_USER', this.loggedUser);
      this.router.navigateByUrl(this.activatedRoute.snapshot.queryParams['returnUrl'] || '/');
    } else{

    }

  }

}
