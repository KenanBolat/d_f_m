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
  filename: string;
  area_of_interest: string;
  static_image: string;
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
}
