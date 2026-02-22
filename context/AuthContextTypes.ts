export type User = {
  id: string;
  email: string;
  token: string;
};

export type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  login: (userData: User) => Promise<void>;
  logout: () => Promise<void>;
};
