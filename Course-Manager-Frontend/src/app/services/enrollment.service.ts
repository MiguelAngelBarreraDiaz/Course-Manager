import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Enrollment } from '../models/enrollment.model';

@Injectable({
  providedIn: 'root'
})
export class EnrollmentService {
  private apiUrl = 'http://localhost:3000/enrollments';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders().set('Authorization', `${token}`);
  }

  getEnrollments(): Observable<Enrollment[]> {
    const headers = this.getHeaders();
    return this.http.get<Enrollment[]>(this.apiUrl, { headers });
  }

  getEnrollmentById(id: number): Observable<Enrollment> {
    const headers = this.getHeaders();
    return this.http.get<Enrollment>(`${this.apiUrl}/${id}`, { headers });
  }

  getEnrollmentsByUserId(userId: number): Observable<Enrollment[]> {
    const headers = this.getHeaders();
    return this.http.get<Enrollment[]>(`${this.apiUrl}/user/${userId}`, { headers });
  }

  getEnrollmentsByProfessorId(professorId: number): Observable<Enrollment[]> {
    const headers = this.getHeaders();
    return this.http.get<Enrollment[]>(`${this.apiUrl}/professor/${professorId}`, { headers });
  }

  createEnrollment(enrollment: Enrollment): Observable<Enrollment> {
    const headers = this.getHeaders();
    return this.http.post<Enrollment>(this.apiUrl, enrollment, { headers });
  }

  updateEnrollment(id: number, enrollment: Enrollment): Observable<Enrollment> {
    const headers = this.getHeaders();
    return this.http.put<Enrollment>(`${this.apiUrl}/${id}`, enrollment, { headers });
  }

  deleteEnrollment(id: number): Observable<any> {
    const headers = this.getHeaders();
    return this.http.delete(`${this.apiUrl}/${id}`, { headers });
  }
}