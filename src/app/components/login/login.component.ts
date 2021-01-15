import { AuthenticationService } from './../../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';

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

  constructor(private auth: AuthenticationService) { }

  ngOnInit(): void {
  }

  async Authentication(): Promise<void>{
    console.log(await this.auth.authentication(this.username, this.password));
  }

}
