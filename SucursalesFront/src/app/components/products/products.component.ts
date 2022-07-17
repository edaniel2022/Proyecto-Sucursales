import { Component, OnInit } from '@angular/core';
import { ProductsModel } from 'src/app/models/product.model';
import { ProductRestService } from 'src/app/services/productRest/product-rest.service';
import { CompanyModel } from 'src/app/models/company.model';
import { CompanyRestService } from 'src/app/services/companyRest/company-rest.service';
import { ProductSRestService } from 'src/app/services/productS/product-srest.service';
import { ProductSsModel } from 'src/app/models/prodctS.model';
import { OfficeServiceService } from 'src/app/services/OfficeService/office-service.service'
import Swal from 'sweetalert2';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  products: any;
  product: ProductsModel;
  productU: any;
  company: CompanyModel;
  value: any = [];
  productModel: ProductSsModel;
  offices: any

  constructor(
    private productRest: ProductRestService,
    private companyRest: CompanyRestService,
    private productSRes: ProductSRestService,
    private officeRest: OfficeServiceService
  ) {
    this.product = new ProductsModel('', '', 0, '');
    this.company = new CompanyModel('', '', '', '', '', '');
    this.productModel = new ProductSsModel('', 'risitos', 0, 0, '');

  }

  ngOnInit(): void {
    this.getProducts();
    this.getCompany();
    this.getOffices();
  }

  getCompany() {
    this.companyRest
      .getIdCompany(this.companyRest.getIdentity()._id)
      .subscribe({
        next: (res: any) => {
          this.company = res.company;
        },
        error: (err) => Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.error.message,
          showConfirmButton: false,
          timer: 1000
        }),
      });
  }

  getProducts() {
    this.productRest.getProducts().subscribe({
      next: (res: any) => this.products = res.searchProduct,
      error: (err) => Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: err.error.message,
        showConfirmButton: false,
        timer: 1000
      }),
    });
  }

  saveProduct(saveProductForm: any) {
    this.productRest.saveProduct(this.product).subscribe({
      next: (res: any) => {
        this.getProducts();
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: res.message,
          showConfirmButton: false,
          timer: 1000
        })
        saveProductForm.reset();
      },
      error: (err) => Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: err.error.message,
        showConfirmButton: false,
        timer: 1000
      }),
    });
  }

  deleteProduct(id: string) {
    this.productRest.deleteProduct(id).subscribe({
      next: (res: any) => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: res.message,
          showConfirmButton: false,
          timer: 1000
        })
        this.getProducts();
      },
      error: (err) => Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: err.error.message,
        showConfirmButton: false,
        timer: 1000
      }),
    });
  }

  getProduct(productId: string) {
    this.productRest.getProduct(productId).subscribe({
      next: (res: any) => (this.productU = res.searchProduct),
      error: (err) => Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: err.error.message,
        showConfirmButton: false,
        timer: 1000
      }),
    });
  }

  updateProduct() {
    this.productRest.updateProduct(this.productU._id, this.productU).subscribe({
      next: (res: any) => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: res.message,
          showConfirmButton: false,
          timer: 1000
        })
        this.getProducts();
      },
      error: (err) => Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: err.error.message,
        showConfirmButton: false,
        timer: 1000
      }),
    });
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

  exportProduct() {
    this.productSRes.saveProduct(this.productU._id, this.productModel).subscribe({
      next: (res: any) => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: res.message,
          showConfirmButton: false,
          timer: 1000
        })
        this.getProducts();
      },
      error: (err) => Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: err.error.message,
        showConfirmButton: false,
        timer: 1000
      }),

    })
  }
}
