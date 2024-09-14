// auth.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private username: string = 'kenan23@gmail.com';

  getUsername(): string {
    return this.username;
  }

  logout() {
    // Implement logout logic
    console.log('User logged out');
  }
}
