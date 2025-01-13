// enrollment-data.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EnrollmentDataService {
  private studentData: any;

  setStudent(student: any): void {
    this.studentData = student;
  }

  getStudent(): any {
    return this.studentData;
  }

  clearStudent(): void {
    this.studentData = null;
  }
}
