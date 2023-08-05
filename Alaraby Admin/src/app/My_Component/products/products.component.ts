import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsApiService } from 'src/app/services/products-api.service';
import { IProduct } from '../../Modules/iproduct';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit,OnChanges{

  productsList:IProduct[] = [];
  temp:IProduct[] = []
  receivedCartList:IProduct[]=[];
  prdListOfCat:IProduct[]=[];
  IDNumber:number = 0;
  categoryList = ["TV", "Air Conditioner", "Microwave", "Watch"];
  selectedCat:string = "";
  PrdName:string='';
  not_Found:boolean=false;


  constructor( private prdApiService:ProductsApiService, private router:Router){
    
    this.prdApiService.getAllProducts().subscribe(
      // data=>{this.productsList=data;}
      {
        next:(data)=>{
          this.productsList=data
        },
        complete:()=>{
          this.temp = this.productsList;
          console.log(this.productsList);
        },
        error:(err)=>{
          console.log(err);
          
        }
      }
    ) 


  }

  ngOnChanges(): void {
    console.log(this.productsList);

    if(this.selectedCat!=""){
      this.temp = this.productsList;
      var tempList = [];
      for(var i=0; i<this.productsList.length;i++){
        var product = this.productsList[i];
        if(product.category==this.selectedCat){
          tempList.push(product);
        }
      }
      this.temp = tempList;
    }else {
      this.temp = this.productsList;
    }
  }
  
  ngOnInit(): void {
    this.temp = this.productsList;
    console.log(this.temp); 

    if(this.selectedCat!=""){
      var tempList = [];
      for(var i=0; i<this.productsList.length;i++){
        var product = this.productsList[i];
        if(product.category==this.selectedCat){
          tempList.push(product);
        }
      }
      this.temp = tempList;
    }else {
      this.temp = this.productsList;
    }
  }

  selectCat(){
    console.log(this.selectedCat , " Selected Category ID");

    if(this.selectedCat!=""){
      this.temp = this.productsList;
      var tempList = [];
      for(var i=0; i<this.productsList.length;i++){
        var product = this.productsList[i];
        if(product.category==this.selectedCat){
          tempList.push(product);
        }
      }
      this.temp = tempList;
      console.log(this.productsList);
      
    }

    else {
      this.temp = this.productsList;
    }
  }

  search(){
    for(let i=0; i<this.productsList.length; i++){
      if(this.productsList[i].name==this.PrdName){
        
        this.router.navigate([`/Products/${ this.productsList[i]._id }`])
      }
      else {this.not_Found=true}
    }
  }

  deleteCart(i:number){
    this.receivedCartList[i].IsDeleted = !this.receivedCartList[i].IsDeleted
    let curr = this.receivedCartList.filter(item => +item._id != i)
    this.receivedCartList = curr;
    console.log(this.receivedCartList);
  }

  DeleteProduct(i:number,product:IProduct){
    
    this.prdApiService.deleteProduct(product).subscribe({
      next:(newPrd)=>{
        console.log(newPrd);
        location.reload();
      },
      error:(err)=>{
        console.log(err);
      }
    });


    alert("Product Deleted Successfully")
  }

  EditProduct(i:number,product:IProduct){
    this.prdApiService.deleteProduct(product).subscribe({
      next:(newPrd)=>{
        console.log(newPrd);
        this.router.navigate(['/ADD']);
      },
      error:(err)=>{
        console.log(err);
      }
    });

  }

  trackPrdFunc(index:number, item:IProduct){  // handles the changes we make only on the product that running now in the for loop (ngFor)
    return item._id;
  }
}
