import React from "react";

export const ForgottenPasswordRender = function (context: any) {
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

        {/* Forgot Password Card */}
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
                  Forgot Password
                </h2>
                <p
                  style={{ color: "#d1d5db", fontSize: "0.875rem", margin: 0 }}
                >
                  Please enter your email address below and we will send you
                  information to change your password.
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
                    placeholder="Email"
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
                    autoComplete="off"
                    autoCorrect="off"
                    spellCheck="false"
                    aria-autocomplete="none"
                  />
                </div>
              </div>

              {/* Request Reset Button */}
              <div style={{ paddingTop: "1rem" }}>
                <button
                  type="button"
                  disabled={context.state.loading}
                  onClick={context.submitResetRequest}
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
                  }}
                >
                  {context.state.loading ? (
                    <div className="loader"></div>
                  ) : (
                    "REQUEST RESETTING"
                  )}
                </button>
              </div>

              {/* Back to Login Link */}
              <div style={{ textAlign: "center" }}>
                <a
                  href="/login"
                  style={{
                    color: "#f9a8d4",
                    fontWeight: "500",
                    fontSize: "0.875rem",
                    textDecoration: "none",
                  }}
                >
                  ← Back to Login
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
