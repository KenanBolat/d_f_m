import { AfterViewInit, Component } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSidenavContainer, MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatInputModule} from '@angular/material/input';
import { MapComponent } from "../map/map.component";
import { SharedService } from '../services/shared.service';
import {MatListModule} from '@angular/material/list';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [MatToolbarModule,
    MatSidenavModule, MatCheckboxModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule, MapComponent, MapComponent, MatListModule, FormsModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent implements AfterViewInit {

  constructor(private sharedService: SharedService) { }

  isOpen: boolean = false;
  animationValue: number | null = null;

  ngAfterViewInit(): void {
    this.sharedService.menuOpen$.subscribe((open) => {
      this.isOpen = open;
    });

    localStorage.getItem('animationValue') ? this.animationValue = Number(localStorage.getItem('animationValue')) : this.animationValue = 5;
  }


  onSaveSettings() {
    localStorage.setItem('animationValue', this.animationValue!.toString());
    this.sharedService.setAnimationValue(this.animationValue!);
  }

}
