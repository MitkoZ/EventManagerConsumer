import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { EventDTO } from 'src/DTOs/event-dto';
import { EventService } from 'src/services/event.service'
import { ActivatedRoute } from '@angular/router';
import { Helper } from 'src/utils/helper';

@Component({
  selector: 'app-event-create-update',
  templateUrl: './event-create-update.component.html',
  styleUrls: ['./event-create-update.component.css']
})

export class EventCreateUpdateComponent extends BaseComponent implements OnInit {
  public createUpdateFormGroup: FormGroup;
  public startDateTimePickerConfig = {
    min: new Date(),
    firstDayOfWeek: 1,
    hour12Timer: true
  };

  public endDateTimePickerConfig = Object.assign({}, this.startDateTimePickerConfig);;

  constructor(toastr: ToastrService, private formBuilder: FormBuilder, private eventService: EventService, private route: ActivatedRoute) {
    super(toastr);
    const id = Number(this.route.snapshot.paramMap.get('id'));
    debugger;
    if (id != 0) { // an event with id exists in the database
      eventService.getEvent(id)
        .subscribe(x => this.setFields(x),
          httpErrorResponse => this.showError(httpErrorResponse));
    }
    else { // initialize date fields with the current time
      this.initializeEndDate(this.startDateTimePickerConfig.min);
    }
  }

  private initializeEndDate(startDateTime: Date): void {
    this.endDateTimePickerConfig.min = new Date(startDateTime.getTime());
    this.endDateTimePickerConfig.min.setMinutes(this.endDateTimePickerConfig.min.getMinutes() + 5);
  }

  private setFields(eventDTO: EventDTO): void {
    eventDTO = new EventDTO(eventDTO);
    eventDTO.startDateTime = Helper.convertUTCDateToLocalDate(new Date(eventDTO.startDateTime));
    eventDTO.endDateTime = Helper.convertUTCDateToLocalDate(new Date(eventDTO.endDateTime));

    this.createUpdateFormGroup.patchValue({
      id: eventDTO.id,
      name: eventDTO.name,
      location: eventDTO.location,
      startDateTime: eventDTO.startDateTime,
      endDateTime: eventDTO.endDateTime
    });

    this.startDateTimePickerConfig.min = new Date(eventDTO.startDateTime);
    this.endDateTimePickerConfig.min = new Date(eventDTO.endDateTime);
  }

  ngOnInit() {
    this.createUpdateFormGroup = this.formBuilder.group({
      id: 0,
      name: ['', Validators.required],
      location: ['', Validators.required],
      startDateTime: ['', Validators.required],
      endDateTime: ['', Validators.required]
    }
    );
  }


  public save(): void {
    if (!this.createUpdateFormGroup.valid) {
      return;
    }
    debugger;
    let eventDTO: EventDTO = new EventDTO(this.createUpdateFormGroup.value);

    this.eventService.save(eventDTO).
      subscribe(httpResponse =>
        this.showSuccess('Event saved successfully'),
        httpErrorResponse => this.showError(httpErrorResponse));
  }
}
