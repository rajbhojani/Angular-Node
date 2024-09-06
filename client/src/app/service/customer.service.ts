import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  private apiUrl = 'http://localhost:3000/api/customers';

  constructor(private http: HttpClient, private router: Router) {}

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http
      .post<any>('http://localhost:3000/api/users/login', credentials)
      .pipe(catchError(this.loginHandleError.bind(this)));
  }

  getCustomers(): Observable<any[]> {
    return this.http
      .get<any[]>(`${this.apiUrl}/all`)
      .pipe(catchError(this.handleError.bind(this)));
  }

  getCustomer(id: number): Observable<any> {
    return this.http
      .get<any>(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.handleError.bind(this)));
  }

  addCustomer(customer: any): Observable<any> {
    return this.http
      .post<any>(this.apiUrl, customer)
      .pipe(catchError(this.handleError.bind(this)));
  }

  updateCustomer(customerId: number, customerData: any): Observable<any> {
    return this.http
      .put<any>(`${this.apiUrl}/${customerId}`, customerData)
      .pipe(catchError(this.handleError.bind(this)));
  }

  changePassword(passwords: {
    oldPassword: string;
    newPassword: string;
  }): Observable<any> {
    return this.http
      .post<any>('http://localhost:3000/api/users/change-password', passwords)
      .pipe(catchError(this.handleError.bind(this)));
  }

  private loginHandleError(error: HttpErrorResponse) {
    if (error.status !== 200) {
      localStorage.removeItem('authToken');
      this.router.navigate(['/login']);
    }
    return throwError(() => new Error(error.message));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status !== 200) {
      this.router.navigate(['/login']);
    }

    return throwError(() => new Error(error.message));
  }
}
