export type ThemeMode = "light" | "dark";

export type ThemeColors = {
  primary: string;
  primaryLight: string;
  primaryDark: string;
  gradient: readonly [string, string, string];
  surface: string;
  surfaceSecondary: string;
  surfaceTertiary: string;
  content: string;
  contentSecondary: string;
  contentTertiary: string;
  contentInverse: string;
  border: string;
  borderStrong: string;
  accentGlow: string;
  card: string;
  error: string;
  googleBlue: string;
};

export const lightColors: ThemeColors = {
  primary: "#00B4D8",
  primaryLight: "#48CAE4",
  primaryDark: "#0096C7",
  gradient: ["#00B4D8", "#00ADEF", "#48CAE4"],
  surface: "#FFFFFF",
  surfaceSecondary: "#F8FAFC",
  surfaceTertiary: "#E0F7FA",
  content: "#111827",
  contentSecondary: "#4B5563",
  contentTertiary: "#6B7280",
  contentInverse: "#FFFFFF",
  border: "#E5E7EB",
  borderStrong: "#D1D5DB",
  accentGlow: "#E0F7FA",
  card: "#FFFFFF",
  error: "#EF4444",
  googleBlue: "#4285F4",
};

export const darkColors: ThemeColors = {
  primary: "#00B4D8",
  primaryLight: "#48CAE4",
  primaryDark: "#0096C7",
  gradient: ["#0077B6", "#00B4D8", "#0096C7"],
  surface: "#0F172A",
  surfaceSecondary: "#111827",
  surfaceTertiary: "#1E293B",
  content: "#F9FAFB",
  contentSecondary: "#9CA3AF",
  contentTertiary: "#6B7280",
  contentInverse: "#111827",
  border: "#334155",
  borderStrong: "#475569",
  accentGlow: "#1E3A5F",
  card: "#1E293B",
  error: "#F87171",
  googleBlue: "#4285F4",
};

export function getThemeColors(mode: ThemeMode): ThemeColors {
  return mode === "dark" ? darkColors : lightColors;
}
