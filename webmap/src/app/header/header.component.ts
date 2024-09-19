import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SharedService } from '../services/shared.service';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import * as headerConstants from './header-constants';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, CommonModule],
})
export class HeaderComponent implements OnInit, OnDestroy {
  availableMissions: string[] = [];
  private authSubscription!: Subscription;

  selectedMission: string | null = null;

  username: string | null = null;

  // missions
  MSG: string = headerConstants.Mssion_MSG;
  IODC: string = headerConstants.Mssion_IODC;
  RSS: string = headerConstants.Mssion_RSS;
  MTG: string = headerConstants.Mssion_MTG;

  isMsgAvailable: boolean = false;
  isIodcAvailable: boolean = false;
  isRssAvailable: boolean = false;
  isMtgAvailable: boolean = false;

  constructor(private authService: AuthService, private sharedService: SharedService, private cdr: ChangeDetectorRef) {
  }

  ngOnInit() {

    this.authSubscription = this.authService.isAuthenticated$().subscribe((isAuth) => {
      this.username = isAuth.username;
    });

    this.sharedService.availableMissions$.subscribe((missions) => {
      this.availableMissions = missions ?? [];
      console.log('Available missions:', this.availableMissions);

      this.isMsgAvailable = this.availableMissions.includes(this.MSG);
      this.isIodcAvailable = this.availableMissions.includes(this.IODC);
      this.isRssAvailable = this.availableMissions.includes(this.RSS);
      this.isMtgAvailable = this.availableMissions.includes(this.MTG);

      if(this.selectedMission && !this.availableMissions.includes(this.selectedMission)) {
        this.selectMission(null);
      }

      if (this.canSelectMission()) {
        this.selectMission(this.availableMissions[0]);
        this.cdr.detectChanges();
      }
    });
  }

  onMissionButtonClick = (mission: string) => this.selectMission(mission);

  onMenuClick() {}

  onLogout() {
    this.authService.logout();
  }

  private selectMission(mission: string | null) {
    this.selectedMission = mission;
    this.sharedService.setSelectedMission(mission);

    console.log('Mission selected:', mission);
    console.log('Selected Mission:', this.selectedMission);
  }

  canSelectMission = () : boolean =>
    this.availableMissions && this.availableMissions.length > 0 && !this.selectedMission;

  ngOnDestroy(): void {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }
}
