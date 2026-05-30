import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { appLogo, branding } from "../../../config/branding";
import type { AuthPalette } from "./authTheme";

type AuthHeaderProps = {
  palette: AuthPalette;
  greeting: string;
  subtitle: string;
  dense?: boolean;
};

export function AuthHeader({
  palette,
  greeting,
  subtitle,
  dense = false,
}: AuthHeaderProps) {
  const appName = branding.site.name;

  return (
    <View style={[styles.wrap, dense && styles.wrapDense]}>
      <View
        style={[
          dense ? styles.logoCardDense : styles.logoCard,
          {
            backgroundColor: palette.card,
            borderColor: palette.cardBorder,
            shadowColor: palette.shadow,
          },
        ]}
      >
        <Image
          source={appLogo}
          style={dense ? styles.logoDense : styles.logo}
          resizeMode="contain"
        />
      </View>

      <Text
        style={[
          dense ? styles.appNameDense : styles.appName,
          { color: palette.heading },
        ]}
      >
        {appName}
      </Text>
      <Text
        style={[
          dense ? styles.greetingDense : styles.greeting,
          { color: palette.heading },
        ]}
      >
        {greeting}
      </Text>
      <Text
        style={[
          dense ? styles.subtitleDense : styles.subtitle,
          { color: palette.subtitle },
        ]}
      >
        {subtitle}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    alignItems: "center",
    paddingHorizontal: 8,
    marginBottom: 14,
  },
  wrapDense: {
    marginBottom: 8,
  },
  logoCard: {
    width: 64,
    height: 64,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 4,
  },
  logoCardDense: {
    width: 48,
    height: 48,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 6,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 3,
  },
  logo: {
    width: 44,
    height: 44,
  },
  logoDense: {
    width: 32,
    height: 32,
  },
  appName: {
    fontFamily: "Inter_700Bold",
    fontSize: 22,
    letterSpacing: -0.5,
    marginBottom: 4,
  },
  appNameDense: {
    fontFamily: "Inter_700Bold",
    fontSize: 17,
    letterSpacing: -0.3,
    marginBottom: 2,
  },
  greeting: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 15,
    lineHeight: 20,
    marginBottom: 4,
    textAlign: "center",
  },
  greetingDense: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 13,
    lineHeight: 17,
    marginBottom: 2,
    textAlign: "center",
  },
  subtitle: {
    fontFamily: "Inter_400Regular",
    fontSize: 13,
    lineHeight: 18,
    textAlign: "center",
    maxWidth: 280,
  },
  subtitleDense: {
    fontFamily: "Inter_400Regular",
    fontSize: 11,
    lineHeight: 15,
    textAlign: "center",
    maxWidth: 260,
  },
});
