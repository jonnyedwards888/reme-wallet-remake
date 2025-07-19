import React from 'react';
import { TooltipComponent } from '../../tooltip';
import { formatAmountTwoFraction } from '../../../../utils';
import {
  calculateCapsAvailable,
  calculateUnconvertedCapsValue,
  calculateConvertedRemeValue
} from '../../../../utils';
import './WalletBalance.scss';
import CircularIcon from '../../helpers/CircularIcon';
import { ReactComponent as RemeLogoLightSvg } from '../../../assets/svg/reme-logo-light.svg';

interface WalletBalanceProps {
  claimTokens: string;
  tokensForClaiming: string;
}

export const WalletBalance: React.FC<WalletBalanceProps> = ({ claimTokens, tokensForClaiming }) => {
  // Normalize values (assuming 18 decimals for CAPs)
  const DECIMALS = 18;
  const divisor = Math.pow(10, DECIMALS);

  const totalCapsEarned = Number(tokensForClaiming) / divisor; // normalized total CAPs earned
  const capsConverted = Number(claimTokens) / divisor; // normalized total CAPs already converted to REME
  const remeHeld = 500; // example: REME currently held
  const exchangeRate = 6.028; // example: CAPs to REME exchange rate
  const remePrice = 0.10; // example: REME price in £

  const capsAvailable = calculateCapsAvailable(totalCapsEarned, capsConverted);
  const unconvertedCapsValue = calculateUnconvertedCapsValue(capsAvailable, exchangeRate, remePrice);
  const convertedRemeValue = calculateConvertedRemeValue(remeHeld, remePrice);

  return (
    <div className="wallet-balance">
      <div className="wallet-balance-heading">WALLET TOKEN BALANCES</div>
      <div className="wallet-balance-container">
        <div className="balance-card">
          <CircularIcon backgroundColor="#252e65" className="caps-icon">
            <RemeLogoLightSvg />
          </CircularIcon>
          <div className="card-header">
            <div className="card-title">CAPS Earned</div>
            <TooltipComponent msg={'CAPs are earned from registration, referrals, and care actions.'} />
          </div>
          <div className="card-content">
            <div className="card-row">
              <span>CAPs from Registrations</span>
              <span>{formatAmountTwoFraction(String(claimTokens))}</span>
            </div>
            <div className="card-row">
              <span>CAPs from Referrals</span>
              <span>{formatAmountTwoFraction(String(parseFloat(tokensForClaiming) - parseFloat(claimTokens)))}</span>
            </div>
            <div className="card-row">
              <span>CAPs from Care Actions</span>
              <span>0.00</span>
            </div>
            <div className="card-row-total">
              <span>Total CAPs earned</span>
              <span>{formatAmountTwoFraction(String(tokensForClaiming))}</span>
            </div>
          </div>
        </div>
        <div className="balance-card">
          <div className="card-header">
            <div className="card-title">Your Unconverted CAPs Value</div>
            <TooltipComponent msg={'Shows the value of your unconverted CAPs.'} />
          </div>
          <div className="card-content">
            <div className="card-row">
              <span>CAPs to REME conversion rate</span>
              <span>{exchangeRate}</span>
            </div>
            <div className="card-row">
              <span>CAPs available for conversion</span>
              <span>{capsAvailable.toLocaleString()}</span>
            </div>
            <div className="card-row">
              <span>REME market price</span>
              <span>£{remePrice.toFixed(2)}</span>
            </div>
            <div className="card-row-total">
              <span>Value of unconverted CAPs</span>
              <span>£{unconvertedCapsValue.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
      {/* Convert Section */}
      <div className="convert-section">
        <button className="convert-button">
          CONVERT CAPS TO REME
        </button>
        <div className="reme-card">
          <CircularIcon backgroundColor="#ffef88" className="reme-icon">
            <RemeLogoLightSvg style={{ fill: '#e45e6a', color: '#e45e6a' }} />
          </CircularIcon>
          <div className="reme-content">
            <div className="card-header">
              <div className="card-title">Your Converted REME value</div>
              <TooltipComponent msg={'Shows your current REME balance and value.'} />
            </div>
            <div className="card-content">
              <div className="card-row">
                <span>REME unspent</span>
                <span>{remeHeld}</span>
              </div>
              <div className="card-row">
                <span>REME market price</span>
                <span>£{remePrice.toFixed(2)}</span>
              </div>
              <div className="card-row-total">
                <span>REME value now</span>
                <span>£{convertedRemeValue.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 