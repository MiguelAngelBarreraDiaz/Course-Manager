import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EnrollmentDataService } from '../../services/enrollment-data.service';
import { EnrollmentService } from '../../services/enrollment.service';
import { Enrollment } from '../../models/enrollment.model';

@Component({
  selector: 'app-update-enrollment',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './update-enrollment.component.html',
  styleUrls: ['./update-enrollment.component.css']
})
export class UpdateEnrollmentComponent implements OnInit {
  student: any;
  selectedStatus: number | null = null;

  // Opciones para el estado de inscripción
  enrollmentStatuses = [
    { id: 1, label: 'Inscripto' },
    { id: 2, label: 'Aprobado' },
    { id: 3, label: 'Rechazado' },
    { id: 4, label: 'Certificado' }
  ];

  constructor(private route: ActivatedRoute,
    private router: Router,
    private enrollmentDataService: EnrollmentDataService,
    private enrollmentService: EnrollmentService
  ) { }

  ngOnInit(): void {
    this.student = this.enrollmentDataService.getStudent();

    if (!this.student) {
      alert('No se encontraron datos del estudiante.');
      this.router.navigate(['/']); // Redirigir si no hay datos
    }
  }

  getStatusLabel(statusId: number): string {
    const status = this.enrollmentStatuses.find(s => s.id === statusId);
    return status ? status.label : 'Desconocido';
  }

  updateEnrollment() {
    if (this.selectedStatus !== null && this.student) {
      const enrollmentData: Enrollment = {
        id: this.student.enrollment_id,
        user_id: this.student.id,
        inscription_status_id: this.selectedStatus,
        course_id: this.student.courseId
      };
      console.log(enrollmentData);
      // Llamada al servicio para actualizar la inscripción
      this.enrollmentService.updateEnrollment(this.student.enrollment_id, enrollmentData).subscribe(
        (updatedEnrollment) => {
          // Aquí puedes hacer algo con la respuesta, como redirigir al usuario o mostrar un mensaje
          const idCourse = this.student.courseId;
          this.router.navigate(['/create-enrollment', idCourse]); // Redirigir a la lista de inscripciones o donde lo necesites
        },
        (error) => {
          // Manejo de errores
          console.error('Error al actualizar la inscripción', error);
          alert('Hubo un error al actualizar la inscripción. Intenta nuevamente.');
        }
      );
    } else {
      alert('Debes seleccionar un estado para la inscripción.');
    }
  }


  goBack() {
    const idCourse = this.student.courseId;
    this.router.navigate(['/create-enrollment', idCourse]);
  }
}
