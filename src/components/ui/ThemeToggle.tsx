import React from "react";
import { Pressable, Text } from "react-native";
import { useTheme } from "../../theme";

type ThemeToggleProps = {
  className?: string;
  variant?: "default" | "onPrimary";
};

export function ThemeToggle({
  className = "",
  variant = "default",
}: ThemeToggleProps) {
  const { mode, toggleTheme } = useTheme();

  const label = mode === "dark" ? "Light mode" : "Dark mode";
  const textClass =
    variant === "onPrimary" ? "text-white" : "text-content";

  return (
    <Pressable
      onPress={toggleTheme}
      className={`flex-row items-center justify-center rounded-pill border border-border bg-card px-4 py-2 active:opacity-80 ${className}`}
    >
      <Text className={`font-sans-medium text-sm ${textClass}`}>{label}</Text>
    </Pressable>
  );
}
