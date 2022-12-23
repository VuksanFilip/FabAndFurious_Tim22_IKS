import { MapComponent } from './components/map/map.component';
import { MapUnregisteredComponent } from './components/map-unregistered/map-unregistered.component';
import { BillingComponent } from './components/billing/billing.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { PassengerProfileComponent } from './components/passenger-profile/passenger-profile.component';
import { RegistrationComponent } from './components/registration/registration.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'map', component: MapComponent },
  { path: 'map-unregistered', component: MapUnregisteredComponent },
  { path: 'billing', component: BillingComponent },
  { path: 'profile', component: PassengerProfileComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
