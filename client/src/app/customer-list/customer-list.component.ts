import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { CustomerService } from '../service/customer.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-customer-list',
  standalone: true,
  imports: [MatTableModule, MatCardModule, MatButtonModule, CommonModule],
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css'],
})
export class CustomerListComponent implements OnInit {
  customers: MatTableDataSource<any> = new MatTableDataSource<any>();
  displayedColumns: string[] = ['id', 'fullName', 'actions'];

  constructor(
    private customerService: CustomerService,
    private router: Router
  ) {}

  ngOnInit() {
    this.customerService.getCustomers().subscribe((data) => {
      this.customers.data = data;
    });
  }

  goToDetail(id: number) {
    this.router.navigate(['/customer-detail', id]);
  }

  goToAddCustomer() {
    this.router.navigate(['/add-customer']);
  }

  goToChangePassword() {
    this.router.navigate(['/change-password']);
  }

  logout() {
    localStorage.removeItem('authToken');
    this.router.navigate(['/login']);
  }
}
