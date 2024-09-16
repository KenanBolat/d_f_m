import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppConfigService {
  private config: any;

  constructor(private http: HttpClient) {}

  // Method to load config.json file from assets
  loadConfig(): Promise<void> {
    return firstValueFrom(this.http.get('/assets/config.json'))
      .then((configData) => {
        this.config = configData;
        console.log('Config loaded', this.config);
      })
      .catch((error) => {
        console.error('Could not load config.json', error);
      });
  }

  get(key: string): any {
    return this.config ? this.config[key] : null;
  }
}
