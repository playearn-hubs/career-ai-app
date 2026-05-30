import React from "react";
import { Pressable, Text, ActivityIndicator, ViewStyle, TextStyle } from "react-native";
import { useTheme } from "../../theme";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";

type ButtonProps = {
  title: string;
  onPress?: () => void;
  variant?: ButtonVariant;
  disabled?: boolean;
  loading?: boolean;
  className?: string;
};

export function Button({
  title,
  onPress,
  variant = "primary",
  disabled = false,
  loading = false,
  className = "",
}: ButtonProps) {
  const { colors } = useTheme();

  const containerStyle: ViewStyle = (() => {
    switch (variant) {
      case "primary":
        return { backgroundColor: colors.primary };
      case "secondary":
        return { backgroundColor: colors.content };
      case "outline":
        return {
          backgroundColor: "transparent",
          borderWidth: 2,
          borderColor: colors.primary,
        };
      case "ghost":
        return { backgroundColor: "transparent" };
      default:
        return { backgroundColor: colors.primary };
    }
  })();

  const labelStyle: TextStyle = (() => {
    switch (variant) {
      case "primary":
      case "secondary":
        return { color: colors.contentInverse };
      case "outline":
      case "ghost":
        return { color: colors.primary };
      default:
        return { color: colors.contentInverse };
    }
  })();

  const spinnerColor = labelStyle.color ?? colors.primary;

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      className={`flex-row items-center justify-center rounded-pill px-8 py-4 ${className}`}
      style={[containerStyle, disabled ? { opacity: 0.5 } : null]}
    >
      {loading ? (
        <ActivityIndicator color={spinnerColor} size="small" />
      ) : (
        <Text
          className="font-sans-semibold text-base"
          style={labelStyle}
        >
          {title}
        </Text>
      )}
    </Pressable>
  );
}
