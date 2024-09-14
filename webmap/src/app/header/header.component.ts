// header.component.ts
import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule],
})
export class HeaderComponent {
  onMenuClick() {
    console.log('Menu clicked');
    // Implement menu toggle logic
  }

  onButton1Click() {
    console.log('Button 1 clicked');
    // Implement button 1 logic
  }

  onButton2Click() {
    console.log('Button 2 clicked');
    // Implement button 2 logic
  }

  onButton3Click() {
    console.log('Button 3 clicked');
    // Implement button 3 logic
  }

  onLogout() {
    console.log('Logout clicked');
    // Implement logout logic
  }
}
