import { Routes } from '@angular/router';
import { AddCustomerComponent } from './add-customer/add-customer.component';
import { GetCustomerComponent } from './get-customer/get-customer.component';
import { EditCustomerComponent } from './edit-customer/edit-customer.component';
import { LoginComponent } from './login/login.component';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { AuthGuard } from './auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'list', component: CustomerListComponent, canActivate: [AuthGuard] },
  {
    path: 'customer-detail/:id',
    component: GetCustomerComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'add-customer',
    component: AddCustomerComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'edit-customer/:id',
    component: EditCustomerComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'change-password',
    component: ChangePasswordComponent,
    canActivate: [AuthGuard],
  },
  { path: '**', redirectTo: '/list' },
];
