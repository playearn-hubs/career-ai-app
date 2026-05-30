import "./global.css";

import React, { useCallback, useLayoutEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
} from "@expo-google-fonts/inter";
import * as SplashScreen from "expo-splash-screen";
import { AppProviders } from "./src/providers";
import { RootNavigator } from "./src/navigation";
import { AppSplashScreen } from "./src/components/splash";

const SPLASH_BG = "#020617";

export default function App() {
  const [splashDone, setSplashDone] = useState(false);
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  const handleSplashComplete = useCallback(() => {
    setSplashDone(true);
  }, []);

  // Dismiss native splash on first paint — do NOT use preventAutoHideAsync (that kept the white native screen visible while fonts load).
  useLayoutEffect(() => {
    void SplashScreen.hideAsync().catch(() => {});
  }, []);

  const showSplash = !splashDone;
  const showApp = fontsLoaded && splashDone;

  return (
    <View style={styles.root}>
      {showApp ? (
        <View className="flex-1 font-sans">
          <AppProviders>
            <RootNavigator />
          </AppProviders>
        </View>
      ) : null}

      {showSplash ? (
        <AppSplashScreen
          ready={fontsLoaded}
          fontsLoaded={fontsLoaded}
          onComplete={handleSplashComplete}
        />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: SPLASH_BG,
  },
});
