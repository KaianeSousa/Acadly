import {inject, Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {Activity} from "../types/Activity";
import {Pagination} from '../types/Pagination';
import {environment} from '../../../environment/enviroment';
import {format, parse} from 'date-fns';

@Injectable({
  providedIn: 'root'
})

export class ActivityService {

  private readonly apiUrl = `${environment.apiUrl}/activity`;
  private http = inject(HttpClient);

  getAllActivities(): Observable<Pagination<Activity>> {
    return this.http.get<Pagination<Activity>>(`${this.apiUrl}/get-all-activities-by-event`);
  }

  saveActivity(activity: Activity, eventId: number): Observable<Activity> {
    const {id, ...activityData} = activity;

    const date = parse(activity.dateTime, 'yyyy-MM-dd', new Date());

    const payload = {
      ...activityData,
      dateTime: format(date, 'dd/MM/yyyy'),
    };

    if (id) {
      return this.http.put<Activity>(`${this.apiUrl}/update/${activity.id}`, payload);
    } else {
      return this.http.post(
        `${this.apiUrl}/create-activity/${eventId}`,
        payload,
        {responseType: 'text'}
      ).pipe(
        map(() => {
          return activity;
        })
      );
    }
  }

  getAllActivitiesByEvent(eventId: number, page: number, pageSize: number): Observable<Pagination<Activity>> {
    return this.http.get<Pagination<Activity>>(`${this.apiUrl}/get-all-activities/${eventId}?page=${page}&pageSize=${pageSize}`);
  }

  getAllActivitiesByActiveEvent(page: number, pageSize: number): Observable<Pagination<Activity>> {
    return this.http.get<Pagination<Activity>>(`${this.apiUrl}/get-all-activities-by-event?page=${page}&pageSize=${pageSize}`);
  }

  deleteActivity(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }
}
