import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { faUser, faLock, faAt, faEye } from '@fortawesome/free-solid-svg-icons';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  faUser = faUser;
  faLock = faLock;
  faAt = faAt;
  faEye = faEye;

  email: string;
  username: string;
  password: string;
  confirmPassword: string;

  toShort = false;
  uppercase = false;
  specialSigns = false;
  withoutDigits = false;
  matchedPassword = false;
  
  @ViewChild('passwordName')
  passwordRef: ElementRef;
  
  @ViewChild('confirmPasswordName')
  confirmPasswordRef: ElementRef;

  constructor(private service: AuthenticationService) { }

  ngOnInit(): void {
  }

  validPassword(): void{
    if(this.password.match(/\d/)){
      this.withoutDigits = false;
    } else{
      this.withoutDigits = true;
    }
    if (this.password.match(/[A-Z]/)){
      this.uppercase = false;
    } else{
      this.uppercase = true;
    }
    if (this.password.match(/[!@#$%^&*_]/)){
      this.specialSigns = false;
    } else{
      this.specialSigns = true;
    }
    if(this.password.length <= 8){
      this.toShort = true;
    } else{
      this.toShort = false;
    }
  }

  matchPassword(): void{
    if(this.password === this.confirmPassword){
      this.matchedPassword = false;
    } else{
      this.matchedPassword = true;
    }
  }

  showPassword(name: ElementRef): void{
    if(name.nativeElement.attributes[1].nodeValue === 'text'){
      name.nativeElement.attributes[1].nodeValue = 'password';
    } else{
      name.nativeElement.attributes[1].nodeValue = 'text';
    }
    
  }

  async register(): Promise<void>{
    if(this.email && this.username && this.password && !this.toShort && !this.uppercase && !this.specialSigns && !this.withoutDigits && !this.matchedPassword){
      await this.service.register(this.email, this.username, this.password);
    }else{
      console.log('error');
    }
    
  }

}
