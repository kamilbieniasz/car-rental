import { Component, OnInit } from '@angular/core';
import { faUser, faLock, faAt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  faUser = faUser;
  faLock = faLock;
  faAt = faAt;

  constructor() { }

  ngOnInit(): void {
  }

}
