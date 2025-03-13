// Common types used across the application
export interface TeamMember {
  id: number;
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
  role: 'regular' | 'admin';
}
