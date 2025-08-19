import { Injectable, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import {environment} from '../../../environment/enviroment';
import {Pagination} from '../types/Pagination';
import { Employee } from "../types/Employee";

@Injectable({
    providedIn: 'root'
})

export class EmployeeService {

    private readonly apiUrl = `${environment.apiUrl}/employee`;
    private http = inject(HttpClient);

    getAllEmployees(page = 0, pageSize = 10, query = ''): Observable<Pagination<Employee>> {
      return this.http.get<Pagination<Employee>>(`${this.apiUrl}/get-all?query=${query}&page=${page}&pageSize=${pageSize}`);
    }

    saveEmployee(employee: Employee): Observable<Employee> {

      if (employee.id) {
        return this.http.put<Employee>(
          `${this.apiUrl}/update/${employee.id}`,
          employee,
        );
      } else {
        return this.http.post<Employee>(
          `${this.apiUrl}/register`,
          employee,
        );
      }
    }

    deleteEmployee(id: number): Observable<void> {
      return this.http.delete<void>(`${this.apiUrl}/delete/${id}`)
    }
}

