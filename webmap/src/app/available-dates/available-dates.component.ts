import { AfterContentInit, AfterViewInit, ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayerData } from '../services/tmet-backend.service';
import { SharedService } from '../services/shared.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faStepBackward, faStepForward, faFastBackward, faFastForward } from '@fortawesome/free-solid-svg-icons';
import { aoiChannels } from '../map/map-constants';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-available-dates',
  templateUrl: './available-dates.component.html',
  styleUrls: ['./available-dates.component.css'],
  imports: [CommonModule, FontAwesomeModule, FormsModule],
  standalone: true,
})
export class AvailableDatesComponent implements AfterContentInit, OnChanges {

  @Input() dates: string[] = [];
  @Input() allData : LayerData[] = [];

  isAnimationPlaying: boolean = false;
  animationInterval: any;

  isUserSelectedButton: boolean = false;
  availableAoiChannels : string[] = [];
  selectedAoiChannel: string | null = null;

  selectedDate: string | null = null;
  isForwardSelectionEnabled: boolean = true;
  isBackwardSelectionEnabled: boolean = true;

  // Font Awesome icons
  faStepBackward = faStepBackward;
  faStepForward = faStepForward;
  faFastBackward = faFastBackward;
  faFastForward = faFastForward;


  // Availability flags for the buttons
  isRgbAvailable: boolean = false;
  isCloudAvailable: boolean = false;
  isSingleChannelAvailable: boolean = false;

  selectedButton: string | null = null;

  constructor(private sharedService: SharedService, private cdr: ChangeDetectorRef) {}

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['dates'].currentValue !== changes['dates'].previousValue) {
      this.onSelectDate(this.dates[0]);

      this.cdr.detectChanges();
    }
  }

  ngAfterContentInit(): void {
    if (this.dates.length > 0) {
      this.onSelectDate(this.dates[0]);

      this.cdr.detectChanges();
    }
  }

  // Method to handle date selection
  onSelectDate(date: string): void {
    this.isForwardSelectionEnabled = true;
    this.isBackwardSelectionEnabled = true;

    this.selectedDate = date;
    this.availabilityCheck(this.selectedDate);
    this.sharedService.setSelectedDate(date);

    if(this.dates[this.dates.length - 1] === this.selectedDate) {
      this.isForwardSelectionEnabled = false;
    }

    if(this.dates[0] === this.selectedDate) {
      this.isBackwardSelectionEnabled = false;
    }
  }

  private availabilityCheck(selectedDate: string): void {
    this.setButtonsDisabled();
    const filtered = this.allData.filter((data) => data.time === selectedDate);
    const filteredChannels = new Set(filtered.map((data) => data.channel));

    filteredChannels.forEach((element) => {
      if (element === 'natural_color') {
        this.isRgbAvailable = true;
      }
      if (element === 'ir_cloud_day') {
        this.isCloudAvailable = true;
      }

      if(aoiChannels.includes(element)) {
        this.isSingleChannelAvailable = true;
      }

      this.availableAoiChannels = Array.from(filteredChannels).filter((channel) => aoiChannels.includes(channel));
    });

    // set first channel as selected

    if(this.autoSelectChannel(filteredChannels)) {

      if(Array.from(filteredChannels).includes('natural_color')) {
        this.selectedButton = 'natural_color';
      } else if(Array.from(filteredChannels).includes('ir_cloud_day')) {
        this.selectedButton = 'ir_cloud_day';
      }

      this.selectedAoiChannel = null;
      this.sharedService.setSelectedChannel(this.selectedButton!);
    }

    const filteredMissions = new Set(filtered.map((data) => data.mission));
    this.sharedService.setSelectedMissions(Array.from(filteredMissions));

}

  private autoSelectChannel(filteredChannels: Set<string>): boolean {
    if(this.isUserSelectedButton || this.selectedAoiChannel) {
      return false;
    }
    return true;
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
    this.selectedButton = 'natural_color';
    this.selectedAoiChannel = null;
    this.isUserSelectedButton = true;
  }

  onCloudClick(): void {
    console.log('Cloud button clicked');
    this.sharedService.setSelectedChannel('ir_cloud_day');
    this.selectedButton = 'ir_cloud_day';
    this.selectedAoiChannel = null;
    this.isUserSelectedButton = true;
  }

  onChannelSelect($event: Event) {
    const target = $event.target as HTMLButtonElement;
    const channel = target.value;
    this.selectedAoiChannel = channel;
    this.sharedService.setSelectedChannel(channel);
    this.selectedButton = null;
    this.isUserSelectedButton = true;
    }

    onAnimationClick() {
      if(!this.isAnimationPlaying) {
        let selectedDateIndex = this.dates.indexOf(this.selectedDate!);

        // start moving forward in every 5 seconds and create a loop
        this.animationInterval = setInterval(() => {
          if(selectedDateIndex < this.dates.length - 1) {
            this.onSelectDate(this.dates[selectedDateIndex + 1]);
            selectedDateIndex++;
          } else {
            this.onSelectDate(this.dates[0]);
            selectedDateIndex = 0;
          }
        }, 5000);
      } else {
        clearInterval(this.animationInterval);
      }


      this.isAnimationPlaying = !this.isAnimationPlaying;
    }

  // Method to move to the first date
  goToBeginning(): void {
    if (this.dates.length > 0) {
      const selection = this.dates[0];
      this.onSelectDate(selection);
    }
  }

  // Method to move to the last date
  goToEnd(): void {
    if (this.dates.length > 0) {
      const selection = this.dates[this.dates.length - 1];
      this.onSelectDate(selection);
    }
  }

  // Method to move to the previous date
  goBackward(): void {
    if (this.selectedDate && this.dates.length > 0) {
      const currentIndex = this.dates.indexOf(this.selectedDate);
      if (currentIndex > 0) {
        const selected = this.dates[currentIndex - 1];
        this.onSelectDate(selected);
      }
    }
  }

  // Method to move to the next date
  goForward(): void {
    if (this.selectedDate && this.dates.length > 0) {
      const currentIndex = this.dates.indexOf(this.selectedDate);
      if (currentIndex < this.dates.length - 1) {
        const selected = this.dates[currentIndex + 1];
        this.onSelectDate(selected);
      }
    }
  }
}
