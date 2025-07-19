import * as React from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.scss";

import { App } from "./app";

// Disable console logs for production, test key, test
// console.log = console.warn = console.error = console.table = () => {};

const container = document.getElementById("root");
if (container) {
  const root = createRoot(container);
  root.render(<App />);
}
