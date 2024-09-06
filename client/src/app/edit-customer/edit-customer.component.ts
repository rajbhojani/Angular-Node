import { CustomerService } from '../service/customer.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { HttpErrorResponse, HttpClientModule } from '@angular/common/http';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';

interface UpdateCustomerResponse {
  message: string;
}

@Component({
  selector: 'app-edit-customer',
  standalone: true,
  imports: [
    FormsModule,
    RouterModule,
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatNativeDateModule,
    MatCardModule,
    ReactiveFormsModule,
  ],
  providers: [CustomerService],
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.css'],
})

export class EditCustomerComponent implements OnInit {
  customerForm: FormGroup;
  id!: number;

  constructor(
    private fb: FormBuilder,
    private customerService: CustomerService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.customerForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.maxLength(32)]],
      mobileNumber: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      birthdate: ['', Validators.required],
      gender: ['', [Validators.required, Validators.pattern(/^[12]$/)]],
      address: ['', [Validators.required, Validators.maxLength(124)]],
      landmark: [''],
      pincode: ['', [Validators.required, Validators.pattern(/^\d{6}$/)]],
    });
  }
  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const id = +params.get('id')!;
      if (id) {
        this.customerService.getCustomer(id).subscribe((data) => {
          (data.gender = String(data.gender)),
            this.customerForm.patchValue(data);
        });
      }
    });
  }
  updateCustomer() {
    if (this.customerForm.valid) {
      this.customerService
        .updateCustomer(this.id, this.customerForm.value)
        .subscribe(
          (response: UpdateCustomerResponse) =>
            alert('Customer updated successfully!'),
          (error: HttpErrorResponse) => alert('Error updating customer.')
        );
    }
  }
}
