import { Routes } from '@angular/router';
import { MapComponent } from './map/map.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth/auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent }, // Ensure no leading slash
  {
    path: '',
    component: MapComponent,
    canActivate: [AuthGuard], // AuthGuard applied only here
  },
  { path: '**', redirectTo: 'login', pathMatch: 'full' }, // Ensure this is at the end
];
