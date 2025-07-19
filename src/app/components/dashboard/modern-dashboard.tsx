import React, { Component, ReactNode } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  LogOut,
  Send,
  ShoppingCart,
  TrendingUp,
  Users,
  Shield,
  ShoppingBag,
  Sparkles,
  Info,
} from "lucide-react";

import { clearLocalStorage } from "../helpers";
import { BalanceService, UserService } from "../../../services";
import { ErrorPopUp } from "../../errors";
import { formatAmountTwoFraction } from "../../../utils";
import { CircularProgress } from "./components/CircularProgress";
import { SwapModal } from "./components/SwapModal";
import { WalletAddresses } from "./components/WalletAddresses";

// Import the new modern styles
import "../../../styles/modern-wallet.scss";

type State = {
  email: string;
  address: string;
  ethBalance: any;
  tokensBalance: any;
  referralCode: string;
  referralPlatformUserLink: string;
  claimTokens: any;
  tokensForClaiming: string;
  copiedCode: boolean;
  copiedWalletAddress: boolean;
  txBroadcasted: boolean;
  full_name: string;
  isMenuVisible: boolean;
  isSwapModalOpen: boolean;
};

// Wrapper component to provide router hooks
const ModernDashboardWrapper = () => {
  const navigate = useNavigate();
  const location = useLocation();
  return <ModernDashboard navigate={navigate} location={location} />;
};

class ModernDashboard extends Component<
  { navigate: any; location: any },
  State
> {
  public constructor(props: any) {
    super(props);

    this.claim = this.claim.bind(this);
    this.copyReferralCode = this.copyReferralCode.bind(this);
    this.copyWalletAddress = this.copyWalletAddress.bind(this);
    this.handleNavClick = this.handleNavClick.bind(this);
    this.handleLogout = this.handleLogout.bind(this);

    const txBroadcasted =
      this.props.location.state && this.props.location.state.txBroadcasted;
    if (txBroadcasted) {
      let state = { ...this.props.location.state };
      delete state.txBroadcasted;
      this.props.navigate(this.props.location.pathname, {
        state,
        replace: true,
      });
    }

    this.state = {
      email: "",
      address: "",
      ethBalance: {},
      tokensBalance: {},
      referralCode: "",
      referralPlatformUserLink: "",
      claimTokens: {},
      tokensForClaiming: "0.0000",
      copiedCode: false,
      copiedWalletAddress: false,
      txBroadcasted,
      full_name: "",
      isMenuVisible: false,
      isSwapModalOpen: false,
    };
  }

  public async componentDidMount() {
    try {
      const token = localStorage.getItem("token") || "";
      const encToken = localStorage.getItem("encToken");

      const user = await UserService.getUserDetails(
        token,
        localStorage.getItem("refferal") === "true" ? true : false
      );
      localStorage.setItem("user", JSON.stringify(user));

      const ethBalance = await BalanceService.ethAmount(user.wallet.address);
      const tokensBalance = await BalanceService.tokensAmount(
        user.wallet.address
      );

      if (localStorage.getItem("refferal") === "true") {
        ErrorPopUp.sucsess("Congratulations you've earned 20 CAPs.");
        localStorage.setItem("refferal", "false");
      }

      this.setState({
        email: user.email,
        address: user.wallet.address,
        ethBalance,
        tokensBalance,
        referralCode: `${window.location.protocol}//${window.location.host}/registration/${user.referralLink}`,
        referralPlatformUserLink: `${process.env.REACT_APP_REMEPAL_PLATFORM}?authtoken=${encodeURIComponent(encToken || "")}`,
        claimTokens: user.earnedTokens.signup,
        tokensForClaiming: user.rrpBalance,
        full_name: user.full_name,
      });
    } catch (error) {
      clearLocalStorage(this.props.navigate);
    }
  }

  public render(): ReactNode {
    console.log("Rendering Modern Dashboard!");
    console.log("Background style applied:", {
      background:
        "linear-gradient(90deg, #1a0536 0%, rgb(83, 0, 39) 48%, #1a0536 100%)",
      minHeight: "100vh",
      width: "100%",
    });

    const {
      full_name,
      address,
      ethBalance,
      tokensBalance,
      tokensForClaiming,
      txBroadcasted,
    } = this.state;

    // Calculate balances using proper formatting
    const capsBalance = formatAmountTwoFraction(
      String(tokensBalance?.pure || 0)
    );
    const remeBalance = formatAmountTwoFraction(
      String(tokensBalance?.reme || 0)
    );
    const ethBalanceValue = formatAmountTwoFraction(
      String(ethBalance?.pure || 0)
    );

    // Calculate referral CAPs (total - signup)
    const totalCapsEarned = parseFloat(tokensForClaiming);
    const signupCaps = parseFloat(this.state.claimTokens?.signup || "0");
    const referralCaps = totalCapsEarned - signupCaps;

    // Mock values for now (you can replace with real data)
    const remeValueGBP = parseFloat(remeBalance) * 0.1; // Mock conversion rate
    const remeMarketPrice = 0.1; // Mock market price

    return (
      <>
        <div className="wallet-page" data-modern-dashboard="true">
          {/* Header */}
          <header className="wallet-header">
            <div>
              <h1 className="wallet-title">ReMeLife Wallet</h1>
            </div>
            <button className="logout-button" onClick={this.handleLogout}>
              <LogOut className="icon" />
              Logout
            </button>
          </header>

          {/* Main Content */}
          <main className="wallet-main">
            {/* User Greeting */}
            <div className="user-greeting">
              <h2 className="greeting-title">Hi, {full_name || "User"}</h2>
            </div>

            {/* Wallet Addresses */}
            <div className="wallet-addresses-section">
              <WalletAddresses
                userAddress={address}
                copiedWalletAddress={this.state.copiedWalletAddress}
                copyWalletAddress={this.copyWalletAddress}
              />
            </div>

            {/* CAPs Breakdown */}
            <div className="breakdown-card breakdown-flex">
              {/* Left: Earnings Breakdown Info */}
              <div className="breakdown-info">
                <h3 className="breakdown-title">Total CAPs Earned</h3>
                <div className="breakdown-list">
                  <div className="breakdown-item">
                    <span className="breakdown-label">
                      CAPs from Registrations
                    </span>
                    <span className="breakdown-value">
                      {this.state.claimTokens?.signup || 0}
                    </span>
                  </div>
                  <div className="breakdown-item">
                    <span className="breakdown-label">
                      CAPs from Registrations
                    </span>
                    <span className="breakdown-value">
                      {formatAmountTwoFraction(
                        String(this.state.claimTokens?.signup || 0)
                      )}
                    </span>
                  </div>
                  <div className="breakdown-item">
                    <span className="breakdown-label">CAPs from Referrals</span>
                    <span className="breakdown-value">
                      {formatAmountTwoFraction(String(referralCaps))}
                    </span>
                  </div>
                  <div className="breakdown-item">
                    <span className="breakdown-label">
                      CAPs from Care Actions
                    </span>
                    <span className="breakdown-value">
                      {formatAmountTwoFraction(
                        String(this.state.claimTokens?.care || 0)
                      )}
                    </span>
                  </div>
                  <div className="breakdown-total">
                    <span className="breakdown-total-label">
                      Total CAPs Earned
                    </span>
                    <span className="breakdown-total-value">{capsBalance}</span>
                  </div>
                </div>
              </div>
              {/* Right: Glowing Animated Orb - Balance Only */}
              <div className="breakdown-orb">
                <div className="circular-progress">
                  <div className="caps-circle-glow"></div>
                  <div className="caps-ambient-glow"></div>
                  <div className="caps-outer-glow"></div>
                  <div className="caps-inner-glow"></div>
                  <div className="caps-radial-overlay-layer2"></div>
                  <div className="caps-radial-overlay"></div>
                  <div className="caps-pulse-glow"></div>
                  <div className="caps-sparkle-glow"></div>
                  <CircularProgress
                    value={capsBalance}
                    max={capsBalance}
                    size={280}
                    strokeWidth={20}
                    className="no-progress-percentage"
                    label="CAPS"
                  />
                </div>
              </div>
            </div>

            {/* Section spacing */}
            <div style={{ height: "2.5rem" }}></div>

            {/* Balances Section Header */}
            <div className="balances-section-header">Balances</div>

            {/* Minimalist Balance Cards Row */}
            <div className="balance-cards-row">
              {/* CAPs Balance Card */}
              <div className="balance-flat-card balance-flat-card-center-text">
                <div className="balance-flat-label balance-flat-label-center-text">
                  CAPS
                </div>
                <div className="balance-flat-value balance-flat-value-center-text">
                  {capsBalance}
                </div>
                <button
                  className="rewards-hub-button rewards-hub-button-balance rewards-hub-disabled"
                  style={{
                    marginTop: "1.2rem",
                    width: "100%",
                    textDecoration: "line-through",
                    opacity: 0.6,
                    cursor: "not-allowed",
                  }}
                  disabled
                >
                  Rewards Hub
                </button>
                <div
                  className="rewards-hub-coming-soon"
                  style={{
                    width: "100%",
                    textAlign: "center",
                    marginTop: "0.75rem",
                  }}
                >
                  <span className="coming-soon-badge">COMING SOON</span>
                </div>
              </div>

              {/* Swap Button Section */}
              <div className="swap-flat-section">
                <button
                  onClick={() => this.setState({ isSwapModalOpen: true })}
                  className="swap-flat-button"
                >
                  CAPs ⇄ REME
                </button>
              </div>

              {/* REME Balance Card */}
              <div className="balance-flat-card">
                <div className="balance-flat-label">REME</div>
                <div className="balance-flat-value">{remeBalance}</div>
                <div className="reme-flat-stats">
                  <div className="reme-flat-stat">
                    <span className="reme-flat-stat-label">Current Value</span>
                    <span className="reme-flat-stat-value">
                      £{remeValueGBP.toFixed(2)}
                    </span>
                  </div>
                  <div className="reme-flat-stat">
                    <span className="reme-flat-stat-label">Market Price</span>
                    <span className="reme-flat-stat-value">
                      £{remeMarketPrice.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Services Section */}
            <div className="services-section">
              <h3 className="services-title">Explore More</h3>

              <div
                className="services-grid"
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(2, 1fr)",
                  gap: "32px",
                  maxWidth: "1200px",
                  margin: "0 auto",
                  padding: "0 24px",
                }}
              >
                {/* Community Builder */}
                <div
                  className="service-card"
                  style={{ cursor: "pointer" }}
                  onClick={() => (window.location.href = "/community-builder")}
                >
                  <div className="service-content" style={{ padding: "24px" }}>
                    <div
                      className="service-header"
                      style={{
                        marginBottom: "20px",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <img
                        src="/PureCSS-Wallet-Design/public/logos/Community-builder-icon.png"
                        alt="Community Builder"
                        style={{
                          width: "48px",
                          height: "48px",
                          borderRadius: "8px",
                          flexShrink: 0,
                          marginRight: "4px",
                        }}
                      />
                      <h4
                        className="service-title"
                        style={{ margin: 0, fontSize: "20px" }}
                      >
                        Community Builder
                      </h4>
                    </div>
                    <p
                      className="service-description"
                      style={{ marginBottom: "24px", lineHeight: "1.5" }}
                    >
                      Earn REME tokens when you invite friends and family
                    </p>
                    <button
                      className="service-button"
                      style={{
                        background:
                          "linear-gradient(to right, #a855f7, #8b5cf6)",
                      }}
                    >
                      VISIT RCB
                    </button>
                  </div>
                </div>

                {/* DeFi Hub */}
                <div className="service-card">
                  <div className="service-content" style={{ padding: "24px" }}>
                    <div
                      className="service-header"
                      style={{
                        marginBottom: "20px",
                        display: "flex",
                        alignItems: "center",
                        gap: "2px",
                      }}
                    >
                      <img
                        src="/PureCSS-Wallet-Design/public/logos/Defi-Hub-Icon.png"
                        alt="DeFi Hub"
                        style={{
                          width: "48px",
                          height: "48px",
                          borderRadius: "8px",
                          flexShrink: 0,
                          marginRight: "4px",
                        }}
                      />
                      <h4
                        className="service-title"
                        style={{ margin: 0, fontSize: "20px" }}
                      >
                        DeFi Hub
                      </h4>
                    </div>
                    <p
                      className="service-description"
                      style={{ marginBottom: "24px", lineHeight: "1.5" }}
                    >
                      Convert CAPs to REME, buy tokens, trade & stake REME
                    </p>
                    <button
                      className="service-button"
                      style={{
                        background:
                          "linear-gradient(to right, #a855f7, #8b5cf6)",
                        marginTop: "1.2rem",
                        width: "100%",
                        textDecoration: "line-through",
                        opacity: 0.6,
                        cursor: "not-allowed",
                      }}
                      disabled
                    >
                      VISIT DEFI HUB
                    </button>
                    <div
                      className="rewards-hub-coming-soon"
                      style={{
                        width: "100%",
                        textAlign: "center",
                        marginTop: "0.75rem",
                      }}
                    >
                      <span className="coming-soon-badge">COMING SOON</span>
                    </div>
                  </div>
                </div>

                {/* Market */}
                <div className="service-card">
                  <div className="service-content" style={{ padding: "24px" }}>
                    <div
                      className="service-header"
                      style={{
                        marginBottom: "20px",
                        display: "flex",
                        alignItems: "center",
                        gap: "2px",
                      }}
                    >
                      <img
                        src="/PureCSS-Wallet-Design/public/logos/Reme-market-icon.png"
                        alt="Market"
                        style={{
                          width: "48px",
                          height: "48px",
                          borderRadius: "8px",
                          flexShrink: 0,
                          marginRight: "4px",
                        }}
                      />
                      <h4
                        className="service-title"
                        style={{ margin: 0, fontSize: "20px" }}
                      >
                        Market
                      </h4>
                    </div>
                    <p
                      className="service-description"
                      style={{ marginBottom: "24px", lineHeight: "1.5" }}
                    >
                      Use your REME to redeem discounts, buy products and
                      services
                    </p>
                    <button
                      className="service-button"
                      style={{
                        background:
                          "linear-gradient(to right, #a855f7, #8b5cf6)",
                      }}
                    >
                      VISIT MARKET
                    </button>
                  </div>
                </div>

                {/* Luki */}
                <div className="service-card">
                  <div className="service-content" style={{ padding: "24px" }}>
                    <div
                      className="service-header"
                      style={{
                        marginBottom: "20px",
                        display: "flex",
                        alignItems: "center",
                        gap: "2px",
                      }}
                    >
                      <img
                        src="/PureCSS-Wallet-Design/public/logos/lumi-main-logo.png"
                        alt="Luki"
                        style={{
                          width: "48px",
                          height: "48px",
                          borderRadius: "8px",
                          flexShrink: 0,
                          marginRight: "4px",
                        }}
                      />
                      <h4
                        className="service-title"
                        style={{ margin: 0, fontSize: "20px" }}
                      >
                        Luki
                      </h4>
                    </div>
                    <p
                      className="service-description"
                      style={{ marginBottom: "24px", lineHeight: "1.5" }}
                    >
                      Earn, buy and convert LUKI tokens
                    </p>
                    <button
                      className="service-button"
                      style={{
                        background:
                          "linear-gradient(to right, #a855f7, #8b5cf6)",
                        marginTop: "1.2rem",
                        width: "100%",
                        textDecoration: "line-through",
                        opacity: 0.6,
                        cursor: "not-allowed",
                      }}
                      disabled
                    >
                      VISIT LUKI
                    </button>
                    <div
                      className="rewards-hub-coming-soon"
                      style={{
                        width: "100%",
                        textAlign: "center",
                        marginTop: "0.75rem",
                      }}
                    >
                      <span className="coming-soon-badge">COMING SOON</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Transaction Status */}
            {txBroadcasted && (
              <div
                className="balance-flat-card"
                style={{ marginTop: "2rem", textAlign: "center" }}
              >
                <div className="balance-flat-label">Transaction Status</div>
                <div
                  className="balance-flat-value"
                  style={{ color: "#10b981" }}
                >
                  Processing...
                </div>
                <p
                  style={{
                    color: "rgba(255,255,255,0.8)",
                    marginTop: "0.5rem",
                  }}
                >
                  Your transaction is being processed on the blockchain
                </p>
              </div>
            )}
          </main>

          {/* Swap Modal */}
          <SwapModal
            isOpen={this.state.isSwapModalOpen}
            onClose={() => this.setState({ isSwapModalOpen: false })}
            capsBalance={capsBalance}
            remeBalance={remeBalance}
          />
        </div>
      </>
    );
  }

  public async claim() {
    this.props.navigate("/claim", {
      state: {
        ethBalance: this.state.ethBalance.pure,
      },
    });
  }

  public handleNavClick() {
    this.setState({ isMenuVisible: !this.state.isMenuVisible });
  }

  public handleLogout() {
    clearLocalStorage(this.props.navigate);
  }

  public copyWalletAddress() {
    navigator.clipboard.writeText(this.state.address);
    this.setState({ copiedWalletAddress: true });
    setTimeout(() => this.setState({ copiedWalletAddress: false }), 2000);
  }

  public copyReferralCode() {
    navigator.clipboard.writeText(this.state.referralCode);
    this.setState({ copiedCode: true });
    setTimeout(() => this.setState({ copiedCode: false }), 2000);
  }
}

export default ModernDashboardWrapper;
