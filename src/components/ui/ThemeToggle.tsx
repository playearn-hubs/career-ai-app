import React from "react";
import { Pressable, Text, View } from "react-native";
import { useTheme } from "../../theme";

type ThemeToggleProps = {
  className?: string;
  variant?: "default" | "onPrimary" | "auth";
};

export function ThemeToggle({
  className = "",
  variant = "default",
}: ThemeToggleProps) {
  const { mode, toggleTheme, colors } = useTheme();
  const isDark = mode === "dark";

  const isOnPrimary = variant === "onPrimary";
  const isAuth = variant === "auth";

  const backgroundColor = isOnPrimary
    ? "rgba(255, 255, 255, 0.95)"
    : isAuth
      ? isDark
        ? "rgba(255, 255, 255, 0.95)"
        : "#1E3A5F"
      : colors.card;

  const borderColor = isOnPrimary
    ? "rgba(255, 255, 255, 0.6)"
    : isAuth
      ? isDark
        ? "rgba(255, 255, 255, 0.5)"
        : "rgba(30, 58, 95, 0.8)"
      : colors.border;

  const textColor = isOnPrimary
    ? "#0F172A"
    : isAuth
      ? isDark
        ? "#0F172A"
        : "#FFFFFF"
      : colors.content;

  const iconBg = isOnPrimary
    ? "rgba(0, 180, 216, 0.15)"
    : isAuth
      ? isDark
        ? "rgba(0, 180, 216, 0.15)"
        : "rgba(255, 255, 255, 0.15)"
      : isDark
        ? "rgba(0, 180, 216, 0.25)"
        : "rgba(0, 180, 216, 0.12)";

  return (
    <Pressable
      onPress={toggleTheme}
      accessibilityRole="button"
      accessibilityLabel={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className={className}
      style={({ pressed }) => ({
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        paddingHorizontal: 14,
        paddingVertical: 10,
        borderRadius: 9999,
        borderWidth: 1.5,
        backgroundColor,
        borderColor,
        opacity: pressed ? 0.85 : 1,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: isOnPrimary ? 0.15 : 0.08,
        shadowRadius: 6,
        elevation: 4,
      })}
    >
      <View
        style={{
          width: 28,
          height: 28,
          borderRadius: 14,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: iconBg,
        }}
      >
        <Text style={{ fontSize: 16 }}>{isDark ? "☀️" : "🌙"}</Text>
      </View>
      <Text
        style={{
          fontFamily: "Inter_600SemiBold",
          fontSize: 14,
          color: textColor,
        }}
      >
        {isDark ? "Light" : "Dark"}
      </Text>
    </Pressable>
  );
}
