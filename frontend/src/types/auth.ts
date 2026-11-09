export type UserRole = 'student' | 'faculty' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  identifier: string; // Roll number, Faculty ID, or Admin ID
  department: string;
  avatarUrl?: string;
  semester?: number;
  title?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string, role?: UserRole) => Promise<void>;
  demoLogin: (role: UserRole) => void;
  logout: () => void;
  switchRole: (role: UserRole) => void;
}
