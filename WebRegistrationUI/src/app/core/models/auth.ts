export interface Signup {
  name: string;
  email: string;
  phone: string;
  password?: string;
}

export interface Login {
  email: string;
  phone: string;
}

export interface AuthResponse {
  role: string;
  name: string;
  token: string;
  userName: string;
  userId: string;
}