import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { MapComponent } from './components/map/map.component';
import { PassengerProfileComponent } from './components/passenger-profile/passenger-profile.component';
import { MapUnregisteredComponent } from './components/map-unregistered/map-unregistered.component';
import { BillingComponent } from './components/billing/billing.component';
import { CurrentDrivePessangerComponent } from './components/current-drive-pessanger/current-drive-pessanger.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    LoginComponent,
    RegistrationComponent,
    MapComponent,
    PassengerProfileComponent,
    MapUnregisteredComponent,
    BillingComponent,
    CurrentDrivePessangerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
