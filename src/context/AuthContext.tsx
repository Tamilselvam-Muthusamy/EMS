import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

type AuthContextType = {
  isUserAuthenticated: () => boolean;
  login: (userData: AuthUser) => void;
  getUser: () => AuthUser | null;
  logout: () => void;
};

export type AuthUser = {
  id: number;
  name: string;
  email: string;
  token: string;
  isActive: boolean;
  mobile: string;
  role: string;
  roleId: number;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const navigate = useNavigate();

  const login = (userData: any) => {
    localStorage.setItem("id", userData?.id.toString() ?? "");
    localStorage.setItem("firstName", userData?.firstName ?? "");
    localStorage.setItem("lastName", userData?.lastName ?? "");
    localStorage.setItem("email", userData?.email ?? "");
    localStorage.setItem("mobile", userData?.mobile ?? "");
    localStorage.setItem("token", userData?.token ?? "");
    localStorage.setItem("roleId", userData?.roleID.toString() ?? "");
    localStorage.setItem("role", userData?.role ?? "");
    localStorage.setItem("code", userData?.code ?? "");
    localStorage.setItem("department", userData?.department ?? "");
    localStorage.setItem("departmentId", userData?.departmentID ?? "");
    localStorage.setItem("lead", userData?.lead ?? "");
    localStorage.setItem("manager", userData?.manager ?? "");

    setUser(userData);
  };

  const getUser = () => user;

  const isUserAuthenticated = () => !!localStorage.getItem("token");

  const logout = () => {
    localStorage.clear(), setUser(null), navigate("/");
  };

  return (
    <AuthContext.Provider
      value={{ isUserAuthenticated, getUser, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
