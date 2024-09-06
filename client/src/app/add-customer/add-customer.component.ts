import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomerService } from '../service/customer.service';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-add-customer',
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
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css'],
})
export class AddCustomerComponent {
  customerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private customerService: CustomerService
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

  addCustomer() {
    if (this.customerForm.valid) {
      this.customerService.addCustomer(this.customerForm.value).subscribe(
        (response) => alert('Customer added successfully!'),
        (error) => alert('Error adding customer.')
      );
    }
  }
}
