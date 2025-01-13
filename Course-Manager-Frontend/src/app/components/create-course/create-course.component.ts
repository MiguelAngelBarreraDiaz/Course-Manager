import { Component } from '@angular/core';
import { CourseService } from '../../services/course.service';
import { Course } from '../../models/course.model';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-course',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './create-course.component.html',
  styleUrls: ['./create-course.component.css']
})
export class CreateCourseComponent {
  course: Course = new Course(0, '', 0, 0, 0);

  constructor(private courseService: CourseService, private router: Router) {}

  createCourse() {
    this.courseService.createCourse(this.course).subscribe({
      next: (createdCourse) => {
        console.log('Curso creado exitosamente:', createdCourse);
        this.course = new Course(0, '', 0, 0, 0);
        //this.router.navigate(['/courses']);
      },
      error: (error) => {
        console.error('Error al crear el curso:', error);
      }
    });
  }
}