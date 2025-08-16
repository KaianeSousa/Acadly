import { Injectable, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Participant } from "../types/Participant";
import { ParticipantResponseDTO } from "../types/Participant/response";
import {environment} from '../../../environment/enviroment';

@Injectable({
    providedIn: 'root'
})

export class ParticipantService {

    private readonly apiUrl = `${environment.apiUrl}/participant`;
    private http = inject(HttpClient);


    createParticipant(eventId: number, participant: Participant): Observable<ParticipantResponseDTO> {
        return this.http.post<ParticipantResponseDTO>(`${this.apiUrl}/create-participation/${eventId}`, participant);
    }
}
