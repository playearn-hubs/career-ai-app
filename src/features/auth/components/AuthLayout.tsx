import React from "react";
import {
  Platform,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ThemeToggle } from "../../../components/ui";
import { useTheme } from "../../../theme";
import { AuthBackground } from "./AuthBackground";
import { AuthHeader } from "./AuthHeader";
import { AuthLayoutContext } from "./AuthLayoutContext";
import { AuthPageDots } from "./AuthPageDots";
import { getAuthPalette } from "./authTheme";

/** Show scroll bar on shorter phones where content may not fit */
const COMPACT_SCREEN_HEIGHT = 740;

type AuthLayoutProps = {
  greeting: string;
  subtitle: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  activeDotIndex: number;
  cardTitle?: string;
  dense?: boolean;
};

export function AuthLayout({
  greeting,
  subtitle,
  children,
  footer,
  activeDotIndex,
  cardTitle,
  dense = false,
}: AuthLayoutProps) {
  const insets = useSafeAreaInsets();
  const { height: windowHeight } = useWindowDimensions();
  const { mode } = useTheme();
  const palette = getAuthPalette(mode);
  const isCompactScreen = windowHeight < COMPACT_SCREEN_HEIGHT;

  return (
    <View style={styles.root}>
      <StatusBar style={mode === "dark" ? "light" : "dark"} />
      <AuthBackground palette={palette} />

      <AuthLayoutContext.Provider value={dense}>
        <KeyboardAwareScrollView
          style={styles.flex}
          contentContainerStyle={[
            styles.page,
            {
              paddingTop: insets.top + 6,
              paddingBottom: insets.bottom + 24,
            },
          ]}
          bottomOffset={insets.bottom + 16}
          extraKeyboardSpace={24}
          keyboardShouldPersistTaps="always"
          keyboardDismissMode="none"
          showsVerticalScrollIndicator={
            isCompactScreen || Platform.OS === "android"
          }
          persistentScrollbar={isCompactScreen}
          nestedScrollEnabled
          bounces
        >
          <View style={[styles.topBar, dense && styles.topBarDense]}>
            <ThemeToggle variant="auth" />
          </View>

          <AuthHeader
            palette={palette}
            greeting={greeting}
            subtitle={subtitle}
            dense={dense}
          />

          <View
            style={[
              dense ? styles.cardDense : styles.card,
              {
                backgroundColor: palette.card,
                borderColor: palette.cardBorder,
                shadowColor: palette.shadow,
              },
            ]}
          >
            {cardTitle ? (
              <Text
                style={[
                  dense ? styles.cardTitleDense : styles.cardTitle,
                  { color: palette.heading },
                ]}
              >
                {cardTitle}
              </Text>
            ) : null}
            {children}
          </View>

          {footer ? (
            <View style={[styles.footer, dense && styles.footerDense]}>
              {footer}
            </View>
          ) : null}

          <View style={[styles.dots, dense && styles.dotsDense]}>
            <AuthPageDots palette={palette} activeIndex={activeDotIndex} />
          </View>
        </KeyboardAwareScrollView>
      </AuthLayoutContext.Provider>
    </View>
  );
}

type AuthLinkProps = {
  prompt: string;
  action: string;
  onPress: () => void;
};

export function AuthLink({ prompt, action, onPress }: AuthLinkProps) {
  const { mode } = useTheme();
  const palette = getAuthPalette(mode);

  return (
    <Pressable onPress={onPress} style={styles.linkRow}>
      <Text style={[styles.linkPrompt, { color: palette.subtitle }]}>
        {prompt}{" "}
      </Text>
      <Text style={[styles.linkAction, { color: palette.link }]}>
        {action} →
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  flex: {
    flex: 1,
  },
  page: {
    paddingHorizontal: 20,
    flexGrow: 0,
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginBottom: 2,
  },
  topBarDense: {
    marginBottom: 0,
  },
  card: {
    borderRadius: 22,
    borderWidth: 1,
    paddingHorizontal: 18,
    paddingVertical: 18,
    gap: 14,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 20,
    elevation: 8,
  },
  cardDense: {
    borderRadius: 20,
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 12,
    gap: 10,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.07,
    shadowRadius: 14,
    elevation: 6,
  },
  cardTitle: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 15,
    marginBottom: 2,
  },
  cardTitleDense: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 13,
    marginBottom: 0,
  },
  footer: {
    alignItems: "center",
    marginTop: 16,
  },
  footerDense: {
    marginTop: 10,
  },
  dots: {
    alignItems: "center",
    marginTop: 16,
  },
  dotsDense: {
    marginTop: 8,
  },
  linkRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
  },
  linkPrompt: {
    fontFamily: "Inter_400Regular",
    fontSize: 14,
  },
  linkAction: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 14,
  },
});
