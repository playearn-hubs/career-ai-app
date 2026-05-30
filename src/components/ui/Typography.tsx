import React from "react";
import { Text } from "react-native";
import { useThemedStyles } from "../../theme";

type TypographyProps = {
  children: React.ReactNode;
  className?: string;
};

export function Heading({ children, className = "" }: TypographyProps) {
  const themed = useThemedStyles();

  return (
    <Text className={`font-sans-bold text-3xl ${className}`} style={themed.text}>
      {children}
    </Text>
  );
}

export function Subheading({ children, className = "" }: TypographyProps) {
  const themed = useThemedStyles();

  return (
    <Text className={`font-sans text-lg ${className}`} style={themed.textSecondary}>
      {children}
    </Text>
  );
}

export function Body({ children, className = "" }: TypographyProps) {
  const themed = useThemedStyles();

  return (
    <Text className={`font-sans text-base ${className}`} style={themed.text}>
      {children}
    </Text>
  );
}

export function Caption({ children, className = "" }: TypographyProps) {
  const themed = useThemedStyles();

  return (
    <Text className={`font-sans text-sm ${className}`} style={themed.textTertiary}>
      {children}
    </Text>
  );
}
