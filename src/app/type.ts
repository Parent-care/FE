export interface User {
  id: number;
  nama_lengkap: string;
  email: string;
   token?: string
   avatar?: string | null;
}

export interface AuthResponse {
  isLoggedIn: boolean;
  user?: User;
} 