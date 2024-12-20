// auth.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, interval, Observable, Subscription } from 'rxjs';
import * as jwt_decode from 'jwt-decode';
import localforage from 'localforage';
import { AppConfigService } from '../services/app-config.service';

interface AuthenticatedSubject {
  isAuthenticated: boolean;
  username: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private AUTH_URL: string;
  private isAuthenticatedFlag = false;
  private isAuthenticatedSubject = new BehaviorSubject<AuthenticatedSubject>({ isAuthenticated: false, username: '' });
  private username: string | null = null;
  private accessToken: string | null = null;
  private accessTokenExpiration: Date | null = null;
  private refreshTokenExpiration: Date | null = null;
  private refreshTokenInterval: Subscription | null = null;


  constructor(private router: Router, private httpClient: HttpClient, private configService: AppConfigService) {
    this.AUTH_URL = this.configService.get('API_URL');
    this.autoLogin();
  }

  login(username: string, password: string): boolean {
    this.httpClient.post(this.AUTH_URL + "/api/token/", { 'email': username, 'password': password }).subscribe((response: any) => {
      this.HandleAuthenticated(response);
      this.router.navigate(['/loading']);

      setTimeout(() => {
        this.router.navigate(['/']);}, 2000);
      return true;
    });

    return false;
  }

  isTokenExpired(token: any): boolean {
    if (!this.accessTokenExpiration){
      return true;
    }
    return this.accessTokenExpiration < new Date();
  }

  refreshToken() {
    console.log('Refreshing token');
    const refreshToken = localStorage.getItem('refreshToken');
    if (refreshToken) {
      this.httpClient.post(this.AUTH_URL + '/api/token/refresh/', { 'refresh': refreshToken }).subscribe((response: any) => {
        this.HandleAuthenticated(response);
        this.router.navigate(['/']);
      });
    }
  }

  private HandleAuthenticated(response: any) {
    const accessToken = response['access'];
    const refreshToken = response['refresh'];

    this.accessToken = accessToken;


    const decodedAccessToken: any = jwt_decode.jwtDecode(accessToken);
    const decodedRefreshToken: any = jwt_decode.jwtDecode(refreshToken);

    this.accessTokenExpiration = new Date(decodedAccessToken.exp * 1000);
    this.refreshTokenExpiration = new Date(decodedRefreshToken.exp * 1000);

    this.isAuthenticatedFlag = true;
    this.username = decodedAccessToken.user_email;

    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);

    this.isAuthenticatedSubject.next({ isAuthenticated: true, username: this.username ?? '' });
  }

  startTokenRefreshInterval() {
    if (this.refreshTokenInterval) {
      this.refreshTokenInterval.unsubscribe();
    }

    // Set an interval to check if the token is about to expire every minute
    this.refreshTokenInterval = interval(60000).subscribe(() => {
      if (this.accessTokenExpiration) {
        const timeRemaining = this.accessTokenExpiration.getMilliseconds() - Date.now();

        // If the token will expire in less than 5 minutes, refresh it
        if (timeRemaining < 5 * 60 * 1000) {
          this.refreshToken();
        }
      }
    });
  }

  stopTokenRefreshInterval() {
    if (this.refreshTokenInterval) {
      this.refreshTokenInterval.unsubscribe();
      this.refreshTokenInterval = null;
    }
  }

  autoLogin(){
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      const decodedAccessToken: any = jwt_decode.jwtDecode(accessToken);
      const expirationDate = new Date(decodedAccessToken.exp * 1000);

      if (new Date() < expirationDate) {
        // If token is still valid, set the user as authenticated
        this.isAuthenticatedFlag = true;
        this.username = decodedAccessToken.user_name;
        this.accessTokenExpiration = expirationDate;

        // Optionally, you can refresh the token if it's about to expire soon
        this.asyncrefreshTokenIfNeeded();
      } else {
        // If the token is expired, log the user out
        const refreshToken = localStorage.getItem('refreshToken');
        if (refreshToken) {
          const decodedRefreshToken: any = jwt_decode.jwtDecode(refreshToken);
          const refreshTokenExpiration = new Date(decodedRefreshToken.exp * 1000);

          if (new Date() < refreshTokenExpiration) {
            this.refreshToken();
          }
          else{
            this.logout();
          }
        } else{
          this.logout();
        }
      }
    }
  }

  asyncrefreshTokenIfNeeded() {
    if (this.accessTokenExpiration) {
      const timeRemaining = this.accessTokenExpiration.getMilliseconds() - Date.now();

      if (timeRemaining < 5 * 60 * 1000) {
        this.refreshToken();
      }
    }
  }

  logout() {
    this.isAuthenticatedFlag = false;
    this.username = null;
    this.accessTokenExpiration = null;
    this.refreshTokenExpiration = null;

    // Clear tokens from localStorage
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');

    // Stop the refresh interval
    this.stopTokenRefreshInterval();

    this.isAuthenticatedSubject.next({ isAuthenticated: false, username: this.username ?? '' });

    // Navigate to login page
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return this.isAuthenticatedFlag;
  }

  // Expose the observable for components to subscribe to
  isAuthenticated$(): Observable<AuthenticatedSubject> {
    return this.isAuthenticatedSubject.asObservable();
  }

  getUsername(): string | null {
    return this.username;
  }

  getToken(): string | null {
    return this.accessToken;
  }
}
