import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-user',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent {
  user: User = {
    id: null,
    first_name: '',
    last_name: '',
    email: '',
    role_id: 0,
    password: '',
    phone: ''
  };

  constructor(private userService: UserService, private router: Router) { }

  onSubmit() {
    console.log('Usuario creado:', this.user);
    this.createUser();
  }

  createUser() {
    this.userService.createUser(this.user).subscribe({
      next: (createdUser) => {
        console.log('Usuario creado:', createdUser);
      },
      error: (error) => {
        console.error('Error al crear usuario:', error);
      }
    });
  }
}