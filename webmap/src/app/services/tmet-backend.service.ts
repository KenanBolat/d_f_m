import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

export interface LayerData {
  layername: string;
  channel: string;
  mission: string;
  time: string;
  download: string;
}

@Injectable({
  providedIn: 'root',
})
export class TmetBackendService {
  private apiUrl = '/get-all-layers'; // The endpoint URL

  constructor(private http: HttpClient) {}

  getAllLayers(): Observable<LayerData[]> {
    return this.getDummyLayers();
  }

  getDummyLayers(): Observable<LayerData[]> {
    const dummyData: LayerData[] = [
      {layername: 'rgb', channel: 'natural_color', mission: 'MSG',  time: '2023-08-14T06:30:00.000Z', download: 'http://88.231.222.119:8000/api/file/747/download/'},
      {layername: 'rgb', channel: 'natural_color', mission: 'MSG',  time: '2023-08-14T06:15:00.000Z', download: 'http://88.231.222.119:8000/api/file/705/download/'},
      {layername: 'rgb', channel: 'natural_color', mission: 'MSG',  time: '2023-08-14T06:00:00.000Z', download: 'http://88.231.222.119:8000/api/file/657/download/'},
      {layername: 'rgb', channel: 'natural_color', mission: 'IODC', time: '2023-08-14T06:45:00.000Z', download: 'http://88.231.222.119:8000/api/file/614/download/'},
      {layername: 'rgb', channel: 'natural_color', mission: 'MSG',  time: '2023-08-14T06:45:00.000Z', download: 'http://88.231.222.119:8000/api/file/657/download/'},

  ];
    return of(dummyData);
  }
}
