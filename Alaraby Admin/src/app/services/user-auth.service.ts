import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  private isUserLoggedSubject:BehaviorSubject<boolean>;

  constructor(private httpClient: HttpClient,private router:Router) {
    this.isUserLoggedSubject=new BehaviorSubject<boolean>(this.UserState)
  }

  // login  logout
  // login(email:string, password:string){
  //   let adminToken='654321';
  //   localStorage.setItem("Admin_token",adminToken);
  //   this.isUserLoggedSubject.next(true);
  // }

  login(email: string, password: string)
  {

    return this.httpClient.post<any>('http://localhost:5000/admin/login', {email,password},
    // JSON.stringify({"userName": email,"Password": password})
    // {userName, Password}
    // {"userName": userName,"Password": Password}
    // ,this.httpOptions
    {
      headers: new HttpHeaders({'Content-Type':'application/json'})
      .set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbklkIjoiNjQ1NWVmMWU0MzU5NWFmY2I4ODNkYjg5IiwiaWF0IjoxNjgzMzU1MDQ1fQ.Mx0oTUKwR4UFF0idToSn3ktZ__wowARwTa8j9kILVZ0')
    }
    ).subscribe({
        next: (response: any) => {
            
            console.log(response.status,"subs running");
            let adminToken = response.token;
            localStorage.setItem("Admin_token", adminToken);

        }, complete: () => {
            this.router.navigate(['/Products']);
            alert("Loged In Successfully");

        }, error: (err) => {
            alert("Login failed, Please Enter Valid Email and Password");
            console.error(err);
          }
    }
    
    );

  }

  logout(){
    localStorage.removeItem("Admin_token");
    this.isUserLoggedSubject.next(false);
    
    alert("Loged Out Successfully");
  }

  get UserState():boolean{

    return (localStorage.getItem('Admin_token')) ? true : false;
  }

  getUserStatus():Observable<boolean>{
    return this.isUserLoggedSubject.asObservable();   // return true or false as observable cause when we use this method we have to subscribe on it and subscribe keep watching changes.
  }
}
