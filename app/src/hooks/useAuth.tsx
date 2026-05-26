import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import type { User, UserType } from '@/types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (data: RegisterData) => Promise<boolean>;
  logout: () => void;
  switchUser: (userType: UserType) => void;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
  type: UserType;
  companyName?: string;
  document: string;
  phone: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Usuários mockados para demonstração
const mockUsers: User[] = [
  {
    id: '1',
    name: 'João Silva',
    email: 'cliente@email.com',
    type: 'cliente',
    companyName: 'Silva Empreendimentos LTDA',
    document: '12.345.678/0001-90',
    phone: '(11) 98765-4321',
    address: {
      street: 'Rua das Flores',
      number: '123',
      neighborhood: 'Centro',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '01001-000'
    },
    score: 4.7,
    totalContracts: 12,
    completedContracts: 10,
    createdAt: new Date('2023-01-15')
  },
  {
    id: '2',
    name: 'Maria Santos',
    email: 'prestador@email.com',
    type: 'prestador',
    companyName: 'Santos Serviços Especializados',
    document: '98.765.432/0001-10',
    phone: '(11) 91234-5678',
    address: {
      street: 'Avenida Principal',
      number: '456',
      complement: 'Sala 1001',
      neighborhood: 'Jardins',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '01415-000'
    },
    score: 4.9,
    totalContracts: 25,
    completedContracts: 23,
    createdAt: new Date('2022-06-20')
  },
  {
    id: '3',
    name: 'Carlos Admin',
    email: 'admin@email.com',
    type: 'admin',
    document: '123.456.789-00',
    phone: '(11) 99999-9999',
    score: 5.0,
    totalContracts: 0,
    completedContracts: 0,
    createdAt: new Date('2023-01-01')
  }
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = useCallback(async (email: string): Promise<boolean> => {
    // Simula delay de API
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const foundUser = mockUsers.find(u => u.email === email);
    if (foundUser) {
      setUser(foundUser);
      return true;
    }
    return false;
  }, []);

  const register = useCallback(async (data: RegisterData): Promise<boolean> => {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      name: data.name,
      email: data.email,
      type: data.type,
      companyName: data.companyName,
      document: data.document,
      phone: data.phone,
      score: 5.0,
      totalContracts: 0,
      completedContracts: 0,
      createdAt: new Date()
    };
    
    setUser(newUser);
    return true;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  const switchUser = useCallback((userType: UserType) => {
    const foundUser = mockUsers.find(u => u.type === userType);
    if (foundUser) {
      setUser(foundUser);
    }
  }, []);

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      login,
      register,
      logout,
      switchUser
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
