import { Component } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { RouterOutlet, Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'client';
  showBackButton = false;
  showButtons = false;

  constructor(private router: Router, private location: Location) {
    // Subscribe to router events to show/hide back button
    this.router.events.subscribe(() => {
      this.showBackButton =
        this.router.url !== '/login' && this.router.url !== '/list';
      this.showButtons = this.router.url !== '/login';
    });
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

  goBack() {
    this.location.back();
  }
}
