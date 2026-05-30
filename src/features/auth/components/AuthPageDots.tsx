import React from "react";
import { StyleSheet, View } from "react-native";
import type { AuthPalette } from "./authTheme";

type AuthPageDotsProps = {
  palette: AuthPalette;
  activeIndex: number;
  count?: number;
};

export function AuthPageDots({
  palette,
  activeIndex,
  count = 3,
}: AuthPageDotsProps) {
  return (
    <View style={styles.row}>
      {Array.from({ length: count }).map((_, i) => (
        <View
          key={i}
          style={[
            styles.dot,
            {
              backgroundColor:
                i === activeIndex ? palette.dotActive : palette.dotInactive,
              width: i === activeIndex ? 24 : 8,
            },
          ]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
  },
  dot: {
    height: 8,
    borderRadius: 4,
  },
});
