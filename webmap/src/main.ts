import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { APP_INITIALIZER, importProvidersFrom } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppConfigService } from './app/services/app-config.service';

export function initializeApp(appConfig: AppConfigService) {
  return () => appConfig.loadConfig();
}

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    importProvidersFrom(BrowserAnimationsModule, HttpClientModule),
    AppConfigService,
    {provide: APP_INITIALIZER, useFactory: initializeApp, deps: [AppConfigService], multi: true},
  ],
}).catch((err) => console.error(err));
