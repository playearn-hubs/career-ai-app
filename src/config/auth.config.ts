import Constants from "expo-constants";
import { Platform } from "react-native";

const extra = Constants.expoConfig?.extra as Record<string, string> | undefined;

export const authConfig = {
  scheme: "com.app.mobile",
  google: {
    androidClientId:
      process.env.EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID ??
      extra?.googleAndroidClientId ??
      "",
    iosClientId:
      process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID ??
      extra?.googleIosClientId ??
      "",
    webClientId:
      process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID ??
      extra?.googleWebClientId ??
      "",
  },
} as const;

export function getGoogleClientIdForPlatform(): string {
  if (Platform.OS === "android") {
    return authConfig.google.androidClientId;
  }
  if (Platform.OS === "ios") {
    return authConfig.google.iosClientId;
  }
  return authConfig.google.webClientId;
}

export function isGoogleAuthConfigured(): boolean {
  return Boolean(getGoogleClientIdForPlatform());
}

