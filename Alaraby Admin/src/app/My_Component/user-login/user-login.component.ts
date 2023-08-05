import { Component, OnInit, OnChanges } from '@angular/core';
import { UserAuthService } from 'src/app/services/user-auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss']
})
export class UserLoginComponent implements OnInit, OnChanges {
  auth:boolean=false;

constructor(private router:Router ,private userAuthService:UserAuthService){}
  ngOnInit(): void {
    this.auth=this.userAuthService.UserState;
    
  }
  ngOnChanges(): void {
    if (this.userAuthService.UserState) {
      console.log(this.router);
      this.router.navigate(['/Products']);
    } else {
      alert("Login failed, Please Enter Valid Email and Password");
    }
  }
  userLogin (Email:string,Pass:string){

    console.log(Email + " " + Pass);

    this.userAuthService.login(Email, Pass)

      

    this.auth=this.userAuthService.UserState;//true

    
    if (this.userAuthService.UserState) {
      console.log(this.router);
      this.router.navigate(['/Products']);

    } 


  }

  userLogout(){
    this.userAuthService.logout();
    this.auth=this.userAuthService.UserState;//false
    
  }

  // goRegister(){
  //   this.router.navigate(['/Register']);
  // }
  goLogout(){
    this.router.navigate(['/Logout']);
  }

}
