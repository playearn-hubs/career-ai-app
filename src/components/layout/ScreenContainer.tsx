import React from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type ScreenContainerProps = {
  children: React.ReactNode;
  className?: string;
  safe?: boolean;
};

export function ScreenContainer({
  children,
  className = "",
  safe = true,
}: ScreenContainerProps) {
  const Wrapper = safe ? SafeAreaView : View;

  return (
    <Wrapper className={`flex-1 bg-surface ${className}`}>
      {children}
    </Wrapper>
  );
}
