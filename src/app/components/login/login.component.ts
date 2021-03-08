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
  loggedUser;

  constructor(private auth: AuthenticationService) {}

  ngOnInit(): void {
  }

  Authentication(): void{
    this.auth.login(this.username, this.password).subscribe();
  }

}
