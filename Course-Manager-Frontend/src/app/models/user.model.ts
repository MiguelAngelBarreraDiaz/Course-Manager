export class User {
  id?: number | null;
  first_name: string;
  last_name: string;
  email: string;
  password?: string;
  phone?: string;
  role_id: number;
  verified_email_at?: Date;

  constructor(id: number, first_name: string, last_name: string, email: string, role_id: number, password: string, phone: string) {
    this.id = id;
    this.first_name = first_name;
    this.last_name = last_name;
    this.email = email;
    this.role_id = role_id;
    this.password = password;
    this.phone = phone;
  }
}