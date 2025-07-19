import React from "react";

interface CircularProgressProps {
  value: string;
  max?: string;
  size?: number;
  strokeWidth?: number;
  className?: string;
  label?: string;
}

export const CircularProgress: React.FC<CircularProgressProps> = ({
  value,
  max = "100",
  size = 280,
  strokeWidth = 20,
  className = "",
  label = "CAPS",
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;

  // Convert string values to numbers for calculations
  const numericValue = parseFloat(value) || 0;
  const numericMax = parseFloat(max) || 100;

  // Calculate progress percentage (cap at 100%)
  const progress = Math.min((numericValue / numericMax) * 100, 100);
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className={`circular-progress ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        style={{ transform: "rotate(-90deg)" }}
      >
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="rgba(255, 255, 255, 0.1)"
          strokeWidth={strokeWidth}
          fill="transparent"
        />

        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="url(#gradient)"
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          style={{
            transition: "stroke-dashoffset 0.5s ease-in-out",
          }}
        />

        {/* Gradient definition */}
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3B82F6" />
            <stop offset="15%" stopColor="#1D4ED8" />
            <stop offset="30%" stopColor="#6366F1" />
            <stop offset="45%" stopColor="#8B5CF6" />
            <stop offset="60%" stopColor="#A855F7" />
            <stop offset="75%" stopColor="#C084FC" />
            <stop offset="90%" stopColor="#EC4899" />
            <stop offset="100%" stopColor="#3B82F6" />
          </linearGradient>
        </defs>
      </svg>

      {/* Center content */}
      <div
        className="stat-number"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          textAlign: "center",
          color: "white",
        }}
      >
        <div
          style={{
            fontSize: "3rem",
            fontWeight: "bold",
            marginBottom: "0.75rem",
          }}
        >
          {value}
        </div>
        <div
          style={{ fontSize: "1rem", opacity: 0.8, letterSpacing: "0.05em" }}
        >
          {label}
        </div>
      </div>
    </div>
  );
};
