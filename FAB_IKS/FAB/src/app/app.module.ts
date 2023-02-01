import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { PassengerProfileComponent } from './components/passenger-profile/passenger-profile.component';
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
import { NavbarUnregisteredUserComponent } from './components/navbar-unregistered-user/navbar-unregistered-user.component';
import { NavbarPassengerComponent } from './components/navbar-passenger/navbar-passenger.component';
import { NavbarDriverComponent } from './components/navbar-driver/navbar-driver.component';
import { NavbarAdminComponent } from './components/navbar-admin/navbar-admin.component';
import { RideDetailsComponent } from './components/map/ride-details/ride-details.component';
import { IncomingRidesPassengerComponent } from './components/incoming-rides-passenger/incoming-rides-passenger.component';
import { IncomingRidesDriverComponent } from './components/incoming-rides-driver/incoming-rides-driver.component';
import { ReportsAdminComponent } from './components/reports-admin/reports-admin.component';
import { ChangeDriversInfoComponent } from './components/change-drivers-info/change-drivers-info.component';
import { NotificationsPassengerComponent } from './components/notifications-passenger/notifications-passenger.component';
import { NotificationsDriverComponent } from './components/notifications-driver/notifications-driver.component';
import { NotificationsAdminComponent } from './components/notifications-admin/notifications-admin.component';
import { DriverProfileEditComponent } from './components/driver-profile-edit/driver-profile-edit.component';
import { MatSelectModule } from '@angular/material/select';
import { PassengerProfileEditComponent } from './components/passenger-profile-edit/passenger-profile-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    LoginComponent,
    RegistrationComponent,
    PassengerProfileComponent,
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
    NavbarUnregisteredUserComponent,
    NavbarPassengerComponent,
    NavbarDriverComponent,
    NavbarAdminComponent,
    RideDetailsComponent,
    IncomingRidesPassengerComponent,
    IncomingRidesDriverComponent,
    ReportsAdminComponent,
    ChangeDriversInfoComponent,
    NotificationsPassengerComponent,
    NotificationsDriverComponent,
    NotificationsAdminComponent,
    DriverProfileEditComponent,
    PassengerProfileEditComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    MatSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
