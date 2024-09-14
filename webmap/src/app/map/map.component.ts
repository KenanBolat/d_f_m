import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
  standalone: true,
})
export class MapComponent implements AfterViewInit {
  private map!: L.Map;

  constructor() {
    console.log('constructor');
  }

  ngAfterViewInit(): void {
    console.log('ngAfterViewInit');
    this.initMap();

    this.map.on('click', this.onMapClick.bind(this));
  }

  private initMap(): void {
    this.map = L.map('map', {
      center: [39.0, 35.0],
      zoom: 6,
      maxZoom: 18,
      minZoom: 3,
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      detectRetina: true,
      attribution: '&copy; OpenStreetMap contributors',
    });

    tiles.addTo(this.map);
  }

  private onMapClick(e: L.LeafletMouseEvent): void {
    const { lat, lng } = e.latlng;
    console.log(`Map clicked at latitude: ${lat}, longitude: ${lng}`);
  }

}
