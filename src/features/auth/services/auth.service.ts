import type { AuthSession, AuthUser } from "../types";
import type { LoginFormData, RegisterFormData } from "../schemas/auth.schema";

function createToken(prefix: string): string {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2)}`;
}

export async function loginWithEmail(
  data: LoginFormData
): Promise<AuthSession> {
  await simulateNetwork();

  const user: AuthUser = {
    id: createToken("user"),
    name: data.email.split("@")[0],
    email: data.email,
    provider: "email",
  };

  return {
    user,
    accessToken: createToken("email"),
  };
}

export async function registerWithEmail(
  data: RegisterFormData
): Promise<AuthSession> {
  await simulateNetwork();

  const user: AuthUser = {
    id: createToken("user"),
    name: data.name,
    email: data.email,
    provider: "email",
  };

  return {
    user,
    accessToken: createToken("email"),
  };
}

export async function loginWithGoogle(
  accessToken: string,
  profile?: { name?: string; email?: string; picture?: string }
): Promise<AuthSession> {
  await simulateNetwork();

  const user: AuthUser = {
    id: createToken("google"),
    name: profile?.name ?? "Google User",
    email: profile?.email ?? "user@gmail.com",
    avatarUrl: profile?.picture,
    provider: "google",
  };

  return {
    user,
    accessToken,
  };
}

async function simulateNetwork(): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 800));
}
