export default interface Address {
  id: number;
  firstName: string;
  lastName: string;
  companyName?: string | null;
  streetAddress: string;
  city: string;
  department: string;
  zip: string;
  phone?: string | null;
  emailAddress: string;
}
