export interface signUp {
  name: string;
  email: string;
  password: string;
  phone: number;
  id: string;
  address?: { addressLine: string }[];
}
export interface login {
  email: String;
  password: String;
}