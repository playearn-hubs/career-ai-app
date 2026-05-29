export type AuthUser = {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  provider: "email" | "google";
};

export type AuthSession = {
  user: AuthUser;
  accessToken: string;
};
