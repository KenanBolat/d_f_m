import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SharedService } from '../services/shared.service';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, CommonModule],
})
export class HeaderComponent implements OnInit, OnDestroy {
  availableMissions: string[] | null = [];
  private authSubscription!: Subscription;

  selectedMission: string | null = null;

  username: string | null = null;

  constructor(private authService: AuthService, private sharedService: SharedService, private cdr: ChangeDetectorRef) {
  }

  ngOnInit() {

    this.authSubscription = this.authService.isAuthenticated$().subscribe((isAuth) => {
      this.username = isAuth.username;
    });

    this.sharedService.availableMissions$.subscribe((missions) => {
      this.availableMissions = missions;
      console.log('Available missions:', this.availableMissions);

      if (this.availableMissions && this.availableMissions.length > 0){
        this.selectedMission = this.availableMissions[0];
        this.sharedService.setSelectedMission(this.selectedMission);

        this.cdr.detectChanges();
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

  ngOnDestroy(): void {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }
}
