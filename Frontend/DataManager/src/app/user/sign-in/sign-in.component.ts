import { Component, OnInit } from '@angular/core';
import { FormGroup,Validators,FormBuilder,FormControl } from '@angular/forms';
import {ConfigService} from '../../config.service';
import { UserService } from 'src/app/user.service';
import {Router} from '@angular/router';
import { Token } from '@angular/compiler';
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  public loginForm:FormGroup;
  Users:UserService[];
  UserNameMatches:boolean;
  UserPasswordMatches:boolean;
  t:Token;
  IsWrong:boolean = false;

  constructor( public FormBuilder: FormBuilder, public Config: ConfigService, public Route: Router) {
    this.loginForm = this.FormBuilder.group({
      Username: ['', Validators.required],
      Password: ['', Validators.required]
    });
   }

  ngOnInit() {
    this.GetUsers();
  }
  GetUsers(){
    this.Config.GetUsers().subscribe(data => {
      this.Users = data;

    })
  }
  
  CheckIfUserMatches(Username:string, Password:string){
    console.log(this.Users);
    console.log(Username);
   if(this.Users.some(user1 => user1.username == Username)   && this.Users.some(user => user.password == Password)){
    localStorage.setItem('currentuser', JSON.stringify({token:Token, username:Username}));
    this.Route.navigateByUrl('/home');
    
   }
   else {
    this.IsWrong = true;
     console.log("error");
   }
  
  }

}
