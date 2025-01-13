export class Enrollment {
  id?: number | null;
  user_id: number;
  course_id: number;
  inscription_status_id: number;
  created_at?: Date | null;
  updated_at?: Date | null;

  constructor(id: number, user_id: number, course_id: number, inscription_status_id: number) {
    this.id = id;
    this.user_id = user_id;
    this.course_id = course_id;
    this.inscription_status_id = inscription_status_id;
  }
}