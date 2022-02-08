import { Routes } from '@angular/router';
import { BasketComponent } from './core/feature/basket/basket.component';
import { HomeComponent } from './core/feature/home/home.component';

export const APP_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'flight-booking',
    loadChildren: () => import('./flight-booking/flight-booking.module')
      .then(esm => esm.FlightBookingModule)
  },
  {
    path: 'passenger-manager',
    loadChildren: () => import('./passenger-manager/passenger-manager.module')
      .then(esm => esm.PassengerManagerModule)
  },
  {
    path: 'basket',
    component: BasketComponent,
    outlet: 'aux'
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];
