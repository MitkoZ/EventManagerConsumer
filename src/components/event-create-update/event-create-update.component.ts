import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { FlatpickrOptions } from 'ng2-flatpickr';
import * as moment from "moment";
import { EventDTO } from 'src/DTOs/event-dto';
import { EventService } from 'src/services/event.service'
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-event-create-update',
  templateUrl: './event-create-update.component.html',
  styleUrls: ['./event-create-update.component.css']
})

export class EventCreateUpdateComponent extends BaseComponent implements OnInit {
  public createUpdateFormGroup: FormGroup;
  public startDateTimeFlatPickrConf: FlatpickrOptions = {
    weekNumbers: true,
    minDate: "today",
    enableTime: true,
    time_24hr: true,
    locale: {
      firstDayOfWeek: 1
    }
  };

  public endDateTimeFlatPickrConf: FlatpickrOptions;
  private timeFormat = 'HH:mm';

  constructor(toastr: ToastrService, private formBuilder: FormBuilder, private eventService: EventService, private route: ActivatedRoute) {
    super(toastr);
    const id = Number(this.route.snapshot.paramMap.get('id'));

    if (id) {
      eventService.getEvent(id)
        .subscribe(x => this.onEventLoad(x),
          httpErrorResponse => this.showError(httpErrorResponse));
    }
    else {
      let currentTime = moment();
      this.startDateTimeFlatPickrConf.minTime = currentTime.format(this.timeFormat);
      this.endDateTimeFlatPickrConf = Object.assign({}, this.startDateTimeFlatPickrConf);
      this.endDateTimeFlatPickrConf.minTime = currentTime.add("1", "minutes").format(this.timeFormat);
    }
  }

  private onEventLoad(eventDTO: EventDTO): void {
    this.createUpdateFormGroup.patchValue({
      name: eventDTO.name,
      location: eventDTO.location
    });
  }

  ngOnInit() {
    this.createUpdateFormGroup = this.formBuilder.group({
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
    let eventDTO: EventDTO = new EventDTO(this.createUpdateFormGroup.value);

    this.eventService.save(eventDTO).
      subscribe(httpResponse =>
        this.showSuccess('Event saved successfully'),
        httpErrorResponse => this.showError(httpErrorResponse));
  }
}
