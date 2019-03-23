import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from '../components/login/login.component'
import { EventsListComponent } from 'src/components/events-list/events-list.component';
import { EventCreateUpdateComponent } from 'src/components/event-create-update/event-create-update.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'events-list', component: EventsListComponent },
  { path: 'event-create-update', component: EventCreateUpdateComponent },
  { path: 'event-create-update/:id', component: EventCreateUpdateComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
