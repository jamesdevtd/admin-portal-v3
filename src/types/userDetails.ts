export default interface UserDetails {
  id: number;
  firstName: string;
  lastName: string;
  role: string;
  email: string;
  phone: string;
  createdDate?: string;
  createdBy?: string;
}

export interface Role {
  id: number;
  name: string;
}