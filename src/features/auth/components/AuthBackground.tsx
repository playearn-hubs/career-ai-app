import React from "react";
import { StyleSheet, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import type { AuthPalette } from "./authTheme";

type AuthBackgroundProps = {
  palette: AuthPalette;
};

export function AuthBackground({ palette }: AuthBackgroundProps) {
  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      <LinearGradient
        colors={[...palette.bg]}
        style={StyleSheet.absoluteFill}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
      />
      <View
        style={[
          styles.blob,
          {
            top: -80,
            right: -60,
            width: 220,
            height: 220,
            backgroundColor: palette.blobTop,
          },
        ]}
      />
      <View
        style={[
          styles.blob,
          {
            top: 40,
            left: -90,
            width: 180,
            height: 180,
            backgroundColor: palette.blobAccent,
          },
        ]}
      />
      <View
        style={[
          styles.blob,
          {
            bottom: 120,
            right: -70,
            width: 200,
            height: 200,
            backgroundColor: palette.blobBottom,
          },
        ]}
      />
      <View
        style={[
          styles.blob,
          {
            bottom: -40,
            left: -50,
            width: 160,
            height: 160,
            backgroundColor: palette.blobAccent,
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  blob: {
    position: "absolute",
    borderRadius: 9999,
  },
});
