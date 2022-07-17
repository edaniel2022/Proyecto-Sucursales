import { Component, OnInit } from '@angular/core';
import { OfficeServiceService } from 'src/app/services/OfficeService/office-service.service';
import { OfficeModel } from 'src/app/models/branchOffice.model';
import { CompanyRestService } from 'src/app/services/companyRest/company-rest.service';
import { CompanyModel } from 'src/app/models/company.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-branch-office',
  templateUrl: './branch-office.component.html',
  styleUrls: ['./branch-office.component.css']
})
export class BranchOfficeComponent implements OnInit {
  offices: any;
  office: OfficeModel;
  officeUpdate: any;
  company: CompanyModel;


  constructor(
    private officeRest: OfficeServiceService,
    private companyRest: CompanyRestService
  ) {
    this.office = new OfficeModel('', '', '', '', '')
    this.company = new CompanyModel('', '', '', '', '', '')
  }

  ngOnInit(): void {
    this.getOffices();
    this.getCompany();
  }

  getOffices() {
    this.officeRest.getOffices().subscribe({
      next: (res: any) => this.offices = res.branchOffices,
      error: (err) => Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: err.error.message,
        showConfirmButton: false,
        timer: 1000
      })
    })
  }

  getOffice(branchOfficeid: string) {
    this.officeRest.getOffice(branchOfficeid).subscribe({
      next: (res: any) => this.officeUpdate = res.branchOffice,
      error: (err) => Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: err.error.message,
        showConfirmButton: false,
        timer: 1000
      })
    })
  }

  saveOffice(addOfficeForm: any) {
    this.officeRest.saveOffice(this.office).subscribe({
      next: (res: any) => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: res.message,
          showConfirmButton: false,
          timer: 1000
        });
        this.getOffices();
        addOfficeForm.reset();
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

  deleteOffice(id: string) {
    this.officeRest.deleteOffice(id).subscribe({
      next: (res: any) => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: res.message,
          showConfirmButton: false,
          timer: 1000
        });
        this.getOffices();
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

  updateOffice() {
    this.officeRest.updateOffice(this.officeUpdate._id, this.officeUpdate).subscribe({
      next: (res: any) => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: res.message,
          showConfirmButton: false,
          timer: 1000
        });
        this.getOffices();
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

  getCompany() {
    this.companyRest.getIdCompany(this.companyRest.getIdentity()._id).subscribe({
      next: (res: any) => {
        this.company = res.company
      },
      error: (err) => alert(err.error.message)
    })
  }


}
