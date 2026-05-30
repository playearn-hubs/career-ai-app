import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import Constants from "expo-constants";
import { gsap } from "gsap";
import { appLogo } from "../../config/branding";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

const MIN_DISPLAY_MS = 2000;
const EXIT_MS = 520;

const SPLASH = {
  bg: ["#020617", "#0A1628", "#0E2A47"] as const,
  primary: "#00B4D8",
  primaryGlow: "#48CAE4",
  accent: "#0077B6",
  text: "#F8FAFC",
  textMuted: "rgba(248, 250, 252, 0.65)",
  ring: "rgba(0, 180, 216, 0.45)",
  card: "rgba(15, 23, 42, 0.85)",
};

type AppSplashScreenProps = {
  ready: boolean;
  fontsLoaded: boolean;
  onComplete: () => void;
};

function GlowOrb({
  size,
  color,
  style,
  delay = 0,
}: {
  size: number;
  color: string;
  style: object;
  delay?: number;
}) {
  const scale = useRef(new Animated.Value(0.85)).current;
  const opacity = useRef(new Animated.Value(0.35)).current;

  useEffect(() => {
    const pulse = { s: 0.85, o: 0.35 };
    gsap.to(pulse, {
      s: 1.08,
      o: 0.55,
      duration: 2.8,
      delay,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      onUpdate: () => {
        scale.setValue(pulse.s);
        opacity.setValue(pulse.o);
      },
    });
  }, [delay, opacity, scale]);

  return (
    <Animated.View
      style={[
        {
          position: "absolute",
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: color,
          transform: [{ scale: scale }],
          opacity,
        },
        style,
      ]}
    />
  );
}

function GridOverlay() {
  const lines = 14;
  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      {Array.from({ length: lines }).map((_, i) => (
        <View
          key={`h-${i}`}
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: (SCREEN_HEIGHT / lines) * i,
            height: 1,
            backgroundColor: "rgba(0, 180, 216, 0.06)",
          }}
        />
      ))}
      {Array.from({ length: Math.ceil(lines * (SCREEN_WIDTH / SCREEN_HEIGHT)) }).map(
        (_, i) => (
          <View
            key={`v-${i}`}
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              left: (SCREEN_WIDTH / lines) * i,
              width: 1,
              backgroundColor: "rgba(0, 180, 216, 0.06)",
            }}
          />
        )
      )}
    </View>
  );
}

export function AppSplashScreen({
  ready,
  fontsLoaded,
  onComplete,
}: AppSplashScreenProps) {
  const mountedAt = useRef(Date.now()).current;
  const [minTimeMet, setMinTimeMet] = useState(false);
  const [exiting, setExiting] = useState(false);
  const completedRef = useRef(false);

  const screenOpacity = useRef(new Animated.Value(1)).current;
  const logoScale = useRef(new Animated.Value(0.6)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const ringRotate = useRef(new Animated.Value(0)).current;
  const titleOpacity = useRef(new Animated.Value(0)).current;
  const tagOpacity = useRef(new Animated.Value(0)).current;
  const barWidth = useRef(new Animated.Value(0)).current;
  const scanY = useRef(new Animated.Value(-40)).current;

  const titleFont = fontsLoaded ? "Inter_700Bold" : undefined;
  const bodyFont = fontsLoaded ? "Inter_500Medium" : undefined;
  const statusBarHeight = Constants.statusBarHeight ?? 0;

  useEffect(() => {
    const t = setTimeout(() => setMinTimeMet(true), MIN_DISPLAY_MS);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const state = { y: -40 };
    gsap.to(state, {
      y: SCREEN_HEIGHT + 40,
      duration: 3.2,
      repeat: -1,
      ease: "none",
      onUpdate: () => scanY.setValue(state.y),
    });
  }, [scanY]);

  useEffect(() => {
    const rot = { v: 0 };
    gsap.to(rot, {
      v: 360,
      duration: 10,
      repeat: -1,
      ease: "none",
      onUpdate: () => ringRotate.setValue(rot.v),
    });
  }, [ringRotate]);

  useEffect(() => {
    const logo = { s: 0.6, o: 0 };
    gsap.to(logo, {
      s: 1,
      o: 1,
      duration: 1,
      delay: 0.15,
      ease: "back.out(1.4)",
      onUpdate: () => {
        logoScale.setValue(logo.s);
        logoOpacity.setValue(logo.o);
      },
    });

    const title = { o: 0 };
    gsap.to(title, {
      o: 1,
      duration: 0.85,
      delay: 0.55,
      ease: "power3.out",
      onUpdate: () => titleOpacity.setValue(title.o),
    });

    const tag = { o: 0 };
    gsap.to(tag, {
      o: 1,
      duration: 0.7,
      delay: 0.95,
      ease: "power2.out",
      onUpdate: () => tagOpacity.setValue(tag.o),
    });

    const bar = { w: 0 };
    gsap.to(bar, {
      w: 1,
      duration: 1.8,
      delay: 0.4,
      ease: "power2.inOut",
      onUpdate: () => barWidth.setValue(bar.w),
    });
  }, [barWidth, logoOpacity, logoScale, tagOpacity, titleOpacity]);

  useEffect(() => {
    if (!ready || !minTimeMet || exiting || completedRef.current) return;

    setExiting(true);
    Animated.timing(screenOpacity, {
      toValue: 0,
      duration: EXIT_MS,
      useNativeDriver: true,
    }).start(() => {
      if (!completedRef.current) {
        completedRef.current = true;
        onComplete();
      }
    });
  }, [ready, minTimeMet, exiting, onComplete, screenOpacity]);

  const ringSpin = ringRotate.interpolate({
    inputRange: [0, 360],
    outputRange: ["0deg", "360deg"],
  });

  const progressWidth = barWidth.interpolate({
    inputRange: [0, 1],
    outputRange: ["0%", "100%"],
  });

  return (
    <Animated.View
      style={[styles.root, { opacity: screenOpacity }]}
      pointerEvents={exiting ? "none" : "auto"}
    >
      <StatusBar style="light" />
      <LinearGradient
        colors={[...SPLASH.bg]}
        style={StyleSheet.absoluteFill}
        start={{ x: 0.2, y: 0 }}
        end={{ x: 0.8, y: 1 }}
      />

      <GridOverlay />

      <GlowOrb
        size={SCREEN_WIDTH * 0.9}
        color="rgba(0, 119, 182, 0.22)"
        style={{ top: -SCREEN_WIDTH * 0.35, left: -SCREEN_WIDTH * 0.2 }}
        delay={0}
      />
      <GlowOrb
        size={SCREEN_WIDTH * 0.7}
        color="rgba(0, 180, 216, 0.18)"
        style={{ bottom: -SCREEN_WIDTH * 0.25, right: -SCREEN_WIDTH * 0.15 }}
        delay={0.6}
      />
      <GlowOrb
        size={120}
        color="rgba(72, 202, 228, 0.35)"
        style={{ top: SCREEN_HEIGHT * 0.38, right: 32 }}
        delay={1.2}
      />

      <Animated.View
        style={[
          styles.scanLine,
          {
            top: scanY,
            opacity: 0.35,
          },
        ]}
        pointerEvents="none"
      />

      <View
        style={[styles.content, { paddingTop: statusBarHeight + 48 }]}
      >
        <View style={styles.logoBlock}>
          <Animated.View
            style={[
              styles.ringOuter,
              { transform: [{ rotate: ringSpin }] },
            ]}
          >
            <View style={styles.ringDash} />
          </Animated.View>

          <Animated.View
            style={[
              styles.logoCard,
              {
                opacity: logoOpacity,
                transform: [{ scale: logoScale }],
              },
            ]}
          >
            <LinearGradient
              colors={["rgba(0, 180, 216, 0.35)", "rgba(0, 119, 182, 0.15)"]}
              style={styles.logoCardGlow}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            />
            <Image source={appLogo} style={styles.logo} resizeMode="contain" />
          </Animated.View>
        </View>

        <Animated.View
          style={{
            opacity: titleOpacity,
            alignItems: "center",
          }}
        >
          <View style={styles.titleRow}>
            <Text style={[styles.title, { fontFamily: titleFont }]}>Career</Text>
            <Text
              style={[
                styles.title,
                styles.titleAccent,
                { fontFamily: titleFont },
              ]}
            >
              {" "}
              AI
            </Text>
          </View>
          <View style={styles.titleUnderline} />
        </Animated.View>

        <Animated.Text
          style={[
            styles.tagline,
            { opacity: tagOpacity, fontFamily: bodyFont },
          ]}
        >
          AI-powered career intelligence
        </Animated.Text>
      </View>

      <View style={[styles.footer, { paddingBottom: 40 + (Constants.platform?.ios ? 8 : 0) }]}>
        <View style={styles.progressTrack}>
          <Animated.View
            style={[
              styles.progressFill,
              { width: progressWidth },
            ]}
          />
        </View>
        <Animated.Text
          style={[styles.loadingLabel, { opacity: tagOpacity, fontFamily: bodyFont }]}
        >
          {ready ? "Launching experience" : "Initializing"}
        </Animated.Text>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  root: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 100,
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 32,
  },
  scanLine: {
    position: "absolute",
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: SPLASH.primaryGlow,
    shadowColor: SPLASH.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.9,
    shadowRadius: 12,
  },
  logoBlock: {
    width: 168,
    height: 168,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 36,
  },
  ringOuter: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "center",
  },
  ringDash: {
    width: 168,
    height: 168,
    borderRadius: 84,
    borderWidth: 2,
    borderColor: SPLASH.ring,
    borderStyle: "dashed",
  },
  logoCard: {
    width: 132,
    height: 132,
    borderRadius: 28,
    backgroundColor: SPLASH.card,
    borderWidth: 1,
    borderColor: "rgba(0, 180, 216, 0.35)",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    shadowColor: SPLASH.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.45,
    shadowRadius: 24,
    elevation: 16,
  },
  logoCardGlow: {
    ...StyleSheet.absoluteFillObject,
  },
  logo: {
    width: 96,
    height: 96,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "baseline",
  },
  title: {
    fontSize: 36,
    letterSpacing: -0.5,
    color: SPLASH.text,
  },
  titleAccent: {
    color: SPLASH.primaryGlow,
  },
  titleUnderline: {
    marginTop: 10,
    width: 48,
    height: 3,
    borderRadius: 2,
    backgroundColor: SPLASH.primary,
  },
  tagline: {
    marginTop: 14,
    fontSize: 15,
    color: SPLASH.textMuted,
    textAlign: "center",
    letterSpacing: 0.3,
  },
  footer: {
    paddingHorizontal: 40,
    gap: 10,
  },
  progressTrack: {
    height: 3,
    borderRadius: 2,
    backgroundColor: "rgba(0, 180, 216, 0.2)",
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 2,
    backgroundColor: SPLASH.primary,
    shadowColor: SPLASH.primaryGlow,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 8,
  },
  loadingLabel: {
    fontSize: 12,
    color: SPLASH.textMuted,
    textAlign: "center",
    letterSpacing: 1.2,
    textTransform: "uppercase",
  },
});
