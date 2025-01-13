import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { EnrollmentService } from '../../services/enrollment.service';
import { CourseService } from '../../services/course.service';
import { Enrollment } from '../../models/enrollment.model';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { EnrollmentDataService } from '../../services/enrollment-data.service';

@Component({
  selector: 'app-create-enrollment',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './create-enrollment.component.html',
  styleUrls: ['./create-enrollment.component.css']
})
export class CreateEnrollmentComponent implements OnInit {
  students: any[] = [];
  No_students: any[] = [];
  courseId?: number;
  selectedCoordinator: number = 0;
  selectedProfessor: number = 0;
  selectedStudent: number = 0;

  constructor(
    private enrollmentService: EnrollmentService,
    private courseService: CourseService,
    private route: ActivatedRoute,
    private router: Router,
    private enrollmentDataService: EnrollmentDataService
  ) { }

  ngOnInit() {
    this.courseId = Number(this.route.snapshot.paramMap.get('id'));
    this.getStudentsByCourseId(this.courseId);
    this.getUsersNotEnrolledInCourse(this.courseId);
  }

  getStudentsByCourseId(courseId: number) {
    this.courseService.getStudentsByCourseId(courseId).subscribe({
      next: (students) => {
        this.students = students;
        console.log(this.students);
      },
      error: (error) => {
        console.error('Error al obtener los estudiantes:', error);
      }
    });
  }

  getUsersNotEnrolledInCourse(courseId: number) {
    this.courseService.getUsersNotEnrolledInCourse(courseId).subscribe({
      next: (users) => {
        this.No_students = users;
      },
      error: (error) => {
        console.error('Error al obtener los usuarios no matriculados:', error);
      }
    });
  }

  getNotEnrolledByRole(roleId: number): any[] {
    return this.No_students.filter(user => user.role_id === roleId);
  }

  getEnrolledByRole(roleId: number): any[] {
    return this.students.filter(user => user.role_id === roleId);
  }

  enrollUser(userId: number) {
    if (this.courseId) {
      const enrollment = {
        user_id: userId,
        course_id: this.courseId,
        inscription_status_id: 1
      };
      
      this.enrollmentService.createEnrollment(enrollment).subscribe({
        next: (response) => {
          console.log('Matrícula creada:', response);
          // Refresh lists
          this.getStudentsByCourseId(this.courseId!);
          this.getUsersNotEnrolledInCourse(this.courseId!);
          // Reset selects
          this.selectedCoordinator = 0;
          this.selectedProfessor = 0;
          this.selectedStudent = 0;
        },
        error: (error) => {
          console.error('Error al crear la matrícula:', error);
        }
      });
    }
  }

  redirectToUpdateEnrollment(student: any) {
    student.courseId = this.courseId;
    this.enrollmentDataService.setStudent(student); 
    this.router.navigate(['/update-enrollment']);
  }
  
  getInscriptionStatusLabel(statusId: number): string {
    switch (statusId) {
      case 1:
        return 'Inscripto';
      case 2:
        return 'Aprobado';
      case 3:
        return 'Rechazado';
      case 4:
        return 'Certificado';
      default:
        return 'Desconocido';
    }
  }
}