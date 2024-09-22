import { AfterContentInit, AfterViewInit, ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayerData } from '../services/tmet-backend.service';
import { SharedService } from '../services/shared.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faStepBackward, faStepForward, faFastBackward, faFastForward, faDownload, faSpinner, faPlay } from '@fortawesome/free-solid-svg-icons';
import { aoiChannels } from '../map/map-constants';
import { FormsModule } from '@angular/forms';
import { AnimationSelectionModes } from './available-dates-constants';
import { AppConfigService } from '../services/app-config.service';

@Component({
  selector: 'app-available-dates',
  templateUrl: './available-dates.component.html',
  styleUrls: ['./available-dates.component.css'],
  imports: [CommonModule, FontAwesomeModule, FormsModule],
  standalone: true,
})
export class AvailableDatesComponent implements AfterContentInit, AfterViewInit {
  API_URL: string = '';

  dates: string[] = [];
  availableDates: string[] = [];
  allData : LayerData[] = [];

  isAnimationPlaying: boolean = false;
  animationInterval: any;
  runningAnimationDate: string | null = null;

  isDownloading: boolean = false;

  isUserSelectedButton: boolean = false;
  availableAoiChannels : string[] = [];
  selectedAoiChannel: string | null = null;

  selectedChannel: string | null = null;

  selectedMission: string | null = null;

  selectedDate: string | null = null;
  selectedDates: string[] = [];
  lastSelectedDateIndex: number | null = null;

  isForwardSelectionEnabled: boolean = true;
  isBackwardSelectionEnabled: boolean = true;

  // Font Awesome icons
  faStepBackward = faStepBackward;
  faStepForward = faStepForward;
  faFastBackward = faFastBackward;
  faFastForward = faFastForward;
  faDownload = faDownload;
  faSpinner = faSpinner;


  // Availability flags for the buttons
  isRgbAvailable: boolean = false;
  isCloudAvailable: boolean = false;
  isSingleChannelAvailable: boolean = false;

  // Animation selection modes enum conversion for template
  animationSelectionModesCustom = AnimationSelectionModes.CUSTOM;
  animationSelectionModesLast12 = AnimationSelectionModes.LAST12;
  animationSelectionModesLast30 = AnimationSelectionModes.LAST30;

  // default selection for animation mode (most used)
  selectedAnimationMode: AnimationSelectionModes | null = null;

  // default selection for animation dates
  selectedAnimationDates: string[] = this.dates.sort().reverse().slice(0, 12);

  selectedButton: string | null = null;

  constructor(private sharedService: SharedService, private cdr: ChangeDetectorRef, private appConfigService: AppConfigService) {}
  ngAfterViewInit(): void {
    this.sharedService.allData$.subscribe((freshData) => {
      if(freshData) {
        this.allData = freshData;
        this.onDataUpdateReceived();
        this.cdr.detectChanges();
      }
    });

    // on mission change
    this.sharedService.selectedMission$.subscribe((mission) => {
      this.selectedMission = mission;

      this.dates = this.oderDatesFromAllData(this.allData, this.selectedMission!);

      if(!this.selectedDate || (this.selectedDate && !this.dates.includes(this.selectedDate))) {
        this.onSelectDate(this.dates[0]);
      }

      this.cdr.detectChanges();
    });

    this.sharedService.selectedChannel$.subscribe((channel) => {
      this.selectedChannel = channel;

      this.cdr.detectChanges();
    });

    this.API_URL = this.appConfigService.get('API_URL');
  }

  ngAfterContentInit(): void {
    if (this.dates.length > 0) {
      this.onSelectDate(this.dates[0]);

      this.cdr.detectChanges();
    }
  }

  private oderDatesFromAllData = (layerData : LayerData[], mission: string): string[] => Array.from(
      new Set(
        layerData.filter(
          (data) => data.mission === mission
        )
            .map((data) => data.time)
      )
    )
    .sort()
    .reverse();

  private onDataUpdateReceived() {
    const orderedFreshDates = this.oderDatesFromAllData(this.allData, this.selectedMission!);

    if(this.dates !== orderedFreshDates) {
      this.dates = orderedFreshDates;
    }
  }

  onDatesClick(date: string, event: MouseEvent): void {
    const clickedIndex = this.dates.indexOf(date);

    // Handle Ctrl (Cmd) click for multiple selections
    if (event.ctrlKey || event.metaKey) {
      this.toggleDateSelection(date);
    }

    // Handle Shift click for range selection
    else if (event.shiftKey && this.lastSelectedDateIndex !== null) {
      this.selectRange(this.lastSelectedDateIndex, clickedIndex);
    }

    // Default behavior (single selection)
    else {
      this.selectedDates = [date];
    }

    // Update last selected date index
    this.lastSelectedDateIndex = clickedIndex;
    this.onSelectDate(this.dates[clickedIndex]);
  }

  toggleDateSelection(date: string) {
    const index = this.selectedDates.indexOf(date);
    if (index > -1) {
      // Deselect if already selected
      this.selectedDates.splice(index, 1);
    } else {
      // Select if not already selected
      this.selectedDates.push(date);
    }
  }

  selectRange(startIndex: number, endIndex: number) {
    const [start, end] = startIndex < endIndex ? [startIndex, endIndex] : [endIndex, startIndex];
    const range = this.dates.slice(start, end + 1);

    // Add all dates in the range to the selected list, avoiding duplicates
    this.selectedDates = [...new Set([...this.selectedDates, ...range])];
  }

  // Method to handle date selection
  onSelectDate(date: string): void {
    this.isForwardSelectionEnabled = true;
    this.isBackwardSelectionEnabled = true;

    this.selectedDate = date;
    this.availabilityCheck(this.selectedDate);
    this.sharedService.setSelectedDate(date);

    if(this.selectedDates.length === 0) {
      this.selectedDates = [date];
    }

    if(this.dates[this.dates.length - 1] === this.selectedDate) {
      this.isForwardSelectionEnabled = false;
    }

    if(this.dates[0] === this.selectedDate) {
      this.isBackwardSelectionEnabled = false;
    }
  }

  isSelected = (date: string): boolean => this.selectedDates.includes(date) || this.selectedDate === date;

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

  onAnimationClick() {
    ;
    if(!this.isAnimationPlaying) {
      if(this.selectedAnimationMode == null && this.selectedDates.length <= 1) {
        this.selectedAnimationDates = this.dates;
      } else if(this.selectedAnimationMode == null && this.selectedDates.length > 1) {
        this.selectedAnimationDates = this.selectedDates;
      }

      let selectedDateIndex = this.selectedAnimationDates.indexOf(this.selectedDate!);
      this.runningAnimationDate = this.selectedAnimationDates[selectedDateIndex];

      // start moving forward in every 5 seconds and create a loop
      this.animationInterval = setInterval(() => {
        if(selectedDateIndex < this.selectedAnimationDates.length - 1) {
          this.runningAnimationDate = this.selectedAnimationDates[selectedDateIndex + 1];
          this.onSelectDate(this.runningAnimationDate);
          selectedDateIndex++;
        } else {
          this.runningAnimationDate = this.selectedAnimationDates[0];
          this.onSelectDate(this.runningAnimationDate);
          selectedDateIndex = 0;
        }
      }, 5000);
    } else {
      clearInterval(this.animationInterval);
      this.selectedAnimationDates = [];
      this.runningAnimationDate = null;
    }


    this.isAnimationPlaying = !this.isAnimationPlaying;
  }

  // animation
  onAnimationLast12Click(){
    if(this.selectedAnimationMode === AnimationSelectionModes.LAST12) {
      this.animationClearSelectedDates();
      return;
    }
    this.selectedAnimationMode = AnimationSelectionModes.LAST12;
    this.selectedAnimationDates = this.dates.sort().reverse().slice(0, 12);
    this.selectedDates = this.selectedAnimationDates;
  }

  // animation
  onAnimationLast30Click(){
    if(this.selectedAnimationMode === AnimationSelectionModes.LAST30) {
      this.animationClearSelectedDates();
      return;
    }
    this.selectedAnimationMode = AnimationSelectionModes.LAST30;
    this.selectedAnimationDates = this.dates.sort().reverse().slice(0, 30);
    this.selectedDates = this.selectedAnimationDates;
  }

  private animationClearSelectedDates() {
    this.selectedAnimationMode = null;
    this.selectedAnimationDates = [];
    this.selectedDates = [this.selectedDate!];
  }

  async onDownloadClick() {
    this.isDownloading = true;

    try{
      if(this.selectedDates.length > 1) {
        await this.downloadMultipleFiles();
        return;
      }
      await this.downloadSingleFile();
    } finally{
      this.isDownloading = false;
    }

  }

  private async downloadSingleFile() : Promise<void> {
    try{
      const foundLayer = this.allData.filter((data) => data.time === this.selectedDate && data.channel === this.selectedButton && data.mission === this.selectedMission)[0];
      const url = new URL(this.API_URL + foundLayer.downloadid);
      const response = await fetch(url);
      const blob = await response.blob();
      const objectURL = window.URL.createObjectURL(blob);
      const anchor = document.createElement('a');
      anchor.href = objectURL;
      anchor.download = foundLayer.filename;
      document.body.appendChild(anchor);
      anchor.click();
      document.body.removeChild(anchor);
      window.URL.revokeObjectURL(objectURL);
    } catch (error) {
      console.error('Error during file download:', error);
    }
  }

  private async downloadMultipleFiles(): Promise<void> {
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    const selectedLayers = this.allData.filter(
      (data) =>
        this.selectedDates.includes(data.time) &&
        data.mission === this.selectedMission &&
        data.channel === this.selectedButton
    );

    const links = selectedLayers.map((layer) => {
      return {
        link: layer.downloadid,
        fileName: layer.filename,
      };
    });

    const raw = JSON.stringify({ links });

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow' as RequestRedirect,
    };

    const dateName = `${this.selectedDates[0]
      .replaceAll('-', '')
      .replace('.000Z', '')}-${this.selectedDates[
      this.selectedDates.length - 1
    ]
      .replaceAll('-', '')
      .replace('.000Z', '')}`;

    try {
      const response = await fetch(this.API_URL + '/api/create-zip/', requestOptions);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const blob = await response.blob();

      const link = document.createElement('a');
      const url = window.URL.createObjectURL(blob);
      link.href = url;
      link.download = `${this.selectedMission}_${dateName}_${this.selectedButton}.zip`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error during file download:', error);
    }
    }
  }
