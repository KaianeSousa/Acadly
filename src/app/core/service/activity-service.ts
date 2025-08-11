import { Injectable, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Activity } from "../types/Activity";

@Injectable({
    providedIn: 'root'
})

export class ActivityService {

    private readonly endpoint = 'http://localhost:8080/activity'
    private http = inject(HttpClient);

    
    getAllActivities(order?: string): Observable<Activity[]> {
        return this.http.get<Activity[]>(`${this.endpoint}/get-all-activities-by-event`);
    }
}