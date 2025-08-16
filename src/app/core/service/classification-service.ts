import { Injectable, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Classification } from "../types/Classification";
import {environment} from '../../../environment/enviroment';

@Injectable({
    providedIn: 'root'
})

export class ClassificationService {

    private readonly apiUrl = `${environment.apiUrl}/classification`;
    private http = inject(HttpClient);

    getClassificationTypes(): Observable<string[]> {
        return this.http.get<string[]>(`${this.apiUrl}/types`);
    }
}
