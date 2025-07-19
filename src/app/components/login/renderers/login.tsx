import React from "react";
import { Eye, EyeOff } from "lucide-react";

export const LoginRender = function (context: any) {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1rem",
        background:
          "linear-gradient(90deg, #1a0536 0%, rgb(83, 0, 39) 48%, #1a0536 100%)",
      }}
    >
      <div style={{ width: "100%", maxWidth: "28rem" }}>
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              src="/wallet-login-logo.svg"
              alt="Wallet Logo"
              style={{ height: "4rem", width: "auto" }}
            />
          </div>
        </div>

        {/* Login Card */}
        <div
          style={{
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            borderRadius: "0.5rem",
            background: "rgba(45, 25, 75, 0.3)",
            backdropFilter: "blur(8px)",
          }}
        >
          <div style={{ padding: "2rem" }}>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "2rem" }}
            >
              {/* Welcome Heading */}
              <div style={{ textAlign: "center" }}>
                <h2
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: "bold",
                    color: "white",
                    margin: "0 0 0.5rem 0",
                  }}
                >
                  Welcome Back
                </h2>
                <p
                  style={{ color: "#d1d5db", fontSize: "0.875rem", margin: 0 }}
                >
                  Please sign in to your account
                </p>
              </div>

              {/* Form Fields */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1.5rem",
                }}
              >
                {/* Email Input */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.5rem",
                  }}
                >
                  <label htmlFor="email" style={{ display: "none" }}>
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={context.state.email}
                    onChange={context.onEmail}
                    style={{
                      height: "3rem",
                      width: "100%",
                      background: "rgba(30, 30, 50, 0.8)",
                      border: "1px solid rgba(255, 255, 255, 0.2)",
                      color: "white",
                      borderRadius: "0.375rem",
                      padding: "0 0.75rem",
                      outline: "none",
                      fontSize: "1rem",
                      margin: 0,
                      boxSizing: "border-box",
                    }}
                    placeholder="Enter your email"
                    autoComplete="off"
                    autoCorrect="off"
                    spellCheck="false"
                    aria-autocomplete="none"
                  />
                </div>

                {/* Password Input */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.5rem",
                  }}
                >
                  <label htmlFor="password" style={{ display: "none" }}>
                    Password
                  </label>
                  <div style={{ position: "relative" }}>
                    <input
                      id="password"
                      type={context.state.toggleShow ? "text" : "password"}
                      value={context.state.password}
                      onChange={context.onPassword}
                      style={{
                        height: "3rem",
                        width: "100%",
                        background: "rgba(30, 30, 50, 0.8)",
                        border: "1px solid rgba(255, 255, 255, 0.2)",
                        color: "white",
                        borderRadius: "0.375rem",
                        padding: "0 0.75rem",
                        paddingRight: "3rem",
                        outline: "none",
                        fontSize: "1rem",
                        margin: 0,
                        boxSizing: "border-box",
                      }}
                      placeholder="Enter your password"
                      autoComplete="off"
                    />
                    <button
                      type="button"
                      onClick={context.setToggle}
                      style={{
                        position: "absolute",
                        right: "0.75rem",
                        top: "50%",
                        transform: "translateY(-50%)",
                        background: "transparent",
                        border: "none",
                        color: "#9ca3af",
                        cursor: "pointer",
                        padding: 0,
                        margin: 0,
                        outline: "none",
                      }}
                    >
                      {context.state.toggleShow ? (
                        <EyeOff
                          style={{ height: "1.25rem", width: "1.25rem" }}
                        />
                      ) : (
                        <Eye style={{ height: "1.25rem", width: "1.25rem" }} />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Login Button with improved spacing */}
              <div style={{ paddingTop: "1rem" }}>
                <button
                  type="button"
                  disabled={context.state.loading}
                  onClick={context.login}
                  style={{
                    width: "100%",
                    height: "3rem",
                    color: "white",
                    fontWeight: "600",
                    fontSize: "1.125rem",
                    background: "linear-gradient(to right, #f472b6, #a855f7)",
                    border: "none",
                    borderRadius: "0.375rem",
                    cursor: context.state.loading ? "not-allowed" : "pointer",
                    opacity: context.state.loading ? 0.5 : 1,
                    transition: "all 0.2s",
                    boxShadow:
                      "0 4px 15px rgba(236, 72, 153, 0.3), 0 0 20px rgba(147, 51, 234, 0.2)",
                    margin: 0,
                    padding: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {context.state.loading ? (
                    <div className="loader"></div>
                  ) : (
                    "LOGIN"
                  )}
                </button>
              </div>

              {/* Secondary Links - Horizontal Layout */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingTop: "0.5rem",
                  paddingBottom: "0.5rem",
                }}
              >
                <a
                  href="/forgotten-password"
                  style={{
                    color: "#f9a8d4",
                    fontWeight: "500",
                    fontSize: "0.875rem",
                    textDecoration: "none",
                  }}
                >
                  Forgot Password?
                </a>
                <span style={{ color: "#9ca3af", fontSize: "0.875rem" }}>
                  Not Got A Wallet?
                </span>
              </div>

              {/* Ghost Style Action Buttons */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                }}
              >
                <a
                  href={"https://remelife.com/join-now/"}
                  target="_blank"
                  onClick={() => {
                    window.open("https://remelife.com/join-now/");
                  }}
                  rel="noreferrer"
                  style={{
                    display: "flex",
                    width: "100%",
                    height: "2.75rem",
                    background: "transparent",
                    color: "#93c5fd",
                    border: "2px solid #93c5fd",
                    fontWeight: "500",
                    transition: "all 0.2s",
                    borderRadius: "0.375rem",
                    alignItems: "center",
                    justifyContent: "center",
                    textDecoration: "none",
                    margin: 0,
                    padding: 0,
                  }}
                >
                  Register Here
                </a>

                <a
                  href={"https://remelife.com/tokens/"}
                  target="_blank"
                  onClick={() => {
                    window.open("https://remelife.com/tokens/");
                  }}
                  rel="noreferrer"
                  style={{
                    display: "flex",
                    width: "100%",
                    height: "2.75rem",
                    background: "transparent",
                    color: "#5eead4",
                    border: "2px solid #5eead4",
                    fontWeight: "500",
                    transition: "all 0.2s",
                    borderRadius: "0.375rem",
                    alignItems: "center",
                    justifyContent: "center",
                    textDecoration: "none",
                    margin: 0,
                    padding: 0,
                  }}
                >
                  Do you need help?
                </a>
              </div>
            </div>
          </div>
        </div>
        {/* Footer Links */}
        <div style={{ textAlign: "center", marginTop: "1.5rem" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "1rem",
              fontSize: "0.875rem",
            }}
          >
            <a
              href="https://remelife.com/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: "rgba(255, 255, 255, 0.7)",
                fontWeight: "500",
                textDecoration: "none",
              }}
            >
              ReMeLife
            </a>
            <span style={{ color: "rgba(255, 255, 255, 0.4)" }}>|</span>
            <a
              href="https://remelife.com/terms-and-conditions/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: "rgba(255, 255, 255, 0.7)",
                fontWeight: "500",
                textDecoration: "none",
              }}
            >
              Terms & Conditions
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
