import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SharedService } from '../services/shared.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, CommonModule],
})
export class HeaderComponent implements OnInit {
  availableMissions: string[] | null = [];

  username: string | null;

  constructor(private authService: AuthService, private sharedService: SharedService) {
    this.username = authService.getUsername();
  }
  ngOnInit() {
    this.sharedService.availableMissions$.subscribe((missions) => {
      this.availableMissions = missions;
      console.log('Available missions:', this.availableMissions);
    });
  }

  onMissionButtonClick(mission: string) {
    console.log('Mission button clicked:', mission);
    this.sharedService.setSelectedMission(mission);
  }

  onMenuClick() {}

  onLogout() {
    this.authService.logout();
  }
}
