import { Platform } from "react-native";
import Constants from "expo-constants";

const API_PORT = 5000;
const API_PATH = "/api/v1";

function getMetroHostname(): string | null {
  const hostUri = Constants.expoConfig?.hostUri;
  if (hostUri) {
    return hostUri.split(":")[0] ?? null;
  }

  const linkingUri = Constants.linkingUri ?? Constants.experienceUrl;
  if (linkingUri) {
    const normalized = linkingUri.replace(/^exp:\/\//, "http://");
    try {
      return new URL(normalized).hostname || null;
    } catch {
      return null;
    }
  }

  return null;
}

function resolveApiUrl(): string {
  const explicit = process.env.EXPO_PUBLIC_API_URL?.trim();

  // Public or custom URL in .env always wins (works across any network)
  if (explicit) {
    return explicit.replace(/\/$/, "");
  }

  if (__DEV__) {
    const metroHost = getMetroHostname();
    if (
      metroHost &&
      metroHost !== "localhost" &&
      metroHost !== "127.0.0.1"
    ) {
      return `http://${metroHost}:${API_PORT}${API_PATH}`;
    }
  }

  if (Platform.OS === "android") {
    return `http://10.0.2.2:${API_PORT}${API_PATH}`;
  }

  return `http://localhost:${API_PORT}${API_PATH}`;
}

export const env = {
  apiUrl: resolveApiUrl(),
  appName: Constants.expoConfig?.name ?? "Career AI",
} as const;
