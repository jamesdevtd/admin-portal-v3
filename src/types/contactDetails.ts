export default interface ContactDetails {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password?: string | undefined;
}
