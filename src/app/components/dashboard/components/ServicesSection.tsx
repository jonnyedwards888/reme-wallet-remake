import React from "react";
import CopiedIcon from "../../../assets/svg/copied.svg";
import CopySVG from "../../../assets/images/copy.svg";
import RAgencyLogo from "../../../assets/images/logos/remelifeagency.png";
import RCBLogo from "../../../assets/images/logos/remelifecomunity.png";
import MarketLogo from "../../../assets/images/logos/remelifemarket.png";
import LukiLogo from "../../../assets/images/logos/remelifelumi.png";
import { ServiceCard } from "./ServiceCard";
import "./ServicesSection.scss";

interface ServicesSectionProps {
  referralCode: string;
  copiedCode: boolean;
  copyReferralCode: () => void;
  address: string;
  copiedWalletAddress?: boolean;
  copyWalletAddress?: () => void;
  referralPlatformUserLink: string;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  referralCode,
  copiedCode,
  copyReferralCode,
  address,
  copiedWalletAddress = false,
  copyWalletAddress,
  referralPlatformUserLink,
}) => {
  return (
    <div className="services-section">
      {/* Explore More Section */}
      <div className="explore-more-section">
        <h3 className="explore-more-title">Explore More</h3>

        <div className="services-grid">
          {/* Community Builder Card */}
          <ServiceCard
            type="rcb"
            title="Community Builder"
            description="Earn REME tokens when you invite friends and family. Just copy and share the link below."
            tooltipMessage="The ReMeLife Community Builder (RCB) shows your network and lets you invite others to join and earn rewards."
            icon={
              <div className="modern-icon-container">
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16 21V19C16 17.9391 15.5786 16.9217 14.8284 16.1716C14.0783 15.4214 13.0609 15 12 15H6C4.93913 15 3.92172 15.4214 3.17157 16.1716C2.42143 16.9217 2 17.9391 2 19V21"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle
                    cx="9"
                    cy="7"
                    r="4"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <path
                    d="M22 21V19C22 18.1645 21.7155 17.3541 21.2094 16.7071C20.7033 16.0601 19.9999 15.6217 19.25 15.47"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89317 18.7122 8.75608 18.1676 9.45768C17.623 10.1593 16.8604 10.6597 16 10.88"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            }
            buttonText="VISIT RCB"
            buttonAction={() =>
              (window.location.href = referralPlatformUserLink)
            }
          >
            <div className="referral-input-container">
              <input
                className="referral-input"
                value={referralCode}
                readOnly
                onFocus={(e) => e.target.select()}
              />
              {copiedCode ? (
                <img src={CopiedIcon} alt="Show/hide" />
              ) : (
                <img src={CopySVG} alt="Show/hide" onClick={copyReferralCode} />
              )}
            </div>
          </ServiceCard>

          {/* DeFi Hub Card */}
          <ServiceCard
            type="ragency"
            title="DeFi Hub"
            description="Convert CAPs to REME, buy tokens, trade & stake REME"
            tooltipMessage="The ReMeLife Agency (RAgency) lets you convert CAPs, buy, trade & stake REME, and access DeFi offers."
            icon={
              <div className="modern-icon-container">
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 16V12"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 8H12.01"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            }
            buttonText="VISIT DEFI HUB"
            buttonAction={() => (window.location.href = "/convert-caps")}
            comingSoonBadge={true}
          />

          {/* Market Card */}
          <ServiceCard
            type="market"
            title="Market"
            description="Use your REME to redeem discounts, buy products and services"
            tooltipMessage="The ReMeLife Market is where you can spend your tokens and see special offers."
            icon={
              <div className="modern-icon-container">
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6 2L3 6V20C3 20.5304 3.21071 21.0391 3.58579 21.4142C3.96086 21.7893 4.46957 22 5 22H19C19.5304 22 20.0391 21.7893 20.4142 21.4142C20.7893 21.0391 21 20.5304 21 20V6L18 2H6Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M3 6H21"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M16 10C16 11.0609 15.5786 12.0783 14.8284 12.8284C14.0783 13.5786 13.0609 14 12 14C10.9391 14 9.92172 13.5786 9.17157 12.8284C8.42143 12.0783 8 11.0609 8 10"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            }
            buttonText="VISIT MARKET"
            buttonAction={() =>
              window.open(
                "https://remelife.com/rememarket/",
                "_blank",
                "noreferrer"
              )
            }
          />

          {/* Luki Card */}
          <ServiceCard
            type="luki"
            title="Luki"
            description="Earn, buy and convert LUKI tokens"
            tooltipMessage="Earn, buy and convert LUKI tokens."
            icon={
              <div className="modern-icon-container">
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            }
            buttonText="VISIT LUKI"
            comingSoon={true}
            comingSoonBadge={true}
          />
        </div>
      </div>

      {/* Claim Tokens Section */}
      <div className="claim-tokens-section">
        <ServiceCard
          type="claim"
          title="Claim Tokens"
          description="Claim your earned tokens and add them to your wallet balance."
          tooltipMessage="Claim your earned tokens and add them to your wallet balance."
          icon={
            <div className="modern-icon-container">
              <svg
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          }
          buttonText="CLAIM NOW"
          buttonAction={() => (window.location.href = "/claim")}
        />
      </div>
    </div>
  );
};
