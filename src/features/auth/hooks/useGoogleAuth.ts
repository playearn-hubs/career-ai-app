import { useEffect, useState } from "react";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import { makeRedirectUri } from "expo-auth-session";
import { authConfig, isGoogleAuthConfigured } from "../../../config/auth.config";

WebBrowser.maybeCompleteAuthSession();

type GoogleProfile = {
  name?: string;
  email?: string;
  picture?: string;
};

type GoogleAuthResult =
  | { success: true; accessToken: string; profile: GoogleProfile }
  | { success: false; error: string };

type UseGoogleAuthResult = {
  signInWithGoogle: () => Promise<GoogleAuthResult | null>;
  isLoading: boolean;
  isConfigured: boolean;
};

export function useGoogleAuth(): UseGoogleAuthResult {
  const [isLoading, setIsLoading] = useState(false);
  const isConfigured = isGoogleAuthConfigured();

  const redirectUri = makeRedirectUri({
    scheme: authConfig.scheme,
  });

  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: authConfig.google.androidClientId || undefined,
    iosClientId: authConfig.google.iosClientId || undefined,
    webClientId: authConfig.google.webClientId || undefined,
    redirectUri,
  });

  useEffect(() => {
    if (response?.type === "error") {
      setIsLoading(false);
    }
  }, [response]);

  const signInWithGoogle = async (): Promise<GoogleAuthResult | null> => {
    if (!isConfigured) {
      return {
        success: false,
        error:
          "Google OAuth is not configured. Add client IDs to .env or app.json.",
      };
    }

    if (!request) {
      return {
        success: false,
        error: "Google auth is not ready yet. Please try again.",
      };
    }

    setIsLoading(true);

    try {
      const result = await promptAsync();

      if (result.type !== "success") {
        if (result.type === "dismiss") {
          return null;
        }
        return {
          success: false,
          error: "Google sign-in was cancelled or failed.",
        };
      }

      const accessToken = result.authentication?.accessToken;
      if (!accessToken) {
        return {
          success: false,
          error: "No access token received from Google.",
        };
      }

      const profile = await fetchGoogleProfile(accessToken);
      return { success: true, accessToken, profile };
    } catch (err) {
      return {
        success: false,
        error:
          err instanceof Error
            ? err.message
            : "Google sign-in failed unexpectedly.",
      };
    } finally {
      setIsLoading(false);
    }
  };

  return {
    signInWithGoogle,
    isLoading,
    isConfigured,
  };
}

async function fetchGoogleProfile(
  accessToken: string
): Promise<GoogleProfile> {
  try {
    const res = await fetch(
      "https://www.googleapis.com/oauth2/v3/userinfo",
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );

    if (!res.ok) return {};

    const data = (await res.json()) as {
      name?: string;
      email?: string;
      picture?: string;
    };

    return {
      name: data.name,
      email: data.email,
      picture: data.picture,
    };
  } catch {
    return {};
  }
}
