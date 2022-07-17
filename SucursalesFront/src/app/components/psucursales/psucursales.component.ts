import { Component, OnInit } from '@angular/core';
import { ProductSRestService } from 'src/app/services/productS/product-srest.service';
import { ChartType } from 'chart.js'
import { ActivatedRoute } from '@angular/router';
import { OfficeServiceService } from 'src/app/services/OfficeService/office-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-psucursales',
  templateUrl: './psucursales.component.html',
  styleUrls: ['./psucursales.component.css']
})
export class PsucursalesComponent implements OnInit {
  public pieChartType: ChartType = 'pie';
  products: any
  name:any = []
  value:any = []
  idOffice:any
  office:any

  constructor(
    private producS: ProductSRestService,
    private officeRest: OfficeServiceService,
    public activatedRoute: ActivatedRoute
  ) {

  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((id: any) => {
      this.idOffice = id.get('id');
    })
    this.getProductS();
    this.getOffice();
  }

  public pieChartData = {
    labels: this.name,
    datasets: [{
      data: this.value
    }]
  };

  getOffice(){
    this.officeRest.getOffice(this.idOffice).subscribe({
      next: (res:any) => this.office = res.branchOffice,
      error: (err) => Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: err.error.message,
        showConfirmButton: false,
        timer: 1000
      })
    })
  }

  getProductS() {
    this.producS.getProducSs(this.idOffice).subscribe({
      next: (res: any) => {
        this.products = res.productS
        for(const pd of res.productS){
          this.name.push(pd.name)
          this.value.push(parseInt(pd.stock))
        }
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

  sell(){
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Selled',
      showConfirmButton: false,
      timer: 1000
    })
  }
}
