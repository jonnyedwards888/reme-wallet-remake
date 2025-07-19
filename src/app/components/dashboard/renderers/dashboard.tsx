import React from "react";
import ApplicationBackground from "../../../assets/images/background.6e81d4b2.jpg";
import NavIcon from "../../../assets/images/nav-icon.png";
import NavIconCross from "../../../assets/images/nav-icon-cross.png";
import Logo from "../../../assets/images/reme-logo.svg";
import { Logout } from "../../logout";
import { LogoutMobile } from "../../logout-mobile";
import "../dashboard.scss";
import { WalletBalance, ServicesSection, WalletAddress } from "../components";

export const DashboardRender = function (context: any) {
  // Debug logging for background issues
  console.log("=== DASHBOARD RENDER DEBUG ===");
  console.log("DashboardRender: Component rendering");
  console.log("DashboardRender: Setting background gradient");
  console.log("DashboardRender: Timestamp:", new Date().toISOString());

  // Check if we're on the dashboard route
  const isDashboard = window.location.pathname === "/dashboard";
  console.log("DashboardRender: Current path:", window.location.pathname);
  console.log("DashboardRender: Is dashboard:", isDashboard);
  console.log(
    "DashboardRender: Is page refresh:",
    performance.navigation.type === 1
  );

  // Log the computed styles to see what's actually applied
  setTimeout(() => {
    const appElement = document.querySelector(
      ".application.modern-dashboard-active"
    );
    if (appElement) {
      const computedStyle = window.getComputedStyle(appElement);
      console.log(
        "DashboardRender: 100ms computed background:",
        computedStyle.background
      );
      console.log(
        "DashboardRender: 100ms computed backgroundImage:",
        computedStyle.backgroundImage
      );
      console.log(
        "DashboardRender: 100ms computed backgroundColor:",
        computedStyle.backgroundColor
      );
      console.log("DashboardRender: Element classes:", appElement.className);
      console.log(
        "DashboardRender: Element inline style:",
        appElement.getAttribute("style")
      );
    } else {
      console.log(
        "DashboardRender: Could not find .application.modern-dashboard-active element"
      );
    }
  }, 100);

  // Log after longer delay to see if CSS overrides
  setTimeout(() => {
    const appElement = document.querySelector(
      ".application.modern-dashboard-active"
    );
    if (appElement) {
      const computedStyle = window.getComputedStyle(appElement);
      console.log(
        "DashboardRender: 300ms computed background:",
        computedStyle.background
      );
      console.log(
        "DashboardRender: 300ms computed backgroundImage:",
        computedStyle.backgroundImage
      );
    }
  }, 300);

  return (
    <>
      <div
        className="application modern-dashboard-active"
        style={{
          background:
            "linear-gradient(90deg, #1a0536 0%, rgb(83, 0, 39) 48%, #1a0536 100%) !important",
          backgroundImage: "none !important",
          minHeight: "100vh",
          width: "100%",
        }}
      >
        <section className="wrapper homepage">
          <div className="common-wrapper">
            <div className="top-header">
              <div className="title">
                <h1>
                  <img src={Logo} alt={"RemeLife"} />
                </h1>
              </div>
              <div className="nav-icon-box">
                <a
                  href={"https://remelife.com/"}
                  target="_blank"
                  rel="noreferrer"
                  className="btn secondary green"
                  onClick={() => {
                    window.open("https://remelife.com/");
                  }}
                >
                  ReMeLife
                </a>
                <a
                  href={"https://remelife.com/tokens/"}
                  target="_blank"
                  rel="noreferrer"
                  className="btn secondary green"
                  onClick={() => {
                    window.open("https://remelife.com/tokens/");
                  }}
                >
                  Need help?
                </a>
                <Logout
                  navigate={context.props.navigate}
                  email={context.state.email}
                />
                <img
                  className="nav-icon-mob"
                  id="nav-icon-click"
                  onClick={context.handleNavClick}
                  src={NavIcon}
                  alt={"RemeLife"}
                />
                <img
                  className="nav-icon-cross"
                  src={NavIconCross}
                  alt={"Reme"}
                />
                {context.state.isMenuVisible && (
                  <div
                    className="top-menu"
                    id="main-menu"
                    style={{ display: "block" }}
                  >
                    <ul>
                      <li>
                        <a
                          href="https://remelife.com/tokens/"
                          target="_blank"
                          rel="noreferrer"
                        >
                          Need help?
                        </a>
                      </li>
                      <li>
                        <a
                          href="https://remelife.com/"
                          target="_blank"
                          rel="noreferrer"
                        >
                          ReMeLife
                        </a>
                      </li>
                      <li>
                        <a
                          href="https://remelife.com/terms-and-conditions/"
                          target="_blank"
                          rel="noreferrer"
                        >
                          Terms & Conditions
                        </a>
                      </li>
                      <LogoutMobile
                        navigate={context.props.navigate}
                        email={context.state.email}
                      />
                    </ul>
                  </div>
                )}
              </div>
            </div>
            <div className="wallet-title">
              <span className="message">Hi, {context.state.full_name}</span>
            </div>

            {/* New Wallet Address Component */}
            <WalletAddress
              address={context.state.address}
              copiedWalletAddress={context.state.copiedWalletAddress}
              copyWalletAddress={context.copyWalletAddress}
            />

            {/* Wallet Balance Section */}
            <WalletBalance
              claimTokens={context.state.claimTokens}
              tokensForClaiming={context.state.tokensForClaiming}
            />

            {/* Services Section */}
            <ServicesSection
              referralCode={context.state.referralCode}
              copiedCode={context.state.copiedCode}
              copyReferralCode={context.copyReferralCode}
              address={context.state.address}
              copiedWalletAddress={context.state.copiedWalletAddress}
              copyWalletAddress={context.copyWalletAddress}
              referralPlatformUserLink={context.state.referralPlatformUserLink}
            />
          </div>

          <div className="terms-links">
            <a href="https://remelife.com/" target="_blank" rel="noreferrer">
              ReMeLife
            </a>{" "}
            |{" "}
            <a
              href={"https://remelife.com/terms-and-conditions/"}
              onClick={() => {
                window.open("https://remelife.com/terms-and-conditions/");
              }}
              target="_blank"
              rel="noreferrer"
            >
              Terms & Conditions
            </a>
          </div>
        </section>
      </div>
    </>
  );
};
