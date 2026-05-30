import React from "react";
import { StyleSheet, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { AuthIcon } from "./AuthIcon";
import type { AuthPalette } from "./authTheme";

type AuthHeroIllustrationProps = {
  palette: AuthPalette;
};

export function AuthHeroIllustration({ palette }: AuthHeroIllustrationProps) {
  return (
    <View style={styles.wrap}>
      <View style={[styles.orbit, styles.orbitBlue, { backgroundColor: palette.iconColor }]} />
      <View style={[styles.orbit, styles.orbitGreen]} />
      <View style={[styles.orbit, styles.orbitSmall]} />

      <LinearGradient
        colors={["#3B82F6", "#2563EB", "#1D4ED8"]}
        style={styles.shield}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.shieldInner}>
          <AuthIcon name="lock" size={26} color="#FFFFFF" />
        </View>
      </LinearGradient>

      <View style={styles.leafLeft}>
        <AuthIcon name="leaf" size={16} color="#22C55E" />
      </View>
      <View style={styles.leafRight}>
        <AuthIcon name="leaf" size={12} color="#4ADE80" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: 112,
    height: 112,
    alignItems: "center",
    justifyContent: "center",
  },
  shield: {
    width: 72,
    height: 80,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#2563EB",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 16,
    elevation: 10,
  },
  shieldInner: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: "rgba(255,255,255,0.2)",
    alignItems: "center",
    justifyContent: "center",
  },
  orbit: {
    position: "absolute",
    borderRadius: 9999,
    opacity: 0.9,
  },
  orbitBlue: {
    width: 14,
    height: 14,
    top: 8,
    right: 12,
  },
  orbitGreen: {
    width: 12,
    height: 12,
    backgroundColor: "#22C55E",
    bottom: 18,
    left: 6,
  },
  orbitSmall: {
    width: 8,
    height: 8,
    backgroundColor: "#60A5FA",
    top: 36,
    left: 4,
  },
  leafLeft: {
    position: "absolute",
    bottom: 4,
    left: -4,
    transform: [{ rotate: "-24deg" }],
  },
  leafRight: {
    position: "absolute",
    top: 20,
    right: -2,
    transform: [{ rotate: "32deg" }],
  },
});
