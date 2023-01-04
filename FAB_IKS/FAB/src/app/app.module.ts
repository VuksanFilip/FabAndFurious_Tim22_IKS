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
import { CurrentDrivePessangerComponent } from './components/current-drive-pessanger/current-drive-pessanger.component';
import { CurrentDriveDriverComponent } from './components/current-drive-driver/current-drive-driver.component';
import { MapRegisteredComponent } from './components/map/map-registered/map-registered.component';
import { MapUnregisteredComponent } from './components/map/map-unregistered/map-unregistered.component';
import { DriverProfileComponent } from './components/driver-profile/driver-profile.component';

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
