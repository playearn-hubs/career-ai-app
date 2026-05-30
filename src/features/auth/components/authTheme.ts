import type { ThemeMode } from "../../../theme/tokens";

export type AuthPalette = {
  bg: readonly [string, string, string];
  blobTop: string;
  blobBottom: string;
  blobAccent: string;
  card: string;
  cardBorder: string;
  heading: string;
  subtitle: string;
  label: string;
  inputBg: string;
  inputBorder: string;
  placeholder: string;
  iconBoxBg: string;
  iconColor: string;
  primary: string;
  primaryDark: string;
  link: string;
  divider: string;
  dividerText: string;
  socialBg: string;
  socialBorder: string;
  socialText: string;
  securityText: string;
  dotActive: string;
  dotInactive: string;
  shadow: string;
};

const light: AuthPalette = {
  bg: ["#FFFFFF", "#F0F7FF", "#E8F4FD"],
  blobTop: "rgba(99, 102, 241, 0.18)",
  blobBottom: "rgba(59, 130, 246, 0.2)",
  blobAccent: "rgba(167, 139, 250, 0.15)",
  card: "#FFFFFF",
  cardBorder: "rgba(226, 232, 240, 0.8)",
  heading: "#0F172A",
  subtitle: "#64748B",
  label: "#334155",
  inputBg: "#FFFFFF",
  inputBorder: "#E2E8F0",
  placeholder: "#94A3B8",
  iconBoxBg: "#EFF6FF",
  iconColor: "#2563EB",
  primary: "#2563EB",
  primaryDark: "#1D4ED8",
  link: "#2563EB",
  divider: "#E2E8F0",
  dividerText: "#94A3B8",
  socialBg: "#FFFFFF",
  socialBorder: "#E2E8F0",
  socialText: "#334155",
  securityText: "#64748B",
  dotActive: "#2563EB",
  dotInactive: "#CBD5E1",
  shadow: "#0F172A",
};

const dark: AuthPalette = {
  bg: ["#0F172A", "#111827", "#1E293B"],
  blobTop: "rgba(37, 99, 235, 0.25)",
  blobBottom: "rgba(0, 180, 216, 0.2)",
  blobAccent: "rgba(99, 102, 241, 0.2)",
  card: "#1E293B",
  cardBorder: "rgba(51, 65, 85, 0.9)",
  heading: "#F8FAFC",
  subtitle: "#94A3B8",
  label: "#CBD5E1",
  inputBg: "#0F172A",
  inputBorder: "#334155",
  placeholder: "#64748B",
  iconBoxBg: "rgba(37, 99, 235, 0.2)",
  iconColor: "#60A5FA",
  primary: "#3B82F6",
  primaryDark: "#2563EB",
  link: "#60A5FA",
  divider: "#334155",
  dividerText: "#64748B",
  socialBg: "#0F172A",
  socialBorder: "#334155",
  socialText: "#E2E8F0",
  securityText: "#94A3B8",
  dotActive: "#3B82F6",
  dotInactive: "#475569",
  shadow: "#000000",
};

export function getAuthPalette(mode: ThemeMode): AuthPalette {
  return mode === "dark" ? dark : light;
}
