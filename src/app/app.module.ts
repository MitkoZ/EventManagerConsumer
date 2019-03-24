import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from "./../components/login/login.component"
import { EventsListComponent } from "./../components/events-list/events-list.component";
import { EventCreateUpdateComponent } from './../components/event-create-update/event-create-update.component';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';
import { AuthInterceptor } from 'src/httpInterceptors/auth-interceptor';

import { ReactiveFormsModule } from '@angular/forms';

import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { SimpleModalModule } from 'ngx-simple-modal';
import { ConfirmModalComponent } from '../components/confirm-modal/confirm-modal.component';
import { RegisterComponent } from '../components/register/register.component';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { HomeComponent } from '../components/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    EventsListComponent,
    EventCreateUpdateComponent,
    ConfirmModalComponent,
    RegisterComponent,
    NavbarComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot({ 'positionClass': 'toast-top-center' }), // ToastrModule added
    ReactiveFormsModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    SimpleModalModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  entryComponents: [
    ConfirmModalComponent
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
