import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { AppConfigService } from './app-config.service';

export interface LayerData {
  id: number;
  layername: string;
  channel: string;
  mission: string;
  time: string;
  downloadid: string;
}

@Injectable({
  providedIn: 'root',
})
export class TmetBackendService {
  private API_URL: string

  constructor(private http: HttpClient, private configService: AppConfigService) {
    this.API_URL = this.configService.get('API_URL');
  }

  getAllLayers(): Observable<LayerData[]> {
    return this.http.get<LayerData[]>(`${this.API_URL}/api/get_geoserver_data/`);
  }

  getDummyLayers(): Observable<LayerData[]> {
    const dummyData: LayerData[] = [
      {id: 1, layername: 'rgb', channel: 'natural_color', mission: 'MSG',  time: '2023-08-14T06:30:00.000Z', downloadid: 'http://88.231.222.119:8000/api/file/747/download/'},
      {id: 1, layername: 'rgb', channel: 'natural_color', mission: 'MSG',  time: '2023-08-14T06:15:00.000Z', downloadid: 'http://88.231.222.119:8000/api/file/705/download/'},
      {id: 1, layername: 'rgb', channel: 'natural_color', mission: 'MSG',  time: '2023-08-14T06:00:00.000Z', downloadid: 'http://88.231.222.119:8000/api/file/657/download/'},
      {id: 1, layername: 'rgb', channel: 'natural_color', mission: 'IODC', time: '2023-08-14T06:45:00.000Z', downloadid: 'http://88.231.222.119:8000/api/file/614/download/'},
      {id: 1, layername: 'rgb', channel: 'natural_color', mission: 'MSG',  time: '2023-08-14T06:45:00.000Z', downloadid: 'http://88.231.222.119:8000/api/file/657/download/'},

  ];
    return of(dummyData);
  }
}
