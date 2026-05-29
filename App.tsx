import "./global.css";

import React from "react";
import { AppProviders } from "./src/providers";
import { RootNavigator } from "./src/navigation";

export default function App() {
  return (
    <AppProviders>
      <RootNavigator />
    </AppProviders>
  );
}
