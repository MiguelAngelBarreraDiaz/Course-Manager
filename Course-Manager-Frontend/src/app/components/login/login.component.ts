import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { TokenValidationService } from '../../services/token-validation.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private tokenValidationService: TokenValidationService, private router: Router) {}

  ngOnInit() {
    localStorage.removeItem('token');
    this.tokenValidationService.validateToken();
  }

  login() {
    this.authService.login(this.email, this.password).subscribe(
      response => {
        localStorage.setItem('token', response.token);
        this.router.navigate(['/dashboard']);
      },
      error => {
        console.error('Error al iniciar sesión', error);
      }
    );
  }
}