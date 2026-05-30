import { createContext, useContext } from "react";

export const AuthLayoutContext = createContext(false);

export function useAuthDense() {
  return useContext(AuthLayoutContext);
}
