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

export interface DraggableItem {
  label: string;
  x: number;
  y: number;
  'z-index': number;
}