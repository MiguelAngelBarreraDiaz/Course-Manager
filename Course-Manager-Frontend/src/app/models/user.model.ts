export class User {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    role_id: number;
  
    constructor(id: number, first_name: string, last_name: string, email: string, role_id: number) {
      this.id = id;
      this.first_name = first_name;
      this.last_name = last_name;
      this.email = email;
      this.role_id = role_id;
    }
  }