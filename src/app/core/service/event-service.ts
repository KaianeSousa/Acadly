import { Injectable, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Event } from "../types/Event";

@Injectable({
    providedIn: 'root'
})

export class EventService {

    private readonly endpoint = 'http://localhost:8080/event'
    private http = inject(HttpClient);


    getEvent(): Observable<Event> {
        return this.http.get<Event>(`${this.endpoint}/get-event-active`);
    }
}

      