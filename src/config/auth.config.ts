import Constants from "expo-constants";

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

export function isGoogleAuthConfigured(): boolean {
  const { androidClientId, iosClientId, webClientId } = authConfig.google;
  return Boolean(androidClientId || iosClientId || webClientId);
}
