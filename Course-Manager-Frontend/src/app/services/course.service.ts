import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Course } from '../models/course.model';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private apiUrl = 'http://localhost:3000/courses';

  constructor(private http: HttpClient) {}

  /**
   * Obtiene los encabezados de autenticación.
   * 
   * @returns {HttpHeaders} - Los encabezados de autenticación.
   */
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  /**
   * Obtiene todos los cursos.
   * 
   * @returns {Observable<Course[]>} - Un observable con la lista de cursos.
   */
  getCourses(): Observable<Course[]> {
    const headers = this.getHeaders();
    return this.http.get<Course[]>(this.apiUrl, { headers });
  }

  /**
   * Obtiene un curso por su ID.
   * 
   * @param {number} id - El ID del curso a obtener.
   * @returns {Observable<Course>} - Un observable con el curso encontrado.
   */
  getCourseById(id: number): Observable<Course> {
    const headers = this.getHeaders();
    return this.http.get<Course>(`${this.apiUrl}/${id}`, { headers });
  }

  /**
   * Crea un nuevo curso.
   * 
   * @param {Course} course - Los datos del curso a crear.
   * @returns {Observable<Course>} - Un observable con el curso creado.
   */
  createCourse(course: Course): Observable<Course> {
    const headers = this.getHeaders();
    return this.http.post<Course>(this.apiUrl, course, { headers });
  }

  /**
   * Actualiza un curso por su ID.
   * 
   * @param {number} id - El ID del curso a actualizar.
   * @param {Course} course - Los nuevos datos del curso.
   * @returns {Observable<Course>} - Un observable con el curso actualizado.
   */
  updateCourse(id: number, course: Course): Observable<Course> {
    const headers = this.getHeaders();
    return this.http.put<Course>(`${this.apiUrl}/${id}`, course, { headers });
  }

  /**
   * Elimina un curso por su ID.
   * 
   * @param {number} id - El ID del curso a eliminar.
   * @returns {Observable<any>} - Un observable con el resultado de la eliminación.
   */
  deleteCourse(id: number): Observable<any> {
    const headers = this.getHeaders();
    return this.http.delete(`${this.apiUrl}/${id}`, { headers });
  }

  /**
   * Obtiene todos los estudiantes matriculados en un curso por su ID.
   * 
   * @param {number} id - El ID del curso.
   * @returns {Observable<any[]>} - Un observable con la lista de estudiantes matriculados.
   */
  getStudentsByCourseId(id: number): Observable<any[]> {
    const headers = this.getHeaders();
    return this.http.get<any[]>(`${this.apiUrl}/${id}/students`, { headers });
  }
}