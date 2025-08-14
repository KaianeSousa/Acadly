import { Injectable, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Participant } from "../types/Participant";
import { ParticipantResponseDTO } from "../types/Participant/response";

@Injectable({
    providedIn: 'root'
})

export class ParticipantService {

    private readonly endpoint = 'http://localhost:8080/participant'
    private http = inject(HttpClient);

    
    createParticipant(eventId: number, participant: Participant): Observable<ParticipantResponseDTO> {
        return this.http.post<ParticipantResponseDTO>(`${this.endpoint}/create-participation/${eventId}`, participant);
    }
}