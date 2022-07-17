import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from '../app/components/home/home.component'
import { BranchOfficeComponent } from './components/branch-office/branch-office.component';
import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ProductsComponent } from './components/products/products.component';
import { RegisterComponent } from './components/register/register.component';
import { ViewCompanyComponent } from './components/view-company/view-company.component';
import {PsucursalesComponent} from './components/psucursales/psucursales.component';
import { UserGuard } from './guards/user.guard';
import { AdminGuard } from './guards/admin.guard';
import { UsersComponent } from './components/users/users.component';


const routes: Routes = [
  {path: '', canActivate: [UserGuard], component: HomeComponent},
  {path: 'home', canActivate: [UserGuard], component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'offices', canActivate: [UserGuard], component: BranchOfficeComponent},
  {path: 'view-company', canActivate: [UserGuard], component: ViewCompanyComponent},
  {path: 'productsCompany', canActivate: [UserGuard], component: ProductsComponent},
  {path: 'officeProduct/:id', canActivate: [UserGuard], component: PsucursalesComponent},
  {path: 'users', canActivate: [AdminGuard], component: UsersComponent},
  {path: '**', component: NotFoundComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
