import React from "react";
import { Text } from "react-native";

type TypographyProps = {
  children: React.ReactNode;
  className?: string;
};

export function Heading({ children, className = "" }: TypographyProps) {
  return (
    <Text className={`text-3xl font-bold text-content ${className}`}>
      {children}
    </Text>
  );
}

export function Subheading({ children, className = "" }: TypographyProps) {
  return (
    <Text className={`text-lg text-content-secondary ${className}`}>
      {children}
    </Text>
  );
}

export function Body({ children, className = "" }: TypographyProps) {
  return (
    <Text className={`text-base text-content ${className}`}>
      {children}
    </Text>
  );
}

export function Caption({ children, className = "" }: TypographyProps) {
  return (
    <Text className={`text-sm text-content-tertiary ${className}`}>
      {children}
    </Text>
  );
}
