import { Component, OnInit } from '@angular/core';
import { CompanyModel } from 'src/app/models/company.model';
import { CompanyRestService } from 'src/app/services/companyRest/company-rest.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  company: CompanyModel;

  constructor(
    private companyRest: CompanyRestService,
    private router: Router
  ) {
    this.company = new CompanyModel('','','','','','');

   }

  ngOnInit(): void {
  }

  /*---------------Login Teminado------------------------*/
 login(loginForm:any){
  this.companyRest.login(this.company).subscribe({
    next: (res:any)=>{
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: res.message,
        showConfirmButton: false,
        timer: 1000
      })
      localStorage.setItem('token', res.token);
      localStorage.setItem('identity', JSON.stringify(res.alreadyEmpresa));
      this.router.navigateByUrl('/');
    },
    error: (err)=>{
      loginForm.reset();
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: err.error.message,
        showConfirmButton: false,
        timer: 1000
      })
    }
  })
 }
}
