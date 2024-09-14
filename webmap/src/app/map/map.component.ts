import { Component, AfterViewInit, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
  standalone: true,
  imports: [CommonModule, HttpClientModule],
})
export class MapComponent implements AfterViewInit {

  private GEOSERVER_URL : string = 'http://88.231.222.119:8080/geoserver/tmet/wms';
  private map!: L.Map;
  layerAvailability: AvilableLayer[] = [];

  constructor(private http: HttpClient) {
    console.log('constructor');
  }

  ngAfterViewInit(): void {
    console.log('ngAfterViewInit');
    this.initMap();
    this.getAvailableDates();

    this.map.on('click', this.onMapClick.bind(this));
  }

  private getAvailableDates(): void {
    console.log('getAvailableDates');

    this.http.get(this.GEOSERVER_URL + "?service=WMS&request=GetCapabilities", { responseType: 'text' }).subscribe((response) => {
      this.extractLayerAvailability(response);
      const layerSelected = this.layerAvailability[2];
      L.tileLayer.wms(this.GEOSERVER_URL, {
        layers: `tmet:${layerSelected.Name}`,
        format: 'image/png',
        transparent: true,
        opacity: 0.8,
        DIM_MISSION: layerSelected.Mission![1],
        DIM_CHANNEL: layerSelected.Channel,
      } as any).addTo(this.map);
    });
  }

  private extractLayerAvailability(xmlString: string): void {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlString, 'application/xml');

    const layers = xmlDoc.getElementsByTagName('Layer');

    for (let i = 0; i < layers.length; i++) {
      const nameElement = layers[i].getElementsByTagName('Name')[0];
      if (nameElement) {
        const availableLayer: AvilableLayer = {
            Name: nameElement.textContent ?? '',
            Mission: undefined,
            Time: undefined,
            Channel: undefined,
          };


        const extentElements = layers[i].getElementsByTagName('Dimension');
        for (let j = 0; j < extentElements.length; j++) {
          const extentElement = extentElements[j];
          if (extentElement.getAttribute('name') === 'time') {
            const time = extentElement.textContent;
            if (time) {
              const timeArray = time.split(',');
              availableLayer.Time = timeArray.map((dateString) => new Date(dateString));
            }
          }

          if (extentElement.getAttribute('name') === 'CHANNEL') {
            availableLayer.Channel = extentElement.textContent ?? '';
          }

          if (extentElement.getAttribute('name') === 'MISSION') {
            availableLayer.Mission = extentElement.textContent?.split(',') ?? [];
          }
        }
        this.layerAvailability.push(availableLayer);
      }
    }
    console.log('Available Dates:', this.layerAvailability);
  }

  private initMap(): void {

    const osmLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
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

    L.control.layers(baseMaps).addTo(this.map);
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
  Channel: string | undefined;
}
