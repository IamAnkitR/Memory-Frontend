import React, { createContext, useContext, useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import { AuthContextType, User } from "./AuthContextTypes";

const AuthContext = createContext<AuthContextType | null>(null);

const STORAGE_KEY = "auth_user";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const storedUser = await SecureStore.getItemAsync(STORAGE_KEY);

        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.log("Failed to restore auth:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();
  }, []);

  const login = async (userData: User) => {
    await SecureStore.setItemAsync(STORAGE_KEY, JSON.stringify(userData));
    setUser(userData);
  };

  const logout = async () => {
    await SecureStore.deleteItemAsync(STORAGE_KEY);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}
