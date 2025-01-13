import { Component } from '@angular/core';
import { EnrollmentService } from '../../services/enrollment.service';
import { Enrollment } from '../../models/enrollment.model';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-enrollment',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './create-enrollment.component.html',
  styleUrls: ['./create-enrollment.component.css']
})
export class CreateEnrollmentComponent {
  enrollment: Enrollment = new Enrollment(0, 0, 0, 0);

  constructor(private enrollmentService: EnrollmentService, private router: Router) {}

  createEnrollment() {
    this.enrollmentService.createEnrollment(this.enrollment).subscribe(
      response => {
        console.log('Matrícula creada:', response);
        this.router.navigate(['/enrollments']);
      },
      error => {
        console.error('Error al crear la matrícula:', error);
      }
    );
  }
}