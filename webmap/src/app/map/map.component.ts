import { Component, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import * as L from 'leaflet';
import { IMAGE_FORMAT, LAYER_NAME_DICTIONARY} from './map-constants';
import { LayerData, TmetBackendService } from '../services/tmet-backend.service';
import { AvailableDatesComponent } from "../available-dates/available-dates.component";
import { HeaderComponent } from "../header/header.component";
import { SharedService } from '../services/shared.service';
import { AppConfigService } from '../services/app-config.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
  standalone: true,
  imports: [CommonModule, HttpClientModule, AvailableDatesComponent, HeaderComponent, MatToolbarModule,
    MatSidenavModule, MatCheckboxModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule],
})
export class MapComponent implements AfterViewInit {

  private GEOSERVER_URL:string;;
  private API_URL: string;
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
  addedPngLayer : L.ImageOverlay | null = null;

  mouseCoordinates: string | null = null;

  constructor(
    private http: HttpClient,
    private tmetBackendService: TmetBackendService,
    private sharedService: SharedService,
    private cdr: ChangeDetectorRef,
    private appConfigService: AppConfigService) {
      this.GEOSERVER_URL = this.appConfigService.get('MAP_URL');
      this.API_URL = this.appConfigService.get('API_URL');
  }

  ngAfterViewInit(): void {
    console.log('ngAfterViewInit');
    this.initMap();

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

    this.map.on('mousemove', (e: L.LeafletMouseEvent) => {
      const lat = parseFloat(e.latlng.lat.toFixed(2));
      const lng = parseFloat(e.latlng.lng.toFixed(2));

      // Format coordinates as degrees
      this.mouseCoordinates = `${Math.abs(lng)}°${lng >= 0 ? 'E' : 'W'}, ${Math.abs(lat)}°${lat >= 0 ? 'N' : 'S'}`;


    });

    this.getLayerData();

    // this getLayerData every 4 * 60 seconds
    setInterval(() => {
      this.getLayerData();
    }, 4 * 60_000);
  }

  private getLayerData(): void {
    this.tmetBackendService.getAllLayers().subscribe((data) => {
      this.layers = data;

      // Extract the distinct time values
      this.distinctTimes = this.getDistinctTimes(data);
      this.distinctChannels = this.getDistinctChannels(data);
      this.distinctMissions = this.getDistinctMissions(data);

      this.sharedService.setAllData(data);
      this.sharedService.setDistinctMissions(this.distinctMissions);
    });

    console.log(`Layer (${this.layers.length})data: ${this.layers}`);
  }

  private getDistinctTimes(data: any[]): string[] {
    const timesSet = new Set(data.map(layer => layer.time));
    return Array.from(timesSet).sort();
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
    this.addedLayer = L.tileLayer.wms(this.GEOSERVER_URL, {
      layers: `tmet:${LAYER_NAME_DICTIONARY.get(channel)}`,
      format: IMAGE_FORMAT,
      transparent: true,
      opacity: 0,
      DIM_MISSION: mission,
      DIM_CHANNEL: channel,
      time: time.replace(':00Z', ':000Z'),
      zIndex: 1000
    } as any);
    const foundLayer = this.layers.find(
      (data) => data.time === time && data.channel === channel && data.mission === mission
    );

    if (!foundLayer) {
      console.error('No layer found for the selected mission, channel and time.');
      return;
    }

    const latlongBounds = JSON.parse(foundLayer.area_of_interest) as [number, number][];
    let imageUrl = `${this.API_URL}${foundLayer.static_image}`;

    // Preload the image due to slow loading times
    const img = new Image();
    img.onload = () => {
      const newLayer = L.imageOverlay(imageUrl, latlongBounds, {
        opacity: 0.5,
        alt: foundLayer.layername,
        interactive: true,
        zIndex: 1100,
      }).addTo(this.map);

      if (this.addedPngLayer) {
        this.map.removeLayer(this.addedPngLayer);
      }

      this.addedPngLayer = newLayer;
    };

    img.onerror = () => {
      console.error('Failed to load the image.');
    };

    // Start loading the image
    img.src = imageUrl;

    this.updateLegendGraphic(this.addedLayer);
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

    const cartoDb = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      maxZoom: 19,
      detectRetina: true,
      attribution: '&copy; OpenStreetMap contributors',
    });

    const cartoDBDark = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      maxZoom: 19,
      detectRetina: true,
      attribution: '&copy; OpenStreetMap contributors',
    });

    const noBasemapLayer = L.layerGroup();

    const baseMaps = {
      'OpenStreetMap': osmLayer,
      'CartoDB': cartoDb,
      'CartoDB Dark': cartoDBDark,
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
    const latlng = e.latlng;
    const point = this.map.latLngToContainerPoint(latlng);

    const url = this.buildGetFeatureInfoUrl(this.addedLayer!, latlng, point);

    this.getInfoFromLayer(url, latlng);
  }

  private getInfoFromLayer(url: string, latlng: L.LatLng): void {
    fetch(url)
      .then((response) => response.text())
      .then((data) => {
        L.popup()
          .setLatLng(latlng)
          .setContent(`<strong>Info:</br><em>${latlng.lng.toFixed(2)}, ${latlng.lat.toFixed(2)}</em><br />${data}</strong>`)
          .openOn(this.map);
      })
      .catch((error) => {
        console.error('Error fetching feature info:', error);
      });
  }

  private buildGetFeatureInfoUrl(layer: L.TileLayer.WMS, latlng: L.LatLng, point: L.Point): string {
    const mapSize = this.map.getSize();
    const bounds = this.map.getBounds();

    const bbox = bounds.toBBoxString();

    const params: any = {
      request: 'GetFeatureInfo',
      service: 'WMS',
      crs: 'EPSG:4326',
      styles: '',
      transparent: layer.wmsParams.transparent,
      version: '1.3.0',
      format: layer.wmsParams.format,
      bbox: bbox,
      height: mapSize.y,
      width: mapSize.x,
      layers: layer.wmsParams.layers,
      query_layers: layer.wmsParams.layers,
      info_format: 'text/html',
      DIM_MISSION: this.selectedMission,
      DIM_CHANNEL: this.selectedChannel,
      time: this.selectedTime,
      i: point.x.toFixed(0),
      j: point.y.toFixed(0)
    };

    const baseUrl = this.GEOSERVER_URL;
    const queryString = Object.keys(params)
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
      .join('&');

    return `${baseUrl}?${queryString}`;
  }

  private buildGetLegendGraphicUrl(layer: L.TileLayer.WMS): string {
    const params: any = {
      request: 'GetLegendGraphic',
      service: 'WMS',
      crs: 'EPSG:4326',
      styles: '',
      transparent: layer.wmsParams.transparent,
      version: '1.3.0',
      format: layer.wmsParams.format,
      layer: layer.wmsParams.layers,
      DIM_MISSION: this.selectedMission,
      DIM_CHANNEL: this.selectedChannel,
      time: this.selectedTime,
      legend_options: 'forceLabels:on'
    };

    const baseUrl = this.GEOSERVER_URL;
    const queryString = Object.keys(params)
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
      .join('&');

    return `${baseUrl}?${queryString}`;
  }

  private updateLegendGraphic(layer: L.TileLayer.WMS): void {

    const legend = document.getElementById('legend');
    legend!.innerHTML = '<h4>Legend</h4><p>Loading...</p>';
    const url = this.buildGetLegendGraphicUrl(layer);

    fetch(url)
      .then((response) => response.blob())
      .then((data) => {
        const url = URL.createObjectURL(data);
        if (legend) {
          legend.innerHTML =
          `<h4>Legend</h4>
          <h5>${this.selectedTime} - ${this.selectedChannel} - ${this.selectedMission}</h5>
          <h5>Copyright: ${new Date().getFullYear()}, NextHops</h5>
          <img src="${url}" alt="legend" />
          <img src="assets/tmet_logo.png" alt="mini-logo-tmet" class="legend-img" style="width: 40px; float: right" />`;
        }
      })
      .catch((error) => {
        console.error('Error fetching legend:', error);
      });

  }
}

interface AvilableLayer {
  Name: string;
  Mission: string[] | undefined;
  Time: Date [] | undefined;
  Channel: string [] | undefined | null;
}
