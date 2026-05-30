import React from "react";
import { NavigationContainer, DarkTheme, DefaultTheme } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AuthProvider } from "../features/auth";
import { ThemeProvider, useTheme } from "../theme";
import { ToastProvider } from "./ToastProvider";

type AppProvidersProps = {
  children: React.ReactNode;
};

function NavigationThemeProvider({ children }: AppProvidersProps) {
  const { mode, colors } = useTheme();

  const navigationTheme =
    mode === "dark"
      ? {
          ...DarkTheme,
          colors: {
            ...DarkTheme.colors,
            primary: colors.primary,
            background: colors.surface,
            card: colors.card,
            text: colors.content,
            border: colors.border,
          },
        }
      : {
          ...DefaultTheme,
          colors: {
            ...DefaultTheme.colors,
            primary: colors.primary,
            background: colors.surface,
            card: colors.card,
            text: colors.content,
            border: colors.border,
          },
        };

  return (
    <NavigationContainer theme={navigationTheme}>
      {children}
    </NavigationContainer>
  );
}

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <ToastProvider>
          <AuthProvider>
            <NavigationThemeProvider>{children}</NavigationThemeProvider>
          </AuthProvider>
        </ToastProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
