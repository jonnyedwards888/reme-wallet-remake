import React, { useState } from "react";
import { Copy, ChevronDown, ChevronUp } from "lucide-react";

interface WalletAddressesProps {
  userAddress: string;
  convexAddress?: string;
  copiedWalletAddress: boolean;
  copyWalletAddress: () => void;
}

export const WalletAddresses: React.FC<WalletAddressesProps> = ({
  userAddress,
  convexAddress = "0x1234567890abcdef1234567890abcdef12345678",
  copiedWalletAddress,
  copyWalletAddress,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const copyToClipboard = (address: string) => {
    navigator.clipboard.writeText(address);
    copyWalletAddress();
  };

  const formatAddress = (addr: string) => {
    if (!addr) return "";
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  return (
    <div className="wallet-addresses-card">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="addresses-toggle"
      >
        <span className="addresses-title">Wallet Addresses</span>
        {isExpanded ? (
          <ChevronUp className="icon" />
        ) : (
          <ChevronDown className="icon" />
        )}
      </button>

      {isExpanded && (
        <div className="addresses-content">
          <div className="address-row">
            <div className="address-info">
              <div className="address-type">Your Wallet</div>
              <div className="address-value">{formatAddress(userAddress)}</div>
            </div>
            <button
              onClick={() => copyToClipboard(userAddress)}
              className="copy-address-button"
              title="Copy address"
            >
              <Copy className="icon" />
            </button>
          </div>

          <div className="address-row">
            <div className="address-info">
              <div className="address-type">Convex Wallet</div>
              <div className="address-value">
                {formatAddress(convexAddress)}
              </div>
            </div>
            <button
              onClick={() => copyToClipboard(convexAddress)}
              className="copy-address-button"
              title="Copy address"
            >
              <Copy className="icon" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
