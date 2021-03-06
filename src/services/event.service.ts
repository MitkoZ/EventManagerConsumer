import { Injectable } from '@angular/core';
import { EventDTO } from 'src/DTOs/event-dto';
import { Constants } from 'src/utils/constants';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  constructor(private http: HttpClient) {

  }

  public getMyEvents(): Observable<EventDTO[]> {
    return this.http.get<EventDTO[]>(Constants.GET_MY_EVENTS_ENDPOINT);
  }

  public getEvent(id: Number): Observable<EventDTO> {
    return this.http.get<EventDTO>(Constants.GET_EVENT_ENDPOINT + id);
  }

  private updateEvent(eventDTO: EventDTO): Observable<String> {
    return this.http.put<String>(Constants.UPDATE_EVENT_ENDPOINT, eventDTO);
  }

  private createEvent(eventDTO: EventDTO): Observable<String> {
    return this.http.post<String>(Constants.CREATE_EVENT_ENDPOINT, eventDTO);
  }

  public delete(id: Number): Observable<String> {
    return this.http.delete<String>(Constants.DELETE_EVENT_ENDPOINT + id);
  }


  public save(eventDTO: EventDTO): Observable<String> {
    if (eventDTO.id == 0) {
      return this.createEvent(eventDTO);
    }
    else {
      return this.updateEvent(eventDTO);
    }
  }

}
