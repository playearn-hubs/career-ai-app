import React from "react";
import { View } from "react-native";

type CardProps = {
  children: React.ReactNode;
  className?: string;
};

export function Card({ children, className = "" }: CardProps) {
  return (
    <View
      className={`rounded-2xl border border-border bg-card p-5 shadow-card dark:shadow-card-dark ${className}`}
    >
      {children}
    </View>
  );
}
