import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from '../service/customer.service';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
@Component({
  selector: 'app-get-customer',
  standalone: true,
  imports: [
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCardModule,
  ],
  providers: [CustomerService],
  templateUrl: './get-customer.component.html',
  styleUrls: ['./get-customer.component.css'],
})
export class GetCustomerComponent implements OnInit {
  customer: any;
  id: number = 0;
  constructor(
    private route: ActivatedRoute,
    private customerService: CustomerService,
    private router: Router
  ) {}

  ngOnInit() {
    const idParam = this.route.snapshot.paramMap.get('id');
    this.id = idParam ? +idParam : 0;
    this.customerService.getCustomer(this.id).subscribe((data) => {
      this.customer = data;
    });
  }

  goToEdit() {
    this.router.navigate([`/edit-customer/${this.customer.id}`]);
  }
}
