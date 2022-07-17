import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CompanyModel } from 'src/app/models/company.model';
import { CompanyRestService } from 'src/app/services/companyRest/company-rest.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-view-company',
  templateUrl: './view-company.component.html',
  styleUrls: ['./view-company.component.css']
})
export class ViewCompanyComponent implements OnInit {
  company: CompanyModel;
  baseUpdate: any;
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
    private companyRest: CompanyRestService,
    public router: Router
  ) {
    this.company = new CompanyModel('', '', '', '', '', '')
  }

  ngOnInit(): void {
    this.getCompany();

  }


  /*--------------------Mostrar Datos de la compañia Logiada---------------------*/
  getCompany() {
    this.companyRest.getIdCompany(this.companyRest.getIdentity()._id).subscribe({
      next: (res: any) => {
        this.company = res.company
      },
      error: (err) => alert(err.error.message)
    })
  }

  /*--------------------Edit the Logged company (ADMIN)--------------------*/
  update() {
    this.baseUpdate.role = undefined;
    this.companyRest.updateCompany(this.baseUpdate._id, this.baseUpdate).subscribe({
      next: (res: any) => {
        Swal.fire({
          position: 'top-end',
          title: res.message,
          icon: 'success',
          showConfirmButton: false,
          timer: 1000
        })
        this.getCompany();
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

  deleteAccount() {
    this.companyRest.deleteAccount().subscribe({
      next: (res: any) => {
        localStorage.removeItem('token');
        localStorage.removeItem('identity');
        this.router.navigateByUrl('/login');
        Swal.fire({
          position: 'top-end',
          title: res.message,
          icon: 'success',
          showConfirmButton: false,
          timer: 1000
        })
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

  updateAccount() {
    this.companyRest.updateAccount(this.company).subscribe({
      next: (res: any) => {
        Swal.fire({
          position: 'top-end',
          title: res.message,
          icon: 'success',
          showConfirmButton: false,
          timer: 1000
        })
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



