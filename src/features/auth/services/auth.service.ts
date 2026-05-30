import { apiRequest } from "../../../lib/api/client";
import type { AuthSession, AuthUser } from "../types";
import type { LoginFormData, RegisterFormData } from "../schemas/auth.schema";

type AuthApiUser = {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  provider: "email" | "google";
  role?: string;
  emailVerified?: boolean;
  createdAt?: string;
};

type AuthApiData = {
  user: AuthApiUser;
  accessToken: string;
};

function mapUser(user: AuthApiUser): AuthUser {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    avatarUrl: user.avatarUrl,
    provider: user.provider,
  };
}

function mapSession(data: AuthApiData): AuthSession {
  return {
    user: mapUser(data.user),
    accessToken: data.accessToken,
  };
}

export async function loginWithEmail(
  data: LoginFormData
): Promise<AuthSession> {
  const result = await apiRequest<AuthApiData>("/auth/login", {
    method: "POST",
    body: {
      email: data.email,
      password: data.password,
    },
  });

  return mapSession(result);
}

export async function registerWithEmail(
  data: RegisterFormData
): Promise<AuthSession> {
  const result = await apiRequest<AuthApiData>("/auth/register", {
    method: "POST",
    body: {
      name: data.name,
      email: data.email,
      password: data.password,
      confirmPassword: data.confirmPassword,
    },
  });

  return mapSession(result);
}

export async function loginWithGoogle(idToken: string): Promise<AuthSession> {
  const result = await apiRequest<AuthApiData>("/auth/google", {
    method: "POST",
    body: { idToken },
  });

  return mapSession(result);
}

export async function fetchCurrentUser(
  accessToken: string
): Promise<AuthUser> {
  const result = await apiRequest<{ user: AuthApiUser }>("/users/me", {
    token: accessToken,
  });

  return mapUser(result.user);
}
