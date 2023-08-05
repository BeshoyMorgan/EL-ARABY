import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsApiService } from 'src/app/services/products-api.service';
// import { ActivatedRoute } from '@angular/router';
import { IProduct } from '../../Modules/iproduct';
import { UserApiService } from 'src/app/services/user-api.service';
import { IUser } from '../../Modules/iuser';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {

  usersList:IUser[] = [];
  receivedCartList:IProduct[]=[];
  // prd:IProduct|undefined =undefined;
  orderTotalPrice:number = 0;
  IDNumber:number = 0;

  @Input() receivedCatID:number = 0;
  prdListOfCat:IProduct[]=[];

  constructor(private userApiService:UserApiService, private router:Router){
    this.userApiService.getAllUsers().subscribe(data=>{this.usersList=data;})
  }

  ngOnChanges(): void {
  }
  
  ngOnInit(): void {
  }

  deleteCart(i:number){
    this.receivedCartList[i].IsDeleted = !this.receivedCartList[i].IsDeleted
    let curr = this.receivedCartList.filter(item => +item._id != i)
    this.receivedCartList = curr;
    console.log(this.receivedCartList);
  }

  DeleteUser(i:number,user:IUser){

    this.userApiService.deleteUser(user).subscribe({
      next:(newUser)=>{
        console.log(newUser, "deleted successfully");
        location.reload();
      },
      error:(err)=>{
        console.log(err);
      }
    });
  }

  trackPrdFunc(index:number, item:IUser){  // handles the changes we make only on the product that running now in the for loog (ngFor)
    return item._id;
  }
}
