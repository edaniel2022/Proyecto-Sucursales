import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CompanyRestService } from '../companyRest/company-rest.service';

@Injectable({
  providedIn: 'root'
})
export class ProductRestService {
  
  httpOptions = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': this.companyRest.getToken()
})
  constructor(private http: HttpClient, private companyRest: CompanyRestService) { }

  getProducts(){
    return this.http.get(environment.baseUrl + 'productC/getProducts', {headers: this.httpOptions});
  }

  saveProduct(params:{}){
    return this.http.post(environment.baseUrl + 'productC/saveProduct', params, {headers: this.httpOptions});
  }

  deleteProduct(id:string){
    return this.http.delete(environment.baseUrl + 'productC/deleteProduct/' + id, {headers: this.httpOptions});
  }

  getProduct(id:string){
    return this.http.get(environment.baseUrl + 'productC/getProduct/' + id, {headers: this.httpOptions});
  }

  updateProduct(id:string, params:string){
    return this.http.put(environment.baseUrl + 'productC/updateProduct/' + id, params, {headers: this.httpOptions});
  }
}

