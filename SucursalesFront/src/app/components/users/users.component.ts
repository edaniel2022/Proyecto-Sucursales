import { Component, OnInit } from '@angular/core';
import { CompanyModel } from 'src/app/models/company.model';
import { CompanyRestService } from 'src/app/services/companyRest/company-rest.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  company: CompanyModel;
  companies: any;
  companyUpdate:any
  towns: any[] = [
    'Alta Verapaz',
    'Baja Verapaz',
    'Chiquimula',
    'Peten',
    'El Progreso',
    'Quiché',
    'Escuintla',
    'Guatemala',
    'Izabal',
    'Jalapa',
    'Jutiapa',
    'Quetzaltenango',
    'Retalhuleu',
    'Sacatepéquez',
    'San Marcos',
    'Santa Rosa',
    'Solola',
    'Totonicapán',
    'Zacapa',
  ];

  constructor(
    private companyRest: CompanyRestService
  ) {
    this.company = new CompanyModel('', '', '', '', '', '');
  }

  ngOnInit(): void {
    this.getCompanies();
  }

  getCompanies() {
    this.companyRest.getCompanies().subscribe({
      next: (res: any) => {
        this.companies = res.dentCompany;
      },
      error: (err) => Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: err.error.message,
        showConfirmButton: false,
        timer: 1000
      })

    })
  }

  addCompany(){
    this.companyRest.addCompany(this.company).subscribe({
      next:(res:any)=>{
        Swal.fire({
          position: 'center',
          title: res.message,
          icon: 'success',
          showConfirmButton: false,
          timer: 1000
        })
        this.getCompanies();
      },
      error: (err) => Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: err.error.message,
        showConfirmButton: false,
        timer: 1000
      })
    })
  }

  getCompany(id:string){
    this.companyRest.getCompany(id).subscribe({
      next:(res:any)=>{
        this.companyUpdate = res.company;
        console.log(this.companyUpdate)
      },
      error: (err) => Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: err.error.message,
        showConfirmButton: false,
        timer: 1000
      })
    })
  }

  updateCompany(){
    this.companyUpdate.password = undefined
    this.companyRest.updateCompanies(this.companyUpdate._id, this.companyUpdate).subscribe({
      next:(res:any)=>{
        console.log(this.companyUpdate)
        Swal.fire({
          position: 'center',
          title: res.message,
          icon: 'success',
          showConfirmButton: false,
          timer: 1000
        })
        this.getCompanies();
      },
      error: (err) => Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: err.error.message,
        showConfirmButton: false,
        timer: 1000
      })
    })
  }

  deleteCompany(id:string){
    this.companyRest.deleteCompanies(id).subscribe({
      next:(res:any)=>{
        console.log(this.companyUpdate)
        Swal.fire({
          position: 'center',
          title: res.message,
          icon: 'success',
          showConfirmButton: false,
          timer: 1000
        })
        this.getCompanies();
      },
      error: (err) => Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: err.error.message,
        showConfirmButton: false,
        timer: 1000
      })
    })
  }

}
