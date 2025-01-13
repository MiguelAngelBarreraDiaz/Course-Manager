import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { AuthService } from './services/auth.service';
import { TokenValidationService } from './services/token-validation.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Gestión de cursos';

  constructor(private authService: AuthService, private tokenValidationService: TokenValidationService) {}

  ngOnInit() {
    this.tokenValidationService.startTokenValidation();
  }

  ngOnDestroy() {
    this.tokenValidationService.stopTokenValidation();
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }
}