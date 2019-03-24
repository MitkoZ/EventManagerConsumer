import { Component, OnInit } from '@angular/core';
import { EventDTO } from 'src/DTOs/event-dto';
import { EventService } from 'src/services/event.service';
import { BaseComponent } from '../base/base.component';
import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';
import { SimpleModalService } from 'ngx-simple-modal';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-events-list',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.css']
})

export class EventsListComponent extends BaseComponent implements OnInit {
  public eventsDTOs: EventDTO[];

  constructor(toastService: ToastrService, private eventService: EventService, private simpleModalService: SimpleModalService) {
    super(toastService);
  }

  ngOnInit() {
    this.eventService.getMyEvents()
      .subscribe(x => this.eventsDTOs = x,
        x => this.toastService.error('Couldn\'t load my events'));
  }

  public showConfirmation(eventName: String, id: Number): void {
    this.simpleModalService.addModal(ConfirmModalComponent, {
      title: 'Delete Event',
      message: `Are you sure you want to delete event with name ${eventName}?`
    })
      .subscribe((isConfirmed) => {
        //We get modal result
        if (isConfirmed) {
          this.eventService.delete(id)
            .subscribe(x => {
              this.toastService.success('Event deleted successfully');
              this.deleteEventFromFrontEnd(id);
            },
              x => this.toastService.error('Coudnl\'t delete this event'));
        }
      });
  }

  private deleteEventFromFrontEnd(id: Number): void {
    this.eventsDTOs = this.eventsDTOs.filter(x => x.id != id);
  }
}
