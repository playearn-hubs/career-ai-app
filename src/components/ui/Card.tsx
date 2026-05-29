import React from "react";
import { View } from "react-native";

type CardProps = {
  children: React.ReactNode;
  className?: string;
};

export function Card({ children, className = "" }: CardProps) {
  return (
    <View
      className={`rounded-2xl bg-white p-5 shadow-sm border border-slate-100 ${className}`}
    >
      {children}
    </View>
  );
}
