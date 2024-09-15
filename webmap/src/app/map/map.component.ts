import { Component, AfterViewInit, OnInit, ChangeDetectorRef } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import * as L from 'leaflet';
import { GEOSERVER_URL, IMAGE_FORMAT, LAYER_NAME_DICTIONARY} from './map-constants';
import { LayerData, TmetBackendService } from '../services/tmet-backend.service';
import { AvailableDatesComponent } from "../available-dates/available-dates.component";
import { HeaderComponent } from "../header/header.component";
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
  standalone: true,
  imports: [CommonModule, HttpClientModule, AvailableDatesComponent, HeaderComponent],
})
export class MapComponent implements AfterViewInit, OnInit {

  private map!: L.Map;
  layerAvailability: AvilableLayer[] = [];
  layers: LayerData[] = [];
  distinctTimes: string[] = [];
  distinctChannels: string[] = [];
  distinctMissions: string[] = [];

  // selecteds
  selectedTime: string | null = null;
  selectedChannel: string | null = null;
  selectedMission: string | null = null;

  addedLayer : L.TileLayer.WMS | null = null;

  constructor(private http: HttpClient, private tmetBackendService: TmetBackendService, private sharedService: SharedService, private cdr: ChangeDetectorRef) {
  }

  ngOnInit(): void {
      this.getLayerData();
  }

  ngAfterViewInit(): void {
    console.log('ngAfterViewInit');
    this.initMap();
    // this.getAvailableDates();

    this.map.on('click', this.onMapClick.bind(this));

    this.sharedService.selectedMission$.subscribe((mission) => {
      this.selectedMission = mission;
      console.log('Selected mission:', this.selectedMission);
      if (this.selectedChannel && this.selectedTime) {
        this.addWmsLayer(this.selectedMission!, this.selectedChannel!, this.selectedTime!);

        this.cdr.detectChanges();
      }
    });

    this.sharedService.selectedDate$.subscribe((date) => {
      this.selectedTime = date;
      console.log('Selected date:', this.selectedTime);
      if (this.selectedChannel && this.selectedMission) {
        this.addWmsLayer(this.selectedMission!, this.selectedChannel!, this.selectedTime!);

        this.cdr.detectChanges();
      }
    });

    this.sharedService.selectedChannel$.subscribe((channel) => {
      this.selectedChannel = channel;
      console.log('Selected channel:', this.selectedChannel);
      if (this.selectedMission && this.selectedTime) {
        this.addWmsLayer(this.selectedMission!, this.selectedChannel!, this.selectedTime!);

        this.cdr.detectChanges();
      }
    });
  }

  private getLayerData(): void {
    this.tmetBackendService.getDummyLayers().subscribe((data) => {
      this.layers = data;
      console.log('Layers:', this.layers);

      // Extract the distinct time values
      this.distinctTimes = this.getDistinctTimes(data);
      this.distinctChannels = this.getDistinctChannels(data);
      this.distinctMissions = this.getDistinctMissions(data);
    });
  }

  private getDistinctTimes(data: any[]): string[] {
    const timesSet = new Set(data.map(layer => layer.time));
    return Array.from(timesSet);
  }

  private getDistinctChannels(data: any[]): string[] {
    const channelsSet = new Set(data.map(layer => layer.channel));
    return Array.from(channelsSet);
  }

  private getDistinctMissions(data: any[]): string[] {
    const missionsSet = new Set(data.map(layer => layer.mission));
    return Array.from(missionsSet);
  }

  private addWmsLayer(mission: string, channel: string, time: string): void {
    if (this.addedLayer) {
      this.map.removeLayer(this.addedLayer);
    }
    this.addedLayer = L.tileLayer.wms(GEOSERVER_URL, {
      layers: `tmet:${LAYER_NAME_DICTIONARY.get(channel)}`,
      format: IMAGE_FORMAT,
      transparent: true,
      opacity: 0.8,
      DIM_MISSION: mission,
      DIM_CHANNEL: channel,
      time: time,
      zIndex: 1000
    } as any).addTo(this.map);
  }

  private initMap(): void {

    const osmLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      detectRetina: true,
      attribution: '&copy; OpenStreetMap contributors',
    });

    const googleHybrid = L.tileLayer('https://mt{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}', {
      maxZoom: 20,
      subdomains: ['0', '1', '2', '3'],
    });

    const googleSat = L.tileLayer('https://mt{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
      maxZoom: 20,
      subdomains: ['0', '1', '2', '3'],
    });

    const googleTerrain = L.tileLayer('https://mt{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}', {
      maxZoom: 20,
      subdomains: ['0', '1', '2', '3'],
    });

    const googleStreets = L.tileLayer('https://mt{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
      maxZoom: 20,
      subdomains: ['0', '1', '2', '3'],
    });

    const noBasemapLayer = L.layerGroup();

    const baseMaps = {
      'OpenStreetMap': osmLayer,
      'Google Hybrid': googleHybrid,
      'Google Satellite': googleSat,
      'Google Terrain': googleTerrain,
      'Google Streets': googleStreets,
      'No Basemap': noBasemapLayer,
    };

    this.map = L.map('map', {
      center: [39.0, 35.0],
      zoom: 6,
      maxZoom: 18,
      minZoom: 3,
      layers: [osmLayer],
    });

    L.control.layers(baseMaps, {}, {position: 'topleft'}).addTo(this.map);
  }

  private onMapClick(e: L.LeafletMouseEvent): void {
    const { lat, lng } = e.latlng;
    console.log(`Map clicked at latitude: ${lat}, longitude: ${lng}`);
  }

}

interface AvilableLayer {
  Name: string;
  Mission: string[] | undefined;
  Time: Date [] | undefined;
  Channel: string [] | undefined | null;
}
