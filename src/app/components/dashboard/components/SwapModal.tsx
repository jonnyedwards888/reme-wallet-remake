import React, { useState } from "react";
import { X, ArrowDownUp } from "lucide-react";

interface SwapModalProps {
  isOpen: boolean;
  onClose: () => void;
  capsBalance: string;
  remeBalance: string;
}

export const SwapModal: React.FC<SwapModalProps> = ({
  isOpen,
  onClose,
  capsBalance,
  remeBalance,
}) => {
  const [amount, setAmount] = useState("");
  const [conversionRate] = useState(2.5); // 1 CAP = 2.5 REME

  if (!isOpen) return null;

  const handleSwap = () => {
    // TODO: Implement actual swap functionality
    console.log(`Swapping ${amount} CAPs to REME`);
    onClose();
  };

  const calculateOutput = () => {
    const inputAmount = parseFloat(amount) || 0;
    return (inputAmount * conversionRate).toFixed(2);
  };

  return (
    <div
      className="modal-overlay"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
    >
      <div
        className="modal-content"
        style={{
          background: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(8px)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          borderRadius: "1rem",
          padding: "2rem",
          maxWidth: "400px",
          width: "90%",
          color: "white",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "1.5rem",
          }}
        >
          <h2 style={{ margin: 0, fontSize: "1.5rem", fontWeight: "bold" }}>
            Swap CAPs to REME
          </h2>
          <button
            onClick={onClose}
            style={{
              background: "transparent",
              border: "none",
              color: "white",
              cursor: "pointer",
              padding: "0.5rem",
            }}
          >
            <X size={24} />
          </button>
        </div>

        {/* Input Amount */}
        <div style={{ marginBottom: "1.5rem" }}>
          <label
            style={{
              display: "block",
              marginBottom: "0.5rem",
              fontSize: "0.875rem",
            }}
          >
            You Pay
          </label>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              borderRadius: "0.5rem",
              padding: "0.75rem",
            }}
          >
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              style={{
                flex: 1,
                background: "transparent",
                border: "none",
                color: "white",
                fontSize: "1.125rem",
                outline: "none",
              }}
            />
            <span style={{ marginLeft: "0.5rem", fontSize: "0.875rem" }}>
              CAPs
            </span>
            <button
              onClick={() => setAmount(capsBalance)}
              style={{
                marginLeft: "0.5rem",
                background: "rgba(59, 130, 246, 0.3)",
                border: "none",
                color: "white",
                padding: "0.25rem 0.5rem",
                borderRadius: "0.25rem",
                fontSize: "0.75rem",
                cursor: "pointer",
              }}
            >
              MAX
            </button>
          </div>
          <div
            style={{ fontSize: "0.75rem", opacity: 0.7, marginTop: "0.25rem" }}
          >
            Balance: {capsBalance} CAPs
          </div>
        </div>

        {/* Swap Icon */}
        <div style={{ textAlign: "center", margin: "1rem 0" }}>
          <ArrowDownUp size={24} color="rgba(255, 255, 255, 0.7)" />
        </div>

        {/* Output Amount */}
        <div style={{ marginBottom: "1.5rem" }}>
          <label
            style={{
              display: "block",
              marginBottom: "0.5rem",
              fontSize: "0.875rem",
            }}
          >
            You Receive
          </label>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              borderRadius: "0.5rem",
              padding: "0.75rem",
            }}
          >
            <span style={{ flex: 1, fontSize: "1.125rem" }}>
              {calculateOutput()}
            </span>
            <span style={{ fontSize: "0.875rem" }}>REME</span>
          </div>
        </div>

        {/* Conversion Rate */}
        <div
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.05)",
            borderRadius: "0.5rem",
            padding: "0.75rem",
            marginBottom: "1.5rem",
            fontSize: "0.875rem",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span>Conversion Rate:</span>
            <span>1 CAP = {conversionRate} REME</span>
          </div>
        </div>

        {/* Swap Button */}
        <button
          onClick={handleSwap}
          disabled={!amount || parseFloat(amount) <= 0}
          style={{
            width: "100%",
            padding: "1rem",
            background: "rgba(59, 130, 246, 0.3)",
            border: "1px solid rgba(59, 130, 246, 0.5)",
            borderRadius: "0.5rem",
            color: "white",
            fontSize: "1rem",
            fontWeight: "500",
            cursor: parseFloat(amount) > 0 ? "pointer" : "not-allowed",
            opacity: parseFloat(amount) > 0 ? 1 : 0.5,
            transition: "all 0.2s",
          }}
        >
          Swap Tokens
        </button>
      </div>
    </div>
  );
};
