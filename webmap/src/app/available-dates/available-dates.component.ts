import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayerData } from '../services/tmet-backend.service';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-available-dates',
  templateUrl: './available-dates.component.html',
  styleUrls: ['./available-dates.component.css'],
  imports: [CommonModule],
  standalone: true,
})
export class AvailableDatesComponent {
  @Input() dates: string[] = [];
  @Input() allData : LayerData[] = [];
  selectedDate: string | null = null;

  // Availability flags for the buttons
  isRgbAvailable: boolean = false;
  isCloudAvailable: boolean = false;
  isSingleChannelAvailable: boolean = false;

  selectedButton: string | null = null;

  constructor(private sharedService: SharedService) {}

  // Method to handle date selection
  onSelectDate(date: string): void {
    this.selectedDate = date;
    this.availabilityCheck(this.selectedDate);
    this.sharedService.setSelectedDate(date);
  }

  private availabilityCheck(selectedDate: string): void {
    this.setButtonsDisabled();
    const filtered = this.allData.filter((data) => data.time === selectedDate);
    const filteredChannels = new Set(filtered.map((data) => data.channel));

    filteredChannels.forEach((element) => {
      if (element === 'natural_color') {
        this.isRgbAvailable = true;
      }
      if (element === 'cloud') {
        this.isCloudAvailable = true;
      }
    });

    const filteredMissions = new Set(filtered.map((data) => data.mission));
    this.sharedService.setSelectedMissions(Array.from(filteredMissions));
  }

  private setButtonsDisabled(): void {
    this.isRgbAvailable = false;
    this.isCloudAvailable = false;
    this.isSingleChannelAvailable = false;
  }

  // Button click handlers
  onRgbClick(): void {
    console.log('RGB button clicked');
    this.sharedService.setSelectedChannel('natural_color');
  }

  onCloudClick(): void {
    console.log('Cloud button clicked');
    this.sharedService.setSelectedChannel('cloud');
  }

  onSingleChannelClick(): void {
    console.log('Single Channel button clicked');
  }
}
