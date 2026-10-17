"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
} from "react";
import { api, setAccessToken } from "@/lib/api";

export type AuthMode = "login" | "register" | "verify-otp" | "forgot-password";

export type ProfileSectionKey =
  | "BASICS"
  | "EXPERTISE"
  | "SKILLS"
  | "EDUCATION"
  | "LANGUAGE"
  | "GITHUB";

export interface ProfileSectionStatus {
  key: ProfileSectionKey;
  label: string;
  weight: number;
  isComplete: boolean;
}

export interface ProfileCompletion {
  percentage: number;
  isComplete: boolean;
  completedSections: ProfileSectionKey[];
  missingSections: ProfileSectionKey[];
  sections: Record<ProfileSectionKey, ProfileSectionStatus>;
}

export interface User {
  id: string;
  email: string;
  role: string;
  status: string;
  fullName?: string | null;
  onboardingCompleted: boolean;
  githubAccount?: {
    id?: string;
    githubId?: string;
    login: string;
  } | null;
  profileCompletion?: ProfileCompletion | null;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isModalOpen: boolean;
  mode: AuthMode;
  pendingEmail: string;
  openModal: (mode?: AuthMode, email?: string) => void;
  closeModal: () => void;
  setMode: (mode: AuthMode) => void;
  setPendingEmail: (email: string) => void;
  register: (
    name: string,
    email: string,
    password: string,
    acceptTerms: true,
  ) => Promise<any>;
  verifyOtp: (email: string, otp: string) => Promise<any>;
  resendOtp: (email: string) => Promise<any>;
  login: (email: string, password: string) => Promise<any>;
  logout: (allDevices?: boolean) => Promise<void>;
  forgotPassword: (email: string) => Promise<any>;
  resetPassword: (token: string, newPassword: string) => Promise<any>;
  setUser: (user: User | null) => void;
  refreshUser: () => Promise<User | null>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mode, setMode] = useState<AuthMode>("login");
  const [pendingEmail, setPendingEmail] = useState("");

  const openModal = (targetMode: AuthMode = "login", email = "") => {
    setMode(targetMode);
    if (email) setPendingEmail(email);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const refreshUser = useCallback(async (): Promise<User | null> => {
    try {
      const res = await api.get<{ user: User }>("/auth/me");
      if (res.success && res.data?.user) {
        setUser(res.data.user);
        return res.data.user;
      }
      return null;
    } catch {
      return null;
    }
  }, []);

  // Hydrate auth session silently on initial mount
  useEffect(() => {
    let isMounted = true;

    const hydrateSession = async () => {
      try {
        const token = await api.refreshToken();
        if (token && isMounted) {
          const res = await api.get<{ user: User }>("/auth/me");
          if (res.success && res.data?.user && isMounted) {
            setUser(res.data.user);
          }
        }
      } catch {
        if (isMounted) {
          setUser(null);
          setAccessToken(null);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    hydrateSession();

    return () => {
      isMounted = false;
    };
  }, []);

  const register = useCallback(
    async (
      name: string,
      email: string,
      password: string,
      acceptTerms: true,
    ) => {
      const res = await api.post("/auth/register", {
        name,
        email,
        password,
        acceptTerms,
      });
      setPendingEmail(email);
      setMode("verify-otp");
      return res;
    },
    [],
  );

  const verifyOtp = useCallback(async (email: string, otp: string) => {
    const res = await api.post("/auth/verify-otp", { email, otp });
    if (res.success && res.data) {
      setAccessToken(res.data.accessToken);
      setUser(res.data.user);
      setIsModalOpen(false);
      setPendingEmail("");
    }
    return res;
  }, []);

  const resendOtp = useCallback(async (email: string) => {
    return await api.post("/auth/resend-otp", { email });
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const res = await api.post("/auth/login", { email, password });
    if (res.success && res.data) {
      setAccessToken(res.data.accessToken);
      setUser(res.data.user);
      setIsModalOpen(false);
    }
    return res;
  }, []);

  const logout = useCallback(async (allDevices = false) => {
    try {
      await api.post("/auth/logout", { allDevices });
    } finally {
      setAccessToken(null);
      setUser(null);
    }
  }, []);

  const forgotPassword = useCallback(async (email: string) => {
    return await api.post("/auth/forgot-password", { email });
  }, []);

  const resetPassword = useCallback(
    async (token: string, newPassword: string) => {
      return await api.post("/auth/reset-password", { token, newPassword });
    },
    [],
  );

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        isModalOpen,
        mode,
        pendingEmail,
        openModal,
        closeModal,
        setMode,
        setPendingEmail,
        register,
        verifyOtp,
        resendOtp,
        login,
        logout,
        forgotPassword,
        resetPassword,
        setUser,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
