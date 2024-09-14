// auth.service.ts
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticatedFlag = false;
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.isAuthenticatedFlag);
  private username: string | null = null;

  constructor(private router: Router) {}

  login(username: string, password: string): boolean {
    this.isAuthenticatedFlag = true;
    this.username = username;
    this.isAuthenticatedSubject.next(this.isAuthenticatedFlag);
    this.router.navigate(['/']);
    return true;
  }

  logout(): void {
    this.isAuthenticatedFlag = false;
    this.username = null;
    this.isAuthenticatedSubject.next(this.isAuthenticatedFlag);
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return this.isAuthenticatedFlag;
  }

  // Expose the observable for components to subscribe to
  isAuthenticated$(): Observable<boolean> {
    return this.isAuthenticatedSubject.asObservable();
  }

  getUsername(): string | null {
    return this.username;
  }
}
