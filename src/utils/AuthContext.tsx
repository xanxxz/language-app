import React, { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { api } from "../api/api";

export const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // 🔄 ИНИЦИАЛИЗАЦИЯ (загрузка пользователя при старте)
  useEffect(() => {
    const loadUser = async () => {
      try {
        const token = await AsyncStorage.getItem("token");

        if (!token) {
          setLoading(false);
          return;
        }

        const res = await api.get("/auth/me");

      setUser({
        id: res.data.id,
        email: res.data.email,
        username: res.data.username,
        language: res.data.language_code,
        role: res.data.role,
      });
      } catch (e) {
        console.log("Auth init error:", e);
        await AsyncStorage.removeItem("token");
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  // ✅ LOGIN
  const login = async (email: string, password: string) => {
    const res = await api.post("/auth/login", { email, password });

    await AsyncStorage.setItem("token", res.data.token);

    setUser({
      ...res.data.user,
      language: res.data.user.language_code,
      role: res.data.user.role, // 👈 обязательно
    });
  };

  // ✅ REGISTER
  const register = async (
    email: string,
    password: string,
    username: string
  ) => {
    const res = await api.post("/auth/register", {
      email,
      password,
      username,
    });

    await AsyncStorage.setItem("token", res.data.token);

    setUser({
      ...res.data.user,
      role: res.data.user.role, // 👈 если есть на бэке
    });
  };

  // ✅ LOGOUT
  const logout = async () => {
    await AsyncStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};