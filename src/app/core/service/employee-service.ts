import { Injectable, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import {environment} from '../../../environment/enviroment';
import {Pagination} from '../types/Pagination';
import { Employee } from "../types/Employee";
import { EmployeeRequest } from "../types/Employee/request";
import { EmployeeUpdate } from "../types/Employee/update";

@Injectable({
    providedIn: 'root'
})

export class EmployeeService {

    private readonly apiUrl = `${environment.apiUrl}/employee`;
    private http = inject(HttpClient);


    getAllEmployees(): Observable<Pagination<Employee>> {
        return this.http.get<Pagination<Employee>>(`${this.apiUrl}/get-all`, {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
              }
        })
    }

    saveEmployee(employee: EmployeeRequest): Observable<EmployeeRequest> {
      return this.http.post<EmployeeRequest>(`${this.apiUrl}/register`, employee, {
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
      })
    }

    updateEmployee(email: string, employee : EmployeeUpdate) {
      return this.http.put<EmployeeRequest>(`${this.apiUrl}/update/${email}`, employee, {
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
      })
    }

    deleteEmployee(id: number) {
        return this.http.put<Employee>(`${this.apiUrl}/update/${id}`, {
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
          }
        })
    }
}

