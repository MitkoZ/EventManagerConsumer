import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';

import { FormsModule } from '@angular/forms'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from "./../components/login/login.component"
import { EventsListComponent } from './../components/events-list/events-list.component';
import { EventCreateUpdateComponent } from './../components/event-create-update/event-create-update.component';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';
import { AuthInterceptor } from 'src/httpInterceptors/auth-interceptor';

import { ReactiveFormsModule } from '@angular/forms';

import { Ng2FlatpickrModule } from 'ng2-flatpickr';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    EventsListComponent,
    EventCreateUpdateComponent
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
    Ng2FlatpickrModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
