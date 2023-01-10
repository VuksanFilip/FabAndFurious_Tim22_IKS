import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { PassengerProfileComponent } from './components/passenger-profile/passenger-profile.component';
import { BillingComponent } from './components/billing/billing.component';
import { CurrentDrivePessangerComponent } from './components/map/current-drive-pessanger/current-drive-pessanger.component';
import { CurrentDriveDriverComponent } from './components/map/current-drive-driver/current-drive-driver.component';
import { MapRegisteredComponent } from './components/map/map-registered/map-registered.component';
import { MapUnregisteredComponent } from './components/map/map-unregistered/map-unregistered.component';
import { DriverProfileComponent } from './components/driver-profile/driver-profile.component';
import { AddDriverComponent } from './components/add-driver/add-driver.component';
import { MapAdminComponent } from './components/map/map-admin/map-admin.component';
import { HistoryPassengerComponent } from './components/map/history-passenger/history-passenger.component';
import { FavoritesPassengerComponent } from './components/map/favorites-passenger/favorites-passenger.component';
import { HistoryDriverComponent } from './components/map/history-driver/history-driver.component';
import { ReportsComponent } from './components/reports/reports.component';
import { AdminProfileComponent } from './components/admin-profile/admin-profile.component';
import { ReportComponent } from './components/report/report.component';
import { ReportsPassengerComponent } from './components/reports-passenger/reports-passenger.component';
import { PassengerNavbarComponent } from './components/passenger-navbar/passenger-navbar.component';
import { DriverNavbarComponent } from './components/driver-navbar/driver-navbar.component';
import { AdminNavbarComponent } from './components/admin-navbar/admin-navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    LoginComponent,
    RegistrationComponent,
    PassengerProfileComponent,
    BillingComponent,
    CurrentDrivePessangerComponent,
    CurrentDriveDriverComponent,
    MapRegisteredComponent,
    MapUnregisteredComponent,
    DriverProfileComponent,
    AddDriverComponent,
    MapAdminComponent,
    HistoryPassengerComponent,
    FavoritesPassengerComponent,
    HistoryDriverComponent,
    ReportsComponent,
    AdminProfileComponent,
    ReportComponent,
    ReportsPassengerComponent,
    PassengerNavbarComponent,
    DriverNavbarComponent,
    AdminNavbarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
