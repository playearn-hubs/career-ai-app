import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Appearance, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useColorScheme as useNativeWindColorScheme } from "nativewind";
import {
  getThemeColors,
  type ThemeColors,
  type ThemeMode,
} from "./tokens";

const THEME_STORAGE_KEY = "@career-ai/theme-mode";

export type ThemePreference = ThemeMode;

type ThemeContextValue = {
  preference: ThemePreference;
  mode: ThemeMode;
  colors: ThemeColors;
  setPreference: (preference: ThemePreference) => void;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { setColorScheme } = useNativeWindColorScheme();
  const [mode, setMode] = useState<ThemeMode>("light");

  const applyMode = useCallback(
    (next: ThemeMode) => {
      setMode(next);
      Appearance.setColorScheme(next);
      setColorScheme(next);
    },
    [setColorScheme]
  );

  useEffect(() => {
    AsyncStorage.getItem(THEME_STORAGE_KEY).then((stored) => {
      if (stored === "light" || stored === "dark") {
        applyMode(stored);
      }
    });
  }, [applyMode]);

  const setPreference = useCallback(
    (next: ThemePreference) => {
      applyMode(next);
      void AsyncStorage.setItem(THEME_STORAGE_KEY, next);
    },
    [applyMode]
  );

  const toggleTheme = useCallback(() => {
    const nextMode: ThemeMode = mode === "dark" ? "light" : "dark";
    setPreference(nextMode);
  }, [mode, setPreference]);

  const colors = useMemo(() => getThemeColors(mode), [mode]);

  const value = useMemo(
    () => ({
      preference: mode,
      mode,
      colors,
      setPreference,
      toggleTheme,
    }),
    [mode, colors, setPreference, toggleTheme]
  );

  return (
    <ThemeContext.Provider value={value}>
      <View className="flex-1" style={{ backgroundColor: colors.surface }}>
        {children}
      </View>
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
}
