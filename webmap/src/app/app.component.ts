// app.component.ts
import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { AuthService } from './auth/auth.service';
import { CommonModule } from '@angular/common';
import { MapComponent } from "./map/map.component";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent, MapComponent],
})
export class AppComponent implements OnInit, OnDestroy {
  isAuthenticated: boolean = false;
  private authSubscription!: Subscription;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    // Subscribe to the authentication state observable
    this.authSubscription = this.authService.isAuthenticated$().subscribe((isAuth) => {
      this.isAuthenticated = isAuth.isAuthenticated;
    });
  }

  ngOnDestroy() {
    // Unsubscribe to prevent memory leaks
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }
}
