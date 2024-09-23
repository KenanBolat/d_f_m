import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LayerData } from './tmet-backend.service';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private distinctMissions = new BehaviorSubject<string[] | null>(null);
  private selectedDate = new BehaviorSubject<string | null>(null);
  private selectedChannel = new BehaviorSubject<string | null>(null);
  private selectedMission = new BehaviorSubject<string | null>(null);
  private allData = new BehaviorSubject<LayerData[] | null>(null);
  private menuOpen = new BehaviorSubject<boolean>(false);
  private animationValue = new BehaviorSubject<number | null>(null);

  distinctMissions$ = this.distinctMissions.asObservable();
  selectedDate$ = this.selectedDate.asObservable();
  selectedChannel$ = this.selectedChannel.asObservable();
  selectedMission$ = this.selectedMission.asObservable();
  allData$ = this.allData.asObservable();
  menuOpen$ = this.menuOpen.asObservable();
  animationValue$ = this.animationValue.asObservable();

  setAllData(data: LayerData[]){
    this.allData.next(data);
  }

  setSelectedMission(data: string | null){
    this.selectedMission.next(data);
  }

  setDistinctMissions(data: string[]){
    this.distinctMissions.next(data);
  }

  setSelectedDate(data: string){
    this.selectedDate.next(data);
  }

  setSelectedChannel(data: string){
    this.selectedChannel.next(data);
  }

  setMenuToggle(){
    this.menuOpen.next(!this.menuOpen.value);
  }

  setAnimationValue(data: number){
    this.animationValue.next(data);
  }
}
