import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ApiResponse} from '../types/ApiResponse';
import {ValidationResponse} from '../types/ValidationResponse';

@Injectable({
  providedIn: 'root'
})
export class EnrollmentService {
  private readonly apiUrl = 'http://localhost:8080/enrollment';
  private http = inject(HttpClient);

  validateToken(token: string): Observable<ValidationResponse> {
    const requestBody = { token: token };
    return this.http.post<ValidationResponse>(`${this.apiUrl}/validate/token`, requestBody);
  }
}
