export type User = {
    username: string;
    password: string;
    isAdmin?: boolean;
  };
  
  export type AuthContextType = {
    user: User | null;
    login: (username: string, password: string) => Promise<boolean>;
    register: (username: string, password: string) => Promise<boolean>;
    logout: () => void;
    getAllUsers: () => Promise<User[]>;
  };