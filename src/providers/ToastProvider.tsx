import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";
import { View } from "react-native";
import { Toast, type ToastVariant } from "../components/ui/Toast";

type ToastPayload = {
  message: string;
  variant: ToastVariant;
};

type ToastContextValue = {
  show: (message: string, variant?: ToastVariant) => void;
  showSuccess: (message: string) => void;
  showError: (message: string) => void;
  showInfo: (message: string) => void;
  dismiss: () => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

const DEFAULT_DURATION_MS = 3500;

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toast, setToast] = useState<ToastPayload | null>(null);
  const [visible, setVisible] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const dismiss = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setVisible(false);
    setTimeout(() => setToast(null), 220);
  }, []);

  const show = useCallback(
    (message: string, variant: ToastVariant = "info") => {
      if (!message.trim()) return;

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      setToast({ message: message.trim(), variant });
      setVisible(true);

      timeoutRef.current = setTimeout(() => {
        dismiss();
      }, DEFAULT_DURATION_MS);
    },
    [dismiss]
  );

  const value = useMemo(
    () => ({
      show,
      showSuccess: (message: string) => show(message, "success"),
      showError: (message: string) => show(message, "error"),
      showInfo: (message: string) => show(message, "info"),
      dismiss,
    }),
    [show, dismiss]
  );

  return (
    <ToastContext.Provider value={value}>
      <View className="flex-1">
        {children}
        {toast ? (
          <Toast
            message={toast.message}
            variant={toast.variant}
            visible={visible}
            onDismiss={dismiss}
          />
        ) : null}
      </View>
    </ToastContext.Provider>
  );
}

export function useToast(): ToastContextValue {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within ToastProvider");
  }
  return context;
}
