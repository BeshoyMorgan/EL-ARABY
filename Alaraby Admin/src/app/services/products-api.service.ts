import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProduct } from '../Modules/iproduct';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsApiService {

  // Day7
  private httpOptions = {};
  productList:IProduct[] = [];
  // sum:Observable = 0 as Observable;
  // sum:Observable<Number> ;

  constructor(private httpClient:HttpClient) {    // HttpClient carries all database methods (get, post, patch, put, delete...)

    this.httpOptions={
      headers:new HttpHeaders(
        {
          'Content-Type':'application/json',
          Authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbklkIjoiNjQ1NWVmMWU0MzU5NWFmY2I4ODNkYjg5IiwiaWF0IjoxNjgzMzU1MDQ1fQ.Mx0oTUKwR4UFF0idToSn3ktZ__wowARwTa8j9kILVZ0'
        })
    };

  }   
  
  // get all products                
  getAllProducts():Observable<IProduct[]>{ 
    return this.httpClient.get<IProduct[]>(`http://localhost:5000/products`,this.httpOptions)
  }

  // get products by category id     // http://localhost:3000/Products?CateogryID=3
  // getProductsByCategoryId(categoryId:any):Observable<IProduct[]>{
  //   return this.httpClient.get<IProduct[]>(`http://localhost:5555/Games/genres/${categoryId}`,this.httpOptions)
  // }
  
  // get product by id               
  getProductByID(prdID:any):Observable<IProduct>{
    return this.httpClient.get<IProduct>(`http://localhost:5000/products/${prdID}`, this.httpOptions)
  }

  // add new product
  addNewProduct(product:IProduct):Observable<IProduct>{
    return this.httpClient.post<IProduct>(`http://localhost:5000/products`,JSON.stringify(product),this.httpOptions)
  }

  // edit product
  editProduct(id:any,product:IProduct):Observable<IProduct>{
    return this.httpClient.patch<IProduct>(`http://localhost:5000/products/${id}`,JSON.stringify(product), this.httpOptions)
  }

  // delete product
  deleteProduct(product: IProduct):Observable<IProduct>{
    return this.httpClient.delete<IProduct>(`http://localhost:5000/products/${product._id}`, this.httpOptions)
  }
  
}


