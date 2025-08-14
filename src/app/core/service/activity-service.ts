import {inject, Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Activity} from "../types/Activity";
import {Pagination} from '../types/Pagination';

@Injectable({
    providedIn: 'root'
})

export class ActivityService {

    private readonly endpoint = 'http://localhost:8080/activity'
    private http = inject(HttpClient);


    getAllActivities(order?: string): Observable<Pagination<Activity>> {
      return this.http.get<Pagination<Activity>>(`${(this.endpoint)}/get-all-activities-by-event`);
    }
}
