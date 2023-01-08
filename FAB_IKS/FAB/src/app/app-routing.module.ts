import { MapAdminComponent } from './components/map/map-admin/map-admin.component';
import { AddDriverComponent } from './components/add-driver/add-driver.component';
import { BillingComponent } from './components/billing/billing.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { PassengerProfileComponent } from './components/passenger-profile/passenger-profile.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { CurrentDrivePessangerComponent } from './components/map/current-drive-pessanger/current-drive-pessanger.component';
import { CurrentDriveDriverComponent } from './components/map/current-drive-driver/current-drive-driver.component';
import { MapRegisteredComponent } from './components/map/map-registered/map-registered.component';
import { MapUnregisteredComponent } from './components/map/map-unregistered/map-unregistered.component';
import { DriverProfileComponent } from './components/driver-profile/driver-profile.component';
import { HistoryPassengerComponent } from './components/map/history-passenger/history-passenger.component';
import { FavoritesPassengerComponent } from './components/map/favorites-passenger/favorites-passenger.component';
import { HistoryDriverComponent } from './components/map/history-driver/history-driver.component';
import { ReportsComponent } from './components/reports/reports.component';
import { AdminProfileComponent } from './components/admin-profile/admin-profile.component';
import { ReportComponent } from './components/report/report.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'billing', component: BillingComponent },
  {
    path: 'current-drive-passenger',
    component: CurrentDrivePessangerComponent,
  },
  { path: 'map', component: MapRegisteredComponent },
  { path: 'map-unregistered', component: MapUnregisteredComponent },
  { path: 'passenger-profile', component: PassengerProfileComponent },
  { path: 'driver-profile', component: DriverProfileComponent },
  { path: 'add-driver', component: AddDriverComponent },
  { path: 'current-drive-driver', component: CurrentDriveDriverComponent },
  { path: 'map-admin', component: MapAdminComponent },
  { path: 'history-passenger', component: HistoryPassengerComponent },
  { path: 'favorites-passenger', component: FavoritesPassengerComponent },
  { path: 'history-driver', component: HistoryDriverComponent },
  { path: 'reports', component: ReportsComponent },
  { path: 'admin-profile', component: AdminProfileComponent },
  { path: 'report', component: ReportComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
