import { Injectable, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Classification } from "../types/Classification";

@Injectable({
    providedIn: 'root'
})

export class ClassificationService {

    private readonly endpoint = 'http://localhost:8080/classification'
    private http = inject(HttpClient);
    
    getClassificationsByType(): Observable<Classification[]> {
        const type = 'EV';
        return this.http.get<Classification[]>(`${this.endpoint}/find-by-type/${type}`);
    }      
}