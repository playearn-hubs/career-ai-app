import React from "react";
import { Pressable, Text, ActivityIndicator } from "react-native";
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

const variantStyles: Record<ButtonVariant, string> = {
  primary: "bg-primary active:bg-primary-700",
  secondary: "bg-content active:opacity-90",
  outline: "border-2 border-primary bg-transparent active:bg-accent-glow",
  ghost: "bg-transparent active:bg-surface-tertiary",
};

const textStyles: Record<ButtonVariant, string> = {
  primary: "text-content-inverse font-sans-semibold",
  secondary: "text-content-inverse font-sans-semibold",
  outline: "text-primary font-sans-semibold",
  ghost: "text-primary font-sans-semibold",
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

  const spinnerColor =
    variant === "primary" || variant === "secondary"
      ? colors.contentInverse
      : colors.primary;

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      className={`
        flex-row items-center justify-center rounded-pill px-8 py-4
        ${variantStyles[variant]}
        ${disabled ? "opacity-50" : ""}
        ${className}
      `}
    >
      {loading ? (
        <ActivityIndicator color={spinnerColor} size="small" />
      ) : (
        <Text className={`text-base ${textStyles[variant]}`}>{title}</Text>
      )}
    </Pressable>
  );
}
