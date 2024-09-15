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

  selectedMission: string | null = null;

  username: string | null;

  constructor(private authService: AuthService, private sharedService: SharedService) {
    this.username = authService.getUsername();
  }
  ngOnInit() {
    this.sharedService.availableMissions$.subscribe((missions) => {
      this.availableMissions = missions;
      console.log('Available missions:', this.availableMissions);

      if (this.availableMissions && this.availableMissions.length > 0){
        this.selectedMission = this.availableMissions[0];
        this.sharedService.setSelectedMission(this.selectedMission);
      }
    });
  }

  onMissionButtonClick(mission: string) {

    this.selectedMission = mission;
    this.sharedService.setSelectedMission(this.selectedMission);

    console.log('Mission selected:', mission);
    console.log('Selected Mission:', this.selectedMission);
  }

  onMenuClick() {}

  onLogout() {
    this.authService.logout();
  }
}
