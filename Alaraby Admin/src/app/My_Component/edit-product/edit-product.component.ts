import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduct } from 'src/app/Modules/iproduct';
import { ProductsApiService } from 'src/app/services/products-api.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent {

  product:IProduct = {} as IProduct;
  categoryList = ["TV", "Air Conditioner", "Microwave", "Watch"];
  brandList = ["TORNADO", "SHARP", "ALBA"];
  prd:IProduct = {} as IProduct;
  foundPrd:IProduct = {} as IProduct;
  prdIDList:any[]=[];
  currentProductID:any;
  currentIndex:number=0;
  showMore:boolean = false;

  
  constructor(private activatedRoute:ActivatedRoute, private location:Location, private prdApiService:ProductsApiService, private router:Router){
    
    this.categoryList = ['TV', "Air Conditioner", "Microwave", "Watch"];
    console.log(this.categoryList);

    this.product.Count = 0;
    this.product.IsDeleted = false;
    this.product.img = "";
    
  }

  ngOnInit(): void {
    
    this.activatedRoute.paramMap.subscribe(paramMap=>{    // subscribe to keep watching the url changes
       this.currentProductID=paramMap.get('pid')?paramMap.get('pid'):0;

       this.prdApiService.getProductByID(this.currentProductID).subscribe(
       {
          next:(data)=>{
            this.foundPrd=data;
          },
          complete:()=>{
            if(this.foundPrd){
              this.prd=this.foundPrd;
              console.log(this.prd);
            }
            else{
              alert("Product not found");
              this.location.back();
            }
          },
          error:(err)=>{
            console.log(err);
          }
        }
        )
      })

  }
  ngOnChanges(): void {
  }

  handleChange(e:string){}

  EditProduct(){

    console.log(this.product);

    this.prdApiService.editProduct(this.prd._id, this.product).subscribe({
      next:(newPrd)=>{
        console.log(newPrd);
        
      }, complete:()=>{
        this.router.navigate(['/Products']);
      }, error:(err)=>{

        console.log(err);
      }
      // complete:()=>{}
    });
  }

  cancelBtn(){
    console.log("bye");
    
    this.router.navigate(['/Products']);
    
  }

  AddPhoto(){
  }

  RemovePhoto(i:number){


  }

  selectGenres(gen:any){
    console.log(gen);
    
  }

}
