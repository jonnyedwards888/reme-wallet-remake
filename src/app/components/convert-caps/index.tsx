import React, { useState, useEffect } from "react";
import ApplicationBackground from "../../assets/images/background.6e81d4b2.jpg";
import Logo from "../../assets/images/reme-logo.svg";
import { ReactComponent as RemeLogoLightSvg } from "../../assets/svg/reme-logo-light.svg";
import "./convert-caps.scss";
import { calculateCapsAvailable } from "../../../utils";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import CircularIcon from "../helpers/CircularIcon";
import { WalletAddress } from "../dashboard/components/WalletAddress";
import { Link } from 'react-router-dom';

const ConvertCaps = () => {
  // Get user from localStorage (as set by the dashboard)
  let user: any = {};
  try {
    user = JSON.parse(localStorage.getItem("user") || "{}");
  } catch (e) {
    user = {};
  }

  // Extract values, fallback to '0' if missing
  const rawTotalCapsEarned = user?.rrpBalance || "0";
  const rawCapsConverted = user?.earnedTokens?.signup || "0";
  const rawRemeHeld = user?.remeHeld || "0"; // If you have this field, otherwise use '0'

  // Use 18 decimals for normalization
  const DECIMALS = 18;
  const divisor = Math.pow(10, DECIMALS);

  const totalCapsEarned = Number(rawTotalCapsEarned) / divisor;
  const capsConverted = Number(rawCapsConverted) / divisor;
  const remeHeld = Number(rawRemeHeld) / divisor;

  // Use real or fallback values for rates/prices
  const exchangeRate = 6.03;
  const remePrice = user?.remePrice || 0.1;

  const capsAvailable = calculateCapsAvailable(totalCapsEarned, capsConverted);

  // For demo, set max CAPs to convert to 1000 or capsAvailable, whichever is lower
  const maxCapsToConvert = Math.floor(capsAvailable); // Ensure integer
  const [capsToConvert, setCapsToConvert] = useState(
    Math.min(1000, maxCapsToConvert)
  );
  const [sliderValue, setSliderValue] = useState(
    Math.min(1000, maxCapsToConvert)
  );
  const [conversionCompleted, setConversionCompleted] = useState(false);
  const [isConverting, setIsConverting] = useState(false);

  // Clamp values if capsAvailable changes
  useEffect(() => {
    if (capsToConvert > maxCapsToConvert) {
      setCapsToConvert(maxCapsToConvert);
    }
    if (sliderValue > maxCapsToConvert) {
      setSliderValue(maxCapsToConvert);
    }
  }, [maxCapsToConvert, capsToConvert, sliderValue]);

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = Math.floor(Number(e.target.value));
    if (isNaN(value) || value < 0) value = 0;
    if (value > maxCapsToConvert) value = maxCapsToConvert;
    setCapsToConvert(value);
    setSliderValue(value);
  };

  // Handle slider change
  const handleSliderChange = (value: number | number[]) => {
    const numValue = Array.isArray(value) ? value[0] : value;
    const intValue = Math.floor(Number(numValue));
    setSliderValue(intValue);
    setCapsToConvert(intValue);
  };

  // Handle MAX button click
  const handleMaxClick = () => {
    setCapsToConvert(maxCapsToConvert);
    setSliderValue(maxCapsToConvert);
  };

  // Handle convert button click
  const handleConvertClick = async () => {
    if (capsToConvert <= 0) return;

    setIsConverting(true);

    // Simulate conversion process (replace with actual API call)
    try {
      // TODO: Replace with actual conversion API call
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate 2 second delay

      setConversionCompleted(true);
      // Reset conversion status after 5 seconds
      setTimeout(() => {
        setConversionCompleted(false);
      }, 5000);
    } catch (error) {
      // console.error("Conversion failed:", error);
      // Handle error case here
    } finally {
      setIsConverting(false);
    }
  };

  // Calculations for the fields
  const remeYouReceive = capsToConvert / exchangeRate;
  const availableForMarket = Math.min(capsToConvert, 1000) / exchangeRate;
  const fiatCeilingDisplay = "1,000 REME";
  const availableForSwap =
    capsToConvert > 1000 ? (capsToConvert - 1000) / exchangeRate : 0;
  const remeHeldAfter = remeHeld + remeYouReceive;
  const poundValueAfter = remeHeldAfter * remePrice;

  // Get wallet address from localStorage or use a placeholder
  const [copiedWalletAddress, setCopiedWalletAddress] = useState(false);
  const userAddress =
    user?.address || "0xAFc8624723E6f3B8826096f47edcC7278ebeEB38";
  const copyWalletAddress = () => {
    navigator.clipboard.writeText(userAddress);
    setCopiedWalletAddress(true);
    setTimeout(() => setCopiedWalletAddress(false), 2000);
  };

  // Get referralPlatformUserLink for Community button
  const referralPlatformUserLink = user?.referralPlatformUserLink || process.env.REACT_APP_REMEPAL_PLATFORM || '#';

  return (
    <div
      className="application"
      style={{ backgroundImage: `url(${ApplicationBackground})` }}
    >
      <div
        className="page-header"
        style={{ display: "flex", alignItems: "center", marginBottom: 24 }}
      >
        <button
          className="btn secondary green back-to-wallet-btn"
          onClick={() => (window.location.href = "/dashboard")}
        >
          ← Back to Wallet
        </button>
      </div>
      <section className="wrapper homepage">
        <div className="common-wrapper">
          {/* Header Section */}
          <div className="top-header">
            <div className="title">
              <h1>
                <img src={Logo} alt={"RemeLife"} />
              </h1>
            </div>
            <div className="nav-icon-box">
              <a
                href="https://remelife.com/"
                target="_blank"
                rel="noreferrer"
                className="btn secondary green"
              >
                ReMeLife
              </a>
              <a
                href="https://remelife.com/tokens/"
                target="_blank"
                rel="noreferrer"
                className="btn secondary green"
              >
                Need help?
              </a>
              <button className="btn secondary green">Logout</button>
            </div>
          </div>

          <div className="convert-caps-header-container">
            <div
              className="agency-nav-bar"
              style={{
                display: "flex",
                gap: 32,
                justifyContent: "center",
                alignItems: "center",
                marginTop: 32,
                marginBottom: 24,
              }}
            >
              <Link to="/dashboard" className="agency-nav-btn wallet">Wallet</Link>
              <a href={referralPlatformUserLink} className="agency-nav-btn community">Community</a>
              <Link to="/convert-caps" className="agency-nav-btn ragency">RAgency</Link>
              <a href="https://remelife.com/rememarket/" target="_blank" rel="noopener noreferrer" className="agency-nav-btn market">Market</a>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <WalletAddress
                address={userAddress}
                copiedWalletAddress={copiedWalletAddress}
                copyWalletAddress={copyWalletAddress}
              />
            </div>
          </div>

          {/* Main Blue Background Section */}
          <div className="agency-blue-bg">
            {/* Main Title */}
            <div className="wallet-title">
              <span className="message">The ReMeLife Agency (RAgency)</span>
            </div>

            {/* Balance Summary Cards */}
            <div className="balance-summary">
              <div className="card-with-icon">
                <div className="balance-card caps-card">
                  <CircularIcon
                    backgroundColor="#252e65"
                    className="card-circular-icon"
                  >
                    <RemeLogoLightSvg />
                  </CircularIcon>
                  <div className="card-header">
                    <div className="card-title">CAPs Available</div>
                  </div>
                  <div className="card-content">
                    <div className="balance-value">{capsAvailable}</div>
                    <div className="balance-label">Available to convert</div>
                  </div>
                </div>
              </div>

              <div className="card-with-icon">
                <div className="balance-card reme-card">
                  <CircularIcon
                    backgroundColor="#ffef88"
                    className="card-circular-icon"
                  >
                    <RemeLogoLightSvg
                      style={{ fill: "#e45e6a", color: "#e45e6a" }}
                    />
                  </CircularIcon>
                  <div className="card-header">
                    <div className="card-title">REME Held</div>
                  </div>
                  <div className="card-content">
                    <div className="balance-value">{remeHeld}</div>
                    <div className="balance-label">Current REME balance</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Convert Card */}
            <div className="convert-section">
              <div className="convert-card">
                <div className="convert-card-header">
                  <div className="convert-card-title">
                    Convert CAPs to REMEs
                  </div>
                  <div className="convert-card-subtitle">
                    Exchange your CAPs for REME tokens
                  </div>
                </div>

                <div className="convert-card-body">
                  <div className="convert-input-section">
                    <label className="convert-input-label">
                      Enter CAPs to convert
                    </label>
                    <div className="convert-input-wrapper">
                      <input
                        type="number"
                        className="convert-input-field"
                        value={capsToConvert}
                        min={0}
                        max={maxCapsToConvert}
                        onChange={handleInputChange}
                        style={{
                          color:
                            capsToConvert === maxCapsToConvert
                              ? "red"
                              : undefined,
                          fontWeight:
                            capsToConvert === maxCapsToConvert
                              ? "bold"
                              : undefined,
                        }}
                      />
                      <span className="convert-input-suffix">CAPs</span>
                      <button
                        type="button"
                        className="max-btn"
                        onClick={handleMaxClick}
                      >
                        MAX
                      </button>
                    </div>
                    <div style={{ width: "100%", marginTop: 8 }}>
                      <Slider
                        min={0}
                        max={maxCapsToConvert}
                        value={sliderValue}
                        onChange={handleSliderChange}
                        step={1}
                        trackStyle={{ backgroundColor: "#007aff", height: 8 }}
                        handleStyle={{
                          borderColor: "#007aff",
                          height: 28,
                          width: 28,
                          marginTop: -10,
                          backgroundColor: "#007aff",
                        }}
                        railStyle={{ backgroundColor: "#e0e0e0", height: 8 }}
                      />
                    </div>
                  </div>

                  <div className="convert-details">
                    <div className="convert-row">
                      <span className="convert-label">
                        CAPs to REME conversion rate
                      </span>
                      <span className="convert-value">
                        £{exchangeRate.toFixed(2)}
                      </span>
                    </div>
                    <div className="convert-row">
                                              <span className="convert-label">REME you&apos;ll receive</span>
                      <span className="convert-value">
                        {remeYouReceive.toFixed(0)} REME
                      </span>
                    </div>
                    <div
                      className="convert-row"
                      style={{
                        borderBottom: "1px solid #000",
                        fontWeight: "bold",
                      }}
                    >
                      <span className="convert-label">
                        Available for ReMe Market Use
                      </span>
                      <span className="convert-value">
                        {availableForMarket.toFixed(0)} REME
                      </span>
                    </div>
                    <div className="convert-row">
                      <span className="convert-label">Fiat ceiling</span>
                      <span className="convert-value">
                        {fiatCeilingDisplay}
                      </span>
                    </div>
                    <div
                      className="convert-row"
                      style={{
                        borderBottom: "1px solid #000",
                        fontWeight: "bold",
                      }}
                    >
                      <span className="convert-label">
                        Available for swap/cashout
                      </span>
                      <span className="convert-value">
                        {availableForSwap.toFixed(2)} REME
                      </span>
                    </div>
                    <div className="convert-row">
                      <span className="convert-label">
                        REME held after conversion
                      </span>
                      <span
                        className="convert-value"
                        style={{ color: "green", fontWeight: "bold" }}
                      >
                        {remeHeldAfter.toFixed(0)} REME
                      </span>
                    </div>
                    <div className="convert-row">
                      <span className="convert-label"></span>
                      <span
                        className="convert-value"
                        style={{ color: "green", fontWeight: "bold" }}
                      >
                        £{poundValueAfter.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <button
                    className="convert-btn"
                    onClick={handleConvertClick}
                    disabled={isConverting || capsToConvert <= 0}
                  >
                    <span>
                      {isConverting ? "Converting..." : "Convert Now"}
                    </span>
                  </button>

                  {conversionCompleted && (
                    <div className="convert-status">
                      <div className="status-message success">
                        <span className="status-icon">✓</span>
                        <span>Conversion completed successfully</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Updated Balance Summary */}
            <div className="balance-summary bottom-summary">
              <div className="card-with-icon">
                <div className="balance-card caps-card">
                  <CircularIcon
                    backgroundColor="#252e65"
                    className="card-circular-icon"
                  >
                    <RemeLogoLightSvg />
                  </CircularIcon>
                  <div className="card-header">
                    <div className="card-title">Unconverted CAPs</div>
                  </div>
                  <div className="card-content">
                    <div className="balance-value">
                      {(capsAvailable - capsToConvert).toLocaleString()}
                    </div>
                    <div className="balance-label">Remaining balance</div>
                  </div>
                </div>
              </div>

              <div className="card-with-icon">
                <div className="balance-card reme-card">
                  <CircularIcon
                    backgroundColor="#ffef88"
                    className="card-circular-icon"
                  >
                    <RemeLogoLightSvg
                      style={{ fill: "#e45e6a", color: "#e45e6a" }}
                    />
                  </CircularIcon>
                  <div className="card-header">
                    <div className="card-title">Total REMEs</div>
                  </div>
                  <div className="card-content">
                    <div className="balance-value">
                      {(remeHeld + capsToConvert / exchangeRate).toFixed(2)}
                    </div>
                    <div className="balance-label">After conversion</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* End Main Blue Background Section */}
        </div>
      </section>
    </div>
  );
};

export default ConvertCaps;
