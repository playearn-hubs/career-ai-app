import React from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useThemedStyles } from "../../theme";

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
  const themed = useThemedStyles();
  const Wrapper = safe ? SafeAreaView : View;

  return (
    <Wrapper className={`flex-1 ${className}`} style={themed.screen}>
      {children}
    </Wrapper>
  );
}
