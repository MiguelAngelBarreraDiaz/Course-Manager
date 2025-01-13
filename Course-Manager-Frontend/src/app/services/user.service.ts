import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = `${environment.apiUrl}/users`;
  
  constructor(private http: HttpClient) { }

  // Método privado para configurar los headers
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders().set('Authorization', `${token}`);
  }

  // Obtener todos los usuarios
  getUsers(): Observable<User[]> {
    const headers = this.getHeaders();
    return this.http.get<User[]>(this.apiUrl, { headers });
  }

  // Obtener un usuario por ID
  getUserById(id: number): Observable<User> {
    const headers = this.getHeaders();
    return this.http.get<User>(`${this.apiUrl}/${id}`, { headers });
  }

  // Crear un nuevo usuario
  createUser(user: User): Observable<User> {
    const headers = this.getHeaders();
    return this.http.post<User>(this.apiUrl, user, { headers });
  }

  // Actualizar un usuario existente
  updateUser(id: number, user: User): Observable<User> {
    const headers = this.getHeaders();
    return this.http.put<User>(`${this.apiUrl}/${id}`, user, { headers });
  }

  // Eliminar un usuario
  deleteUser(id: number): Observable<any> {
    const headers = this.getHeaders();
    return this.http.delete(`${this.apiUrl}/${id}`, { headers });
  }
}