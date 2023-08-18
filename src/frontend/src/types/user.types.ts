import Authority from "./authority.type";

export default interface IUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  locked: boolean;
  enabled: boolean;
  username: string;
  authorities: Authority[];
  credentialsNonExpired: boolean;
  accountNonExpired: boolean;
  accountNonLocked: boolean;
}
