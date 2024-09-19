import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LayerData } from './tmet-backend.service';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private availableMissions = new BehaviorSubject<string[] | null>(null);
  private selectedDate = new BehaviorSubject<string | null>(null);
  private selectedChannel = new BehaviorSubject<string | null>(null);
  private selectedMission = new BehaviorSubject<string | null>(null);
  private allData = new BehaviorSubject<LayerData[] | null>(null);

  availableMissions$ = this.availableMissions.asObservable();
  selectedDate$ = this.selectedDate.asObservable();
  selectedChannel$ = this.selectedChannel.asObservable();
  selectedMission$ = this.selectedMission.asObservable();
  allData$ = this.allData.asObservable();

  setAllData(data: LayerData[]){
    this.allData.next(data);
  }

  setSelectedMission(data: string | null){
    this.selectedMission.next(data);
  }

  setSelectedMissions(data: string[]){
    this.availableMissions.next(data);
  }

  setSelectedDate(data: string){
    this.selectedDate.next(data);
  }

  setSelectedChannel(data: string){
    this.selectedChannel.next(data);
  }
}
