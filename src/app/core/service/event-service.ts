import {Injectable, inject} from "@angular/core";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, Observable, switchMap, throwError} from "rxjs";
import {Event} from "../types/Event";
import {environment} from '../../../environment/enviroment';
import {Pagination} from '../types/Pagination';
import {format, parse} from 'date-fns';


@Injectable({
  providedIn: 'root'
})

export class EventService {

  private readonly apiUrl = `${environment.apiUrl}/event`;
  private http = inject(HttpClient);

  getEvent(): Observable<Event> {
    return this.http.get<Event>(`${this.apiUrl}/get-event-active`);
  }

  getAllEvents(page: number = 0, pageSize: number = 10, query: string = ''): Observable<Pagination<Event>> {
    return this.http.get<Pagination<Event>>(`${this.apiUrl}/get-all-events?query=${query}&page=${page}&pageSize=${pageSize}`);
  }

  saveEvent(event: Event): Observable<Event> {
    const {id, ...eventData} = event;
    const parsedInitialDate = parse(event.initialDate, 'yyyy-MM-dd', new Date());
    const parsedFinalDate = parse(event.finalDate, 'yyyy-MM-dd', new Date());
    const payload = {
      ...eventData,
      initialDate: format(parsedInitialDate, 'dd/MM/yyyy'),
      finalDate: format(parsedFinalDate, 'dd/MM/yyyy'),
    };

    const saveOperation$ = id
      ? this.http.put<Event>(`${this.apiUrl}/update/${id}`, payload)
      : this.http.post<Event>(`${this.apiUrl}/create-event`, payload);

    if (!payload.isActive) {
      return saveOperation$;
    }

    return this.getEvent().pipe(
      switchMap(activeEvent => {
        if (activeEvent && activeEvent.id !== id) {
          return throwError(() => new Error('Já existe outro evento ativo. Desative-o antes de ativar este.'));
        }
        return saveOperation$;
      }),
      catchError((error: HttpErrorResponse) => {
        if (error.status === 404) {
          return saveOperation$;
        }
        return throwError(() => error.message);
      })
    );
  }

  isEventActive(): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/exists-active`);
  }

  deleteEvent(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }
}

