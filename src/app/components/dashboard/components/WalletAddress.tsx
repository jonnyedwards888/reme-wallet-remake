import React, { useState } from 'react';
import CopySVG from '../../../assets/svg/copy.svg';
import CopiedIcon from '../../../assets/svg/copied.svg';
import './WalletAddress.scss';

interface WalletAddressProps {
    address: string;
    copiedWalletAddress: boolean;
    copyWalletAddress: () => void;
}

export const WalletAddress: React.FC<WalletAddressProps> = ({
    address,
    copiedWalletAddress,
    copyWalletAddress
}) => {
    const [isAddressVisible, setIsAddressVisible] = useState(false);

    const toggleAddressVisibility = () => {
        setIsAddressVisible(!isAddressVisible);
    };

    const formatAddress = (addr: string) => {
        if (!addr) return '';
        return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
    };

    const fullAddress = address || '0xAFc8624723E6f3B8826096f47edcC7278ebeEB38';
    const convexAddress = '0x1234567890abcdef1234567890abcdefC0NVEX';

    return (
        <div className="wallet-address-sidebyside">
            <div className="wallet-address-container compact">
                <div className="wallet-address-label">Your Wallet address:</div>
                <div className="wallet-address-display">
                    <span className="address-text">
                        {isAddressVisible ? fullAddress : formatAddress(fullAddress)}
                    </span>
                    <div className="address-actions">
                        <button 
                            className="toggle-button"
                            onClick={toggleAddressVisibility}
                            title={isAddressVisible ? "Hide address" : "Show full address"}
                        >
                            {isAddressVisible ? "Hide" : "Show"}
                        </button>
                        {copiedWalletAddress ? (
                            <img src={CopiedIcon} alt="Copied" className="copy-icon" />
                        ) : (
                            <img 
                                src={CopySVG} 
                                alt="Copy address" 
                                className="copy-icon"
                                onClick={copyWalletAddress}
                            />
                        )}
                    </div>
                </div>
            </div>
            {/* Static Convex Wallet Address */}
            <div className="wallet-address-container convex-address compact">
                <div className="wallet-address-label">Convex Wallet address:</div>
                <div className="wallet-address-display">
                    <span className="address-text">
                        {formatAddress(convexAddress)}
                    </span>
                </div>
            </div>
        </div>
    );
}; 