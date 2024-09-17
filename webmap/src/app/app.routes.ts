import { Routes } from '@angular/router';
import { MapComponent } from './map/map.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth/auth.guard';
import { LoadingComponent } from './loading/loading.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent }, // Ensure no leading slash
  { path: 'loading', component: LoadingComponent, canActivate: [AuthGuard] },
  {
    path: '',
    component: MapComponent,
    canActivate: [AuthGuard], // AuthGuard applied only here
  },
  { path: '**', redirectTo: 'login', pathMatch: 'full' }, // Ensure this is at the end
];
