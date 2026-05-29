import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useColorScheme as useSystemColorScheme } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useColorScheme as useNativeWindColorScheme } from "nativewind";
import {
  getThemeColors,
  type ThemeColors,
  type ThemeMode,
} from "./tokens";

const THEME_STORAGE_KEY = "@career-ai/theme-mode";

export type ThemePreference = ThemeMode | "system";

type ThemeContextValue = {
  preference: ThemePreference;
  mode: ThemeMode;
  colors: ThemeColors;
  setPreference: (preference: ThemePreference) => void;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

function resolveMode(
  preference: ThemePreference,
  systemScheme: ThemeMode | null | undefined
): ThemeMode {
  if (preference === "system") {
    return systemScheme === "dark" ? "dark" : "light";
  }
  return preference;
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const systemScheme = useSystemColorScheme();
  const { setColorScheme } = useNativeWindColorScheme();
  const [preference, setPreferenceState] = useState<ThemePreference>("system");

  const mode = resolveMode(
    preference,
    systemScheme === "dark" ? "dark" : "light"
  );

  useEffect(() => {
    AsyncStorage.getItem(THEME_STORAGE_KEY).then((stored) => {
      if (stored === "light" || stored === "dark" || stored === "system") {
        setPreferenceState(stored);
      }
    });
  }, []);

  useEffect(() => {
    setColorScheme(mode);
  }, [mode, setColorScheme]);

  const setPreference = useCallback((next: ThemePreference) => {
    setPreferenceState(next);
    void AsyncStorage.setItem(THEME_STORAGE_KEY, next);
  }, []);

  const toggleTheme = useCallback(() => {
    setPreference(mode === "dark" ? "light" : "dark");
  }, [mode, setPreference]);

  const value = useMemo(
    () => ({
      preference,
      mode,
      colors: getThemeColors(mode),
      setPreference,
      toggleTheme,
    }),
    [preference, mode, setPreference, toggleTheme]
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
}
