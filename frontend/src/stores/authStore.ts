import { create } from 'zustand';
import { User, UserRole, AuthState } from '@/types/auth';

export const DEMO_USERS: Record<UserRole, User> = {
  student: {
    id: 'usr-student-104',
    name: 'Alex Chen',
    email: 'alex.chen@campus.edu',
    role: 'student',
    identifier: 'CS-2024-104',
    department: 'Computer Science & Engineering',
    semester: 5,
    title: 'Undergraduate Scholar',
  },
  faculty: {
    id: 'usr-faculty-042',
    name: 'Dr. Ananya Verma',
    email: 'a.verma@campus.edu',
    role: 'faculty',
    identifier: 'FAC-CS-042',
    department: 'Computer Science & Engineering',
    title: 'Associate Professor & HOD',
  },
  admin: {
    id: 'usr-admin-001',
    name: 'Dean Arthur Roberts',
    email: 'a.roberts@campus.edu',
    role: 'admin',
    identifier: 'ADM-REG-001',
    department: 'Office of Academic Affairs',
    title: 'Dean of Academic Operations',
  },
};

const STORAGE_KEY = 'smart_campus_auth_session';

export const useAuthStore = create<AuthState>((set) => {
  // Load initial user from localStorage if present
  let initialUser: User | null = DEMO_USERS.student;
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      initialUser = JSON.parse(saved);
    }
  } catch (e) {
    initialUser = DEMO_USERS.student;
  }

  return {
    user: initialUser,
    isAuthenticated: !!initialUser,
    isLoading: false,
    error: null,

    login: async (email: string, role: UserRole = 'student') => {
      set({ isLoading: true, error: null });
      // Simulate network authentication delay
      await new Promise((resolve) => setTimeout(resolve, 500));
      const user = DEMO_USERS[role];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
      set({ user, isAuthenticated: true, isLoading: false });
    },

    demoLogin: (role: UserRole) => {
      const user = DEMO_USERS[role];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
      set({ user, isAuthenticated: true, error: null });
    },

    logout: () => {
      localStorage.removeItem(STORAGE_KEY);
      set({ user: null, isAuthenticated: false });
    },

    switchRole: (role: UserRole) => {
      const user = DEMO_USERS[role];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
      set({ user, isAuthenticated: true });
    },
  };
});
