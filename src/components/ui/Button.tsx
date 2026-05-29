import React from "react";
import { Pressable, Text, ActivityIndicator } from "react-native";

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
  primary: "bg-primary-600 active:bg-primary-700",
  secondary: "bg-surface-tertiary active:bg-slate-200",
  outline: "border-2 border-primary-600 active:bg-primary-50",
  ghost: "active:bg-surface-tertiary",
};

const textStyles: Record<ButtonVariant, string> = {
  primary: "text-content-inverse",
  secondary: "text-content",
  outline: "text-primary-600",
  ghost: "text-primary-600",
};

export function Button({
  title,
  onPress,
  variant = "primary",
  disabled = false,
  loading = false,
  className = "",
}: ButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      className={`
        flex-row items-center justify-center rounded-xl px-6 py-4
        ${variantStyles[variant]}
        ${disabled ? "opacity-50" : ""}
        ${className}
      `}
    >
      {loading ? (
        <ActivityIndicator
          color={variant === "primary" ? "#FFFFFF" : "#6366F1"}
          size="small"
        />
      ) : (
        <Text
          className={`text-base font-semibold ${textStyles[variant]}`}
        >
          {title}
        </Text>
      )}
    </Pressable>
  );
}
