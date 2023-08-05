import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUser } from '../Modules/iuser';
import { environment } from 'src/environments/environment';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';


@Injectable({
  providedIn: 'root'
})
export class UserApiService {

  private httpOptions = {};
  usersList:IUser[] = [];

  constructor(private httpClient:HttpClient) {    // HttpClient carries all database methods (get, post, patch, put, delete...)

    this.httpOptions={
      headers:new HttpHeaders(
        {
          'Content-Type':'application/json',
          Authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbklkIjoiNjQ1NWVmMWU0MzU5NWFmY2I4ODNkYjg5IiwiaWF0IjoxNjgzMzU1MDQ1fQ.Mx0oTUKwR4UFF0idToSn3ktZ__wowARwTa8j9kILVZ0'
        })
    };

  }

  getAllUsers():Observable<IUser[]>{ 
    return this.httpClient.get<IUser[]>(`http://localhost:5000/users`, this.httpOptions)
  }

  // get user by id
  getUserByID(userID:any):Observable<IUser>{
    return this.httpClient.get<IUser>(`http://localhost:5000/users/${userID}`, this.httpOptions)
  }

  // Add new user
  // addNewUser(user:IUser):Observable<IUser>{
  //   // return this.httpClient.post<FormGroup>(`http://localhost:3000/Users`,user,this.httpOptions);
  //   return this.httpClient.post<IUser>(`http://localhost:5000/users`,JSON.stringify(user),this.httpOptions);
  // }

  // delete user
  deleteUser(user: IUser):Observable<IUser>{
    return this.httpClient.delete<IUser>(`http://localhost:5000/users/${user._id}`, this.httpOptions)
  }
}
