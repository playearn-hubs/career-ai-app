import React from "react";
import { View } from "react-native";
import { useThemedStyles } from "../../theme";

type CardProps = {
  children: React.ReactNode;
  className?: string;
};

export function Card({ children, className = "" }: CardProps) {
  const themed = useThemedStyles();

  return (
    <View
      className={`rounded-2xl border p-5 ${className}`}
      style={[
        themed.card,
        {
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: themed.mode === "dark" ? 0.25 : 0.06,
          shadowRadius: 12,
          elevation: 4,
        },
      ]}
    >
      {children}
    </View>
  );
}
