import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { interval, Subscription } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TokenValidationService {
  private apiUrl = `${environment.apiUrl}/auth/validate-token`;
  private subscription: Subscription | null = null;

  constructor(private http: HttpClient, private router: Router) {}

  startTokenValidation() {
    this.subscription = interval(60000).subscribe(() => {
      this.validateToken();
    });
  }

  stopTokenValidation() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  validateToken() {
    const token = localStorage.getItem('token');
    if (token) {
      this.http.post(this.apiUrl, { token }).subscribe(
        response => {
          // Token is valid
        },
        error => {
          if (error.status === 401) {
            console.error('Token no válido. Limpiando token...');
            localStorage.removeItem('token');
            this.router.navigate(['/login']);
          }
        }
      );
    }
  }
}