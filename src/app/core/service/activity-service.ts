import {inject, Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Activity} from "../types/Activity";
import {Pagination} from '../types/Pagination';
import {environment} from '../../../environment/enviroment';

@Injectable({
    providedIn: 'root'
})

export class ActivityService {

  private readonly apiUrl = `${environment.apiUrl}/activity`;
    private http = inject(HttpClient);


    getAllActivities(): Observable<Pagination<Activity>> {
      return this.http.get<Pagination<Activity>>(`${this.apiUrl}/get-all-activities-by-event`);
    }
}
