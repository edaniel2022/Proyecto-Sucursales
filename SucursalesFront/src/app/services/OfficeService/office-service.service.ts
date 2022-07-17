import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CompanyRestService } from '../companyRest/company-rest.service';

@Injectable({
  providedIn: 'root'
})
export class OfficeServiceService {
  httpOptions = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': this.companyRest.getToken()
  })
  

  constructor(
    private http: HttpClient,
    private companyRest: CompanyRestService
  ) { }

    getOffices(){
      return this.http.get(environment.baseUrl + 'sucursal/getBranchOffices', {headers: this.httpOptions});
    }

    getOffice(id: string){
      return this.http.get(environment.baseUrl + 'sucursal/getBranchOffice/' + id, {headers: this.httpOptions});
    }

    saveOffice(params:{}){
      return this.http.post(environment.baseUrl + 'sucursal/saveBranchOffice', params, {headers: this.httpOptions});
    }

    deleteOffice(id: string){
      return this.http.delete(environment.baseUrl + 'sucursal/deleteBranchOffice/' + id, {headers: this.httpOptions});
    }

    updateOffice(id: string, params:{}){
      return this.http.put(environment.baseUrl + 'sucursal/updateBranchOffice/' + id, params, {headers: this.httpOptions});
    }

}