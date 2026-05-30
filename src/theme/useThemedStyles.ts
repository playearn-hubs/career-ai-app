import { useMemo } from "react";
import { useTheme } from "./ThemeProvider";
import type { ThemeColors } from "./tokens";

export function useThemedStyles() {
  const { colors, mode } = useTheme();

  return useMemo(
    () => ({
      mode,
      colors,
      screen: { backgroundColor: colors.surface },
      screenSecondary: { backgroundColor: colors.surfaceSecondary },
      card: {
        backgroundColor: colors.card,
        borderColor: colors.border,
      },
      input: {
        backgroundColor: colors.card,
        borderColor: colors.border,
        color: colors.content,
      },
      text: { color: colors.content },
      textSecondary: { color: colors.contentSecondary },
      textTertiary: { color: colors.contentTertiary },
      textPrimary: { color: colors.primary },
    }),
    [colors, mode]
  );
}

export type ThemedStyles = ReturnType<typeof useThemedStyles>;
