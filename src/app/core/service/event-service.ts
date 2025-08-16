import { Injectable, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Event } from "../types/Event";
import {environment} from '../../../environment/enviroment';
import {Pagination} from '../types/Pagination';

@Injectable({
    providedIn: 'root'
})

export class EventService {

    private readonly apiUrl = `${environment.apiUrl}/event`;
    private http = inject(HttpClient);

    getEvent(): Observable<Event> {
        return this.http.get<Event>(`${this.apiUrl}/get-event-active`);
    }

    getAllEvents(): Observable<Pagination<Event>> {
      return this.http.get<Pagination<Event>>(`${this.apiUrl}/get-all-events`);
    }

    saveEvent(event: Event): Observable<Event> {
      return this.http.post<Event>(`${this.apiUrl}/create-event`, event, {
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
      })
    }

    editEvent(id: number, event: Event) {
      return this.http.put<Event>(`${this.apiUrl}/update/${id}`, event, {
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
      })
    }
}

