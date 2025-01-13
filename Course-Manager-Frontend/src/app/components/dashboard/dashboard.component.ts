import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CourseService } from '../../services/course.service';
import { Course } from '../../models/course.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  courses: Course[] = [];
  loading: boolean = true;
  error: string = '';

  constructor(private courseService: CourseService, private router: Router) {}

  ngOnInit(): void {
    this.loadCourses();
  }

  loadCourses(): void {
    this.loading = true;
    this.courseService.getCourses().subscribe({
      next: (data) => {
        this.courses = data;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Error al cargar los cursos';
        this.loading = false;
        console.error('Error:', error);
      }
    });
  }

  getModalityName(modalityId: number): string {
    // Esto se podría mejorar con un enum o un servicio de modalidades
    const modalities: { [key: number]: string } = {
      1: 'Presencial',
      2: 'Virtual',
      3: 'Híbrido'
    };
    return modalities[modalityId] || 'Desconocida';
  }

  onEdit(course: Course): void {
    // Implementar lógica de edición
    console.log('Editar curso:', course);
  }

  onEnroll(courseId: number | null | undefined) {
    if (courseId !== null && courseId !== undefined) {
      this.router.navigate(['/create-enrollment', courseId]);
    } else {
      console.error('Error: courseId is null or undefined');
    }
  }
}