export class Course {
  id?: number | null;
  name: string;
  modality_id: number;
  duration: number;
  quota: number;
  created_at?: Date | null;
  updated_at?: Date | null;

  constructor(id: number, name: string, modality_id: number, duration: number, quota: number) {
    this.id = id;
    this.name = name;
    this.modality_id = modality_id;
    this.duration = duration;
    this.quota = quota;
  }
}