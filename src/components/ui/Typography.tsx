import React from "react";
import { Text } from "react-native";

type TypographyProps = {
  children: React.ReactNode;
  className?: string;
};

export function Heading({ children, className = "" }: TypographyProps) {
  return (
    <Text className={`font-sans-bold text-3xl text-content ${className}`}>
      {children}
    </Text>
  );
}

export function Subheading({ children, className = "" }: TypographyProps) {
  return (
    <Text className={`font-sans text-lg text-content-secondary ${className}`}>
      {children}
    </Text>
  );
}

export function Body({ children, className = "" }: TypographyProps) {
  return (
    <Text className={`font-sans text-base text-content ${className}`}>
      {children}
    </Text>
  );
}

export function Caption({ children, className = "" }: TypographyProps) {
  return (
    <Text className={`font-sans text-sm text-content-tertiary ${className}`}>
      {children}
    </Text>
  );
}
