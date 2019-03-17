import { Component, OnInit, Input } from '@angular/core';
import { EventDTO } from 'src/DTOs/event-dto';
import { EventService } from 'src/services/event.service';
import { BaseComponent } from '../base/base.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-events-list',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.css']
})

export class EventsListComponent extends BaseComponent implements OnInit {
  public eventsDTOs: EventDTO[];
  constructor(private toast: ToastrService, private eventService: EventService) {
    super(toast);
  }

  ngOnInit() {
    this.eventService.getMyEvents()
      .subscribe(x => { this.eventsDTOs = x ;console.log(x)}, x => this.toast.error('Couldn\'t load my events'));
  }

}
