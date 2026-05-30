import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { AuthSession } from "../types";
import type { LoginFormData, RegisterFormData } from "../schemas/auth.schema";
import {
  fetchCurrentUser,
  loginWithEmail,
  loginWithGoogle,
  registerWithEmail,
} from "../services/auth.service";
import {
  clearSession,
  getStoredSession,
  saveSession,
} from "../services/auth.storage";

type AuthContextValue = {
  session: AuthSession | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  signIn: (data: LoginFormData) => Promise<void>;
  signUp: (data: RegisterFormData) => Promise<void>;
  signInWithGoogle: (idToken: string) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<AuthSession | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function restoreSession() {
      const stored = await getStoredSession();

      if (!stored?.accessToken) {
        setIsLoading(false);
        return;
      }

      try {
        const user = await fetchCurrentUser(stored.accessToken);
        setSession({ user, accessToken: stored.accessToken });
      } catch {
        await clearSession();
        setSession(null);
      } finally {
        setIsLoading(false);
      }
    }

    void restoreSession();
  }, []);

  const persistSession = useCallback(async (nextSession: AuthSession) => {
    await saveSession(nextSession);
    setSession(nextSession);
  }, []);

  const signIn = useCallback(
    async (data: LoginFormData) => {
      const nextSession = await loginWithEmail(data);
      await persistSession(nextSession);
    },
    [persistSession]
  );

  const signUp = useCallback(
    async (data: RegisterFormData) => {
      const nextSession = await registerWithEmail(data);
      await persistSession(nextSession);
    },
    [persistSession]
  );

  const signInWithGoogleHandler = useCallback(
    async (idToken: string) => {
      const nextSession = await loginWithGoogle(idToken);
      await persistSession(nextSession);
    },
    [persistSession]
  );

  const signOut = useCallback(async () => {
    await clearSession();
    setSession(null);
  }, []);

  const value = useMemo(
    () => ({
      session,
      isLoading,
      isAuthenticated: Boolean(session),
      signIn,
      signUp,
      signInWithGoogle: signInWithGoogleHandler,
      signOut,
    }),
    [session, isLoading, signIn, signUp, signInWithGoogleHandler, signOut]
  );

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
