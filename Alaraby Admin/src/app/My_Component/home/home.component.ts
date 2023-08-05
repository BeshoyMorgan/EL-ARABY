import { Component, OnDestroy, OnInit } from '@angular/core';
import { filter, map, Subscription } from 'rxjs';
import { IProduct } from 'src/app/Modules/iproduct';
import { IUser } from 'src/app/Modules/iuser';
// import { ClassData } from 'src/app/Models/class-data';
// import { HomeAdsService } from '../../services/home-ads.service';
import { ProductsApiService } from 'src/app/services/products-api.service';
import { UserApiService } from 'src/app/services/user-api.service';
// import { ItiInfo } from '../../Models/iti-info';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  productsList:IProduct[]=[];
  usersList:IUser[]=[];
  usersLength:number=0;
  gamesLength:number=0;

  gamesTotalPrice:number=0;
  totalEarnings:number=0;

  constructor(private prdApiService:ProductsApiService, private userApiService:UserApiService){
    this.prdApiService.getAllProducts().subscribe(data=>{this.productsList=data;})
    this.userApiService.getAllUsers().subscribe(data=>{this.usersList=data;})

    // this.usersLength = this.usersList.length;
    // this.gamesLength = this.productsList.length;

    this.prdApiService.getAllProducts().subscribe({
      next: (data) => {
        this.productsList=data;
      }, complete: () => {

        for(let i=0; i<this.productsList.length; i++){
            this.gamesTotalPrice += (+this.productsList[i].price);

        }
        console.log(this.gamesTotalPrice);
        this.gamesTotalPrice = Math.ceil(this.gamesTotalPrice);
        
    }, error: (err) => {
        console.error(err);
      }
  });

  this.userApiService.getAllUsers().subscribe({
    next: (data) => {
      this.usersList=data;
    }, complete: () => {

      for(let i=0; i<this.usersList.length; i++){
        for(let j=0; j<this.usersList[i].purchaseHistory.length; j++){
          var ID = this.usersList[i].purchaseHistory[j];
          console.log(ID);
          this.prdApiService.getAllProducts().subscribe(
            // data=>{this.productsList=data;}
            {
              next: (data) => {
                this.productsList=data;
              }, complete: () => {
                var prd = this.productsList.find(p => p._id == ID)
                
                if(prd){
                  this.totalEarnings += +prd.price;
                  console.log(this.totalEarnings, +prd.price, "condition");
                }
                //else if(!game){console.log("not found")}
                //else if (game?.Price == 'free'){console.log(game, "Game is free", this.usersList[i]) }
                //else {console.log("not found")}

              },error(err) {
                console.log(err);
              },

            }
          )
          
        }
        this.totalEarnings = Math.ceil(this.totalEarnings);
        // this.totalEarnings = 772;
        console.log(this.totalEarnings);
      }
      // this.totalEarnings = Math.ceil(this.totalEarnings);
      // console.log(this.totalEarnings);
      
    }, error: (err) => {
        console.error(err);
      }

  });

  // games > [ {id, ...}, {id, ...}, {} ]

  }
  
  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    
  }

  

}
