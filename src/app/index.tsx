import "./index.scss";
import "../styles/modern-wallet.scss";
import React, { Component, ReactNode } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import ApplicationBackground from "./assets/images/background.6e81d4b2.jpg";

import {
  Login,
  Registration,
  Mnemonic,
  NewPassword,
  WalletRecovery,
  ClaimTransaction,
  ForgottenPassword,
  InsufficientBalance,
  ConvertCaps,
} from "./components";
import ModernDashboard from "./components/dashboard/modern-dashboard";
import CommunityBuilder from "./components/community-builder";

// Debug CSS loading
console.log("=== CSS LOADING DEBUG ===");
console.log("CSS: index.scss imported");
console.log("CSS: modern-wallet.scss imported");
console.log("CSS: Timestamp:", new Date().toISOString());

// Simple CommunityBuilder wrapper that imports the component
const CommunityBuilderWrapper = () => {
  return <CommunityBuilder />;
};

// Create a wrapper component to handle route-based styling
const AppWrapper = () => {
  return (
    <Router
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <AppContent />
    </Router>
  );
};

// Inner component that can use router hooks
const AppContent = () => {
  // Simple approach: always apply modern background when on dashboard route
  const isDashboard = window.location.pathname === "/dashboard";

  // Debug logging for background issues
  console.log("=== APP CONTENT DEBUG ===");
  console.log("AppContent: Current path:", window.location.pathname);
  console.log("AppContent: Is dashboard:", isDashboard);
  console.log("AppContent: Full URL:", window.location.href);
  console.log("AppContent: Timestamp:", new Date().toISOString());
  console.log(
    "AppContent: Is page refresh:",
    performance.navigation.type === 1
  );
  console.log("AppContent: Navigation type:", performance.navigation.type);

  // Log when the component renders
  console.log("AppContent: Component rendering, isDashboard:", isDashboard);

  return (
    <div
      className={`application ${isDashboard ? "modern-dashboard-active" : ""}`}
    >
      <Routes>
        <Route path="/refferal" element={<Navigate to="/" replace />} />
        <Route path="/" element={<Login />} />
        <Route path="/registration/:referredBy" element={<Registration />} />
        <Route path="/dashboard" element={<ModernDashboard />} />
        <Route
          path="/community-builder"
          element={<CommunityBuilderWrapper />}
        />
        <Route path="/mnemonic" element={<Mnemonic />} />
        <Route path="/claim" element={<ClaimTransaction />} />
        <Route path="/insufficient-balance" element={<InsufficientBalance />} />
        <Route path="/forgotten-password" element={<ForgottenPassword />} />
        <Route
          path="/new-password/:id/:time/:token"
          element={<NewPassword />}
        />
        <Route path="/wallet-recovery" element={<WalletRecovery />} />
        <Route path="/convert-caps" element={<ConvertCaps />} />
      </Routes>
    </div>
  );
};

type State = {
  component: any;
  email: any;
  password: any;
};

export class App extends Component<{}, State> {
  public constructor(props: any) {
    super(props);

    // handle wp redirection on post increment in CAPs
    if (window.location.pathname === "/refferal") {
      localStorage.setItem("refferal", "true");
    }
  }

  public render(): ReactNode {
    return <AppWrapper />;
  }
}
