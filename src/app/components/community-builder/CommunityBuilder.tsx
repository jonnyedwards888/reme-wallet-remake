import React from "react";
import { User, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Comprehensive CommunityBuilder implementation with all components
const CommunityBuilder = () => {
  const navigate = useNavigate();
  const [copiedLink, setCopiedLink] = React.useState(false);
  const [copiedAddress, setCopiedAddress] = React.useState(false);

  const userStats = {
    name: "Vitalik Buterin",
    walletAddress: "0xa3D2571F0D66064444A4A092f90b2A2947b9293D2",
    totalCapsFromReferrals: 200,
    friendsReferred: 0,
    referralGoal: 5,
    referralLink: "https://wallet.remelife.com/register?ref=lucashooper100",
  };

  const copyToClipboard = async (text: string, type: "link" | "address") => {
    try {
      await navigator.clipboard.writeText(text);
      if (type === "link") {
        setCopiedLink(true);
        setTimeout(() => setCopiedLink(false), 2000);
      } else {
        setCopiedAddress(true);
        setTimeout(() => setCopiedAddress(false), 2000);
      }
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  const shareReferralLink = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Join ReMeLife Community",
          text: "Join me on ReMeLife and start earning CAPs tokens!",
          url: userStats.referralLink,
        });
      } catch (err) {
        console.error("Error sharing: ", err);
      }
    } else {
      copyToClipboard(userStats.referralLink, "link");
    }
  };

  const progressPercentage =
    (userStats.friendsReferred / userStats.referralGoal) * 100;

  // Mock referral data
  const referralData = {
    level1: [
      { id: "1", name: "Sarah Johnson" },
      { id: "2", name: "Mike Chen" },
      { id: "3", name: "Emma Wilson" },
    ],
    level2: [
      { id: "4", name: "Alex Lee" },
      { id: "5", name: "Priya Patel" },
      { id: "6", name: "Carlos Gomez" },
      { id: "7", name: "Linda Park" },
    ],
    level3: [
      { id: "8", name: "Tom Brown" },
      { id: "9", name: "Nina Singh" },
      { id: "10", name: "Olga Ivanova" },
      { id: "11", name: "Samir Ali" },
      { id: "12", name: "Julia Kim" },
    ],
  };

  // Circular Ring Component
  const CircularRing = ({
    value,
    label,
    gradientColors,
    size = 160,
    strokeWidth = 10,
    className = "",
  }: {
    value: number;
    label: string;
    gradientColors: string[];
    size?: number;
    strokeWidth?: number;
    className?: string;
  }) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const gradientId = React.useId();

    return (
      <div
        className={`circular-ring-container ${className}`}
        style={{ width: size, height: size, position: "relative" }}
      >
        <svg
          className="circular-ring-svg"
          width={size}
          height={size}
          style={{ transform: "rotate(-90deg)" }}
        >
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            className="ring-background"
            stroke="rgba(255, 255, 255, 0.1)"
            strokeWidth={strokeWidth}
            fill="transparent"
          />

          {/* Complete filled ring */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={`url(#${gradientId})`}
            strokeWidth={strokeWidth}
            className="ring-progress"
            strokeDasharray={circumference}
            strokeDashoffset={0}
            fill="transparent"
            strokeLinecap="round"
            style={{ transition: "all 1s ease-out" }}
          />

          {/* Gradient definition */}
          <defs>
            <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
              {gradientColors.map((color: string, index: number) => (
                <stop
                  key={index}
                  offset={`${(index / (gradientColors.length - 1)) * 100}%`}
                  stopColor={color}
                />
              ))}
            </linearGradient>
          </defs>
        </svg>

        {/* Center content */}
        <div
          className="ring-center-content"
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            className="ring-value"
            style={{
              fontSize: "2.5rem",
              fontWeight: "bold",
              color: "white",
              marginBottom: "0.25rem",
              filter: "drop-shadow(0 10px 15px rgba(0, 0, 0, 0.1))",
            }}
          >
            {Math.floor(value)}
          </div>
        </div>
      </div>
    );
  };

  // Referral Network Diagram Component - Exact copy from PureCSS-Wallet-Design
  const ReferralNetworkDiagram = () => {
    return (
      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: "400px",
          margin: "0 auto",
          padding: "24px 0",
        }}
      >
        {/* Level 1 - User (Center/Top) */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "24px",
          }}
        >
          <div style={{ position: "relative" }}>
            <div
              style={{
                width: "64px",
                height: "64px",
                background: "linear-gradient(135deg, #a855f7, #ec4899)",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                border: "4px solid rgba(255, 255, 255, 0.2)",
              }}
            >
              <User
                style={{ width: "32px", height: "32px", color: "#000000" }}
              />
            </div>
            <div
              style={{
                position: "absolute",
                bottom: "-32px",
                left: "50%",
                transform: "translateX(-50%)",
                textAlign: "center",
              }}
            >
              <div
                style={{ color: "white", fontWeight: "bold", fontSize: "14px" }}
              >
                You
              </div>
            </div>
          </div>
        </div>

        {/* Connection Lines Level 1 to 2 */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "16px",
          }}
        >
          <svg width="250" height="30" style={{ position: "absolute" }}>
            <defs>
              <linearGradient
                id="lineGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop offset="0%" stopColor="rgba(139, 92, 246, 0.6)" />
                <stop offset="100%" stopColor="rgba(236, 72, 153, 0.6)" />
              </linearGradient>
            </defs>
            <line
              x1="125"
              y1="0"
              x2="62.5"
              y2="30"
              stroke="url(#lineGradient)"
              strokeWidth="2"
            />
            <line
              x1="125"
              y1="0"
              x2="125"
              y2="30"
              stroke="url(#lineGradient)"
              strokeWidth="2"
            />
            <line
              x1="125"
              y1="0"
              x2="187.5"
              y2="30"
              stroke="url(#lineGradient)"
              strokeWidth="2"
            />
          </svg>
        </div>

        {/* Level 2 - Direct Referrals */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "24px",
            marginBottom: "16px",
          }}
        >
          {[1, 2, 3].map((i) => (
            <div key={i} style={{ position: "relative" }}>
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  background: "linear-gradient(135deg, #3b82f6, #06b6d4)",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
                  border: "2px solid rgba(255, 255, 255, 0.2)",
                }}
              >
                <Users
                  style={{ width: "24px", height: "24px", color: "#000000" }}
                />
              </div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: "center", marginBottom: "24px" }}>
          <div
            style={{
              background:
                "linear-gradient(to right, rgba(59, 130, 246, 0.2), rgba(6, 182, 212, 0.2))",
              borderRadius: "8px",
              padding: "12px",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              display: "inline-block",
            }}
          >
            <div style={{ color: "white", fontWeight: "bold" }}>
              Level 1: Direct Referrals
            </div>
            <div style={{ color: "#93c5fd", fontWeight: "600" }}>
              100 CAPs per friend
            </div>
          </div>
        </div>

        {/* Connection Lines Level 2 to 3 */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "16px",
          }}
        >
          <svg width="320" height="30" style={{ position: "absolute" }}>
            <defs>
              <linearGradient
                id="lineGradient2"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop offset="0%" stopColor="rgba(59, 130, 246, 0.6)" />
                <stop offset="100%" stopColor="rgba(16, 185, 129, 0.6)" />
              </linearGradient>
            </defs>
            {/* Left branch */}
            <line
              x1="80"
              y1="0"
              x2="48"
              y2="30"
              stroke="url(#lineGradient2)"
              strokeWidth="2"
            />
            <line
              x1="80"
              y1="0"
              x2="112"
              y2="30"
              stroke="url(#lineGradient2)"
              strokeWidth="2"
            />
            {/* Center branch */}
            <line
              x1="160"
              y1="0"
              x2="144"
              y2="30"
              stroke="url(#lineGradient2)"
              strokeWidth="2"
            />
            <line
              x1="160"
              y1="0"
              x2="176"
              y2="30"
              stroke="url(#lineGradient2)"
              strokeWidth="2"
            />
            {/* Right branch */}
            <line
              x1="240"
              y1="0"
              x2="208"
              y2="30"
              stroke="url(#lineGradient2)"
              strokeWidth="2"
            />
            <line
              x1="240"
              y1="0"
              x2="272"
              y2="30"
              stroke="url(#lineGradient2)"
              strokeWidth="2"
            />
          </svg>
        </div>

        {/* Level 3 - Second Level Referrals */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "12px",
            marginBottom: "16px",
          }}
        >
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} style={{ position: "relative" }}>
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  background: "linear-gradient(135deg, #10b981, #059669)",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                }}
              >
                <Users
                  style={{ width: "20px", height: "20px", color: "#000000" }}
                />
              </div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: "center", marginBottom: "24px" }}>
          <div
            style={{
              background:
                "linear-gradient(to right, rgba(16, 185, 129, 0.2), rgba(5, 150, 105, 0.2))",
              borderRadius: "8px",
              padding: "12px",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              display: "inline-block",
            }}
          >
            <div style={{ color: "white", fontWeight: "bold" }}>
              Level 2: Friends of Friends
            </div>
            <div style={{ color: "#6ee7b7", fontWeight: "600" }}>
              50 CAPs per friend
            </div>
          </div>
        </div>

        {/* Connection Lines Level 3 to 4 */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "16px",
          }}
        >
          <svg width="400" height="30" style={{ position: "absolute" }}>
            <defs>
              <linearGradient
                id="lineGradient3"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop offset="0%" stopColor="rgba(147, 51, 234, 0.6)" />
                <stop offset="100%" stopColor="rgba(236, 72, 153, 0.6)" />
              </linearGradient>
            </defs>
            {/* Left branch */}
            <line
              x1="100"
              y1="0"
              x2="60"
              y2="30"
              stroke="url(#lineGradient3)"
              strokeWidth="2"
            />
            <line
              x1="100"
              y1="0"
              x2="140"
              y2="30"
              stroke="url(#lineGradient3)"
              strokeWidth="2"
            />
            {/* Center branch */}
            <line
              x1="200"
              y1="0"
              x2="180"
              y2="30"
              stroke="url(#lineGradient3)"
              strokeWidth="2"
            />
            <line
              x1="200"
              y1="0"
              x2="220"
              y2="30"
              stroke="url(#lineGradient3)"
              strokeWidth="2"
            />
            {/* Right branch */}
            <line
              x1="300"
              y1="0"
              x2="260"
              y2="30"
              stroke="url(#lineGradient3)"
              strokeWidth="2"
            />
            <line
              x1="300"
              y1="0"
              x2="340"
              y2="30"
              stroke="url(#lineGradient3)"
              strokeWidth="2"
            />
          </svg>
        </div>

        {/* Level 4 - Third Level Referrals */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "8px",
            marginBottom: "16px",
          }}
        >
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
            <div key={i} style={{ position: "relative" }}>
              <div
                style={{
                  width: "32px",
                  height: "32px",
                  background: "linear-gradient(135deg, #a855f7, #ec4899)",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 8px 16px -4px rgba(0, 0, 0, 0.1)",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                }}
              >
                <Users
                  style={{ width: "16px", height: "16px", color: "#000000" }}
                />
              </div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: "center" }}>
          <div
            style={{
              background:
                "linear-gradient(to right, rgba(168, 85, 247, 0.2), rgba(236, 72, 153, 0.2))",
              borderRadius: "8px",
              padding: "12px",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              display: "inline-block",
            }}
          >
            <div style={{ color: "white", fontWeight: "bold" }}>
              Level 3: Friends of Friends of Friends
            </div>
            <div style={{ color: "#f3a5f5", fontWeight: "600" }}>
              25 CAPs per friend
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(90deg, #1a0536 0%, rgb(83, 0, 39) 48%, #1a0536 100%)",
        color: "white",
        padding: "24px",
      }}
    >
      {/* Header */}
      <header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "32px",
        }}
      >
        <button
          onClick={() => navigate("/dashboard")}
          style={{
            background: "rgba(255,255,255,0.1)",
            border: "none",
            color: "white",
            padding: "8px 16px",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          ← Back to Dashboard
        </button>

        <h1
          style={{
            fontSize: "24px",
            fontWeight: "bold",
            margin: 0,
          }}
        >
          Community Builder
        </h1>

        <button
          style={{
            background: "rgba(255,255,255,0.1)",
            border: "none",
            color: "white",
            padding: "8px 16px",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Help
        </button>
      </header>

      <div
        style={{
          display: "flex",
          gap: "24px",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        {/* Sidebar */}
        <aside style={{ width: "256px" }}>
          <div
            style={{
              background: "rgba(255,255,255,0.1)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255,255,255,0.2)",
              borderRadius: "16px",
              padding: "16px",
            }}
          >
            <div
              style={{ display: "flex", flexDirection: "column", gap: "12px" }}
            >
              <button
                style={{
                  width: "100%",
                  justifyContent: "flex-start",
                  color: "white",
                  background: "rgba(255,255,255,0.2)",
                  border: "none",
                  padding: "12px",
                  borderRadius: "8px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                }}
              >
                <img
                  src="/PureCSS-Wallet-Design/public/logos/Community-builder-icon.png"
                  alt="Dashboard"
                  style={{ width: "16px", height: "16px", borderRadius: "4px" }}
                />
                Dashboard
              </button>
              <button
                style={{
                  width: "100%",
                  justifyContent: "flex-start",
                  color: "rgba(255,255,255,0.8)",
                  background: "transparent",
                  border: "none",
                  padding: "12px",
                  borderRadius: "8px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                }}
              >
                <img
                  src="/PureCSS-Wallet-Design/public/logos/Defi-Hub-Icon.png"
                  alt="My Community"
                  style={{ width: "16px", height: "16px", borderRadius: "4px" }}
                />
                My Community
              </button>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: "24px",
          }}
        >
          {/* Welcome Section */}
          <div
            style={{
              background: "rgba(255,255,255,0.1)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255,255,255,0.2)",
              borderRadius: "16px",
              padding: "24px",
            }}
          >
            <h2
              style={{
                fontSize: "32px",
                fontWeight: "bold",
                marginBottom: "16px",
              }}
            >
              Hi, {userStats.name}
            </h2>
            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <div style={{ flex: 1 }}>
                <p
                  style={{
                    color: "rgba(255,255,255,0.8)",
                    fontSize: "14px",
                    marginBottom: "8px",
                  }}
                >
                  Your Wallet Address:
                </p>
                <div
                  style={{
                    background: "rgba(255,255,255,0.1)",
                    padding: "12px 16px",
                    borderRadius: "8px",
                    fontFamily: "monospace",
                    fontSize: "14px",
                  }}
                >
                  {userStats.walletAddress.slice(0, 20)}...
                </div>
              </div>
              <button
                onClick={() =>
                  copyToClipboard(userStats.walletAddress, "address")
                }
                style={{
                  background: "rgba(255,255,255,0.2)",
                  border: "1px solid rgba(255,255,255,0.3)",
                  color: "white",
                  padding: "8px 12px",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontSize: "12px",
                }}
              >
                {copiedAddress ? "Copied!" : "Copy"}
              </button>
            </div>
          </div>

          {/* Main Stats Grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "24px",
            }}
          >
            {/* CAPs from Referrals */}
            <div
              style={{
                background: "rgba(255,255,255,0.1)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255,255,255,0.2)",
                borderRadius: "16px",
                padding: "32px",
                textAlign: "center",
              }}
            >
              <h3
                style={{
                  fontSize: "20px",
                  fontWeight: "600",
                  marginBottom: "24px",
                }}
              >
                CAPs from Referrals
              </h3>
              <div
                style={{
                  marginBottom: "24px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <CircularRing
                  value={userStats.totalCapsFromReferrals}
                  label="Total CAPs"
                  gradientColors={["#10B981", "#059669", "#047857"]}
                  size={160}
                  strokeWidth={10}
                />
                <div
                  style={{
                    color: "rgba(255,255,255,0.8)",
                    fontSize: "16px",
                    fontWeight: "500",
                    marginTop: "16px",
                  }}
                >
                  Total Community
                </div>
              </div>
              <div
                style={{
                  background: "rgba(255,255,255,0.05)",
                  borderRadius: "8px",
                  padding: "16px",
                }}
              >
                <div
                  style={{
                    fontSize: "24px",
                    fontWeight: "bold",
                    color: "white",
                  }}
                >
                  {userStats.friendsReferred}
                </div>
                <div
                  style={{ color: "rgba(255,255,255,0.7)", fontSize: "14px" }}
                >
                  Total Community
                </div>
              </div>
            </div>

            {/* Referral Progress */}
            <div
              style={{
                background: "rgba(255,255,255,0.1)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255,255,255,0.2)",
                borderRadius: "16px",
                padding: "32px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "24px",
                }}
              >
                <h3 style={{ fontSize: "20px", fontWeight: "600", margin: 0 }}>
                  Referral Goal Progress
                </h3>
                <span
                  style={{
                    background: "#f97316",
                    color: "white",
                    padding: "4px 8px",
                    borderRadius: "4px",
                    fontSize: "12px",
                    fontWeight: "bold",
                    marginLeft: "16px",
                    whiteSpace: "nowrap",
                  }}
                >
                  COMING SOON
                </span>
              </div>

              <div style={{ marginBottom: "24px" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "8px",
                  }}
                >
                  <span style={{ color: "rgba(255,255,255,0.8)" }}>
                    Progress to next bonus
                  </span>
                  <span style={{ color: "white", fontWeight: "600" }}>
                    {userStats.friendsReferred}/{userStats.referralGoal}
                  </span>
                </div>
                <div
                  style={{
                    width: "100%",
                    height: "12px",
                    background: "rgba(255,255,255,0.1)",
                    borderRadius: "6px",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      width: `${progressPercentage}%`,
                      height: "100%",
                      background: "linear-gradient(to right, #a855f7, #8b5cf6)",
                      borderRadius: "6px",
                      transition: "width 0.3s ease",
                    }}
                  ></div>
                </div>
              </div>

              <div
                style={{
                  background:
                    "linear-gradient(to right, rgba(168, 85, 247, 0.2), rgba(139, 92, 246, 0.2))",
                  borderRadius: "12px",
                  padding: "16px",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    marginBottom: "8px",
                  }}
                >
                  <span style={{ color: "#c4b5fd", fontSize: "20px" }}>🎯</span>
                  <span style={{ color: "white", fontWeight: "600" }}>
                    Next Milestone
                  </span>
                </div>
                <p
                  style={{
                    color: "rgba(255,255,255,0.8)",
                    fontSize: "14px",
                    margin: 0,
                  }}
                >
                  Refer {userStats.referralGoal - userStats.friendsReferred}{" "}
                  more friends to earn a 50 CAPs bonus!
                </p>
              </div>

              <div
                style={{
                  marginTop: "24px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    fontSize: "14px",
                  }}
                >
                  <span style={{ color: "rgba(255,255,255,0.7)" }}>
                    Bonus at 5 referrals
                  </span>
                  <span style={{ color: "#6ee7b7", fontWeight: "600" }}>
                    +50 CAPs
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    fontSize: "14px",
                  }}
                >
                  <span style={{ color: "rgba(255,255,255,0.7)" }}>
                    Bonus at 10 referrals
                  </span>
                  <span style={{ color: "#6ee7b7", fontWeight: "600" }}>
                    +100 CAPs
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* How Referral Rewards Work Section - Exact copy from PureCSS-Wallet-Design */}
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginTop: "32px",
            }}
          >
            {/* Top: Total Referred Bar */}
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "flex-start",
              }}
            >
              <div
                style={{
                  width: "320px",
                  marginBottom: "0",
                  marginLeft: "32px",
                  marginTop: "96px",
                  position: "relative",
                  top: "40px",
                }}
              >
                <div
                  style={{
                    background:
                      "linear-gradient(to right, rgba(236, 72, 153, 0.8), rgba(168, 85, 247, 0.8))",
                    borderRadius: "12px",
                    padding: "16px 24px",
                    textAlign: "center",
                    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                  }}
                >
                  <div
                    style={{
                      fontSize: "32px",
                      fontWeight: "bold",
                      color: "white",
                    }}
                  >
                    {referralData.level1.length +
                      referralData.level2.length +
                      referralData.level3.length}
                  </div>
                  <div
                    style={{
                      color: "rgba(255,255,255,0.8)",
                      fontSize: "16px",
                      fontWeight: "500",
                      marginTop: "4px",
                    }}
                  >
                    Friends Referred
                  </div>
                </div>
              </div>
            </div>

            {/* Compact grid for levels */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "48px",
                width: "100%",
                maxWidth: "800px",
                alignItems: "center",
                position: "relative",
              }}
            >
              {/* Left side: Level indicators */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "32px",
                  justifyContent: "center",
                  height: "100%",
                  paddingTop: "40px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      width: "60px",
                      height: "60px",
                      borderRadius: "50%",
                      background: "linear-gradient(135deg, #3b82f6, #06b6d4)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "white",
                      fontWeight: "bold",
                      fontSize: "18px",
                      marginBottom: "4px",
                      border: "4px solid rgba(255,255,255,0.2)",
                      boxShadow: "0 6px 24px 0 rgba(0,0,0,0.18)",
                    }}
                  >
                    {referralData.level1.length}
                  </div>
                  <div
                    style={{
                      color: "rgba(255,255,255,0.8)",
                      fontSize: "16px",
                      fontWeight: "600",
                    }}
                  >
                    Level 1
                  </div>
                  <div
                    style={{ color: "rgba(255,255,255,0.6)", fontSize: "14px" }}
                  >
                    Direct Referrals
                  </div>
                  <div
                    style={{ color: "rgba(255,255,255,0.6)", fontSize: "12px" }}
                  >
                    {referralData.level1.length} member
                    {referralData.level1.length !== 1 ? "s" : ""}
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      width: "60px",
                      height: "60px",
                      borderRadius: "50%",
                      background: "linear-gradient(135deg, #22c55e, #10b981)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "white",
                      fontWeight: "bold",
                      fontSize: "18px",
                      marginBottom: "4px",
                      border: "4px solid rgba(255,255,255,0.2)",
                      boxShadow: "0 6px 24px 0 rgba(0,0,0,0.18)",
                    }}
                  >
                    {referralData.level2.length}
                  </div>
                  <div
                    style={{
                      color: "rgba(255,255,255,0.8)",
                      fontSize: "16px",
                      fontWeight: "600",
                    }}
                  >
                    Level 2
                  </div>
                  <div
                    style={{ color: "rgba(255,255,255,0.6)", fontSize: "14px" }}
                  >
                    Friends of Friends
                  </div>
                  <div
                    style={{ color: "rgba(255,255,255,0.6)", fontSize: "12px" }}
                  >
                    {referralData.level2.length} member
                    {referralData.level2.length !== 1 ? "s" : ""}
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      width: "60px",
                      height: "60px",
                      borderRadius: "50%",
                      background: "linear-gradient(135deg, #a21caf, #ec4899)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "white",
                      fontWeight: "bold",
                      fontSize: "18px",
                      marginBottom: "4px",
                      border: "4px solid rgba(255,255,255,0.2)",
                      boxShadow: "0 6px 24px 0 rgba(0,0,0,0.18)",
                    }}
                  >
                    {referralData.level3.length}
                  </div>
                  <div
                    style={{
                      color: "rgba(255,255,255,0.8)",
                      fontSize: "16px",
                      fontWeight: "600",
                    }}
                  >
                    Level 3
                  </div>
                  <div
                    style={{ color: "rgba(255,255,255,0.6)", fontSize: "14px" }}
                  >
                    Friends of Friends of Friends
                  </div>
                  <div
                    style={{ color: "rgba(255,255,255,0.6)", fontSize: "12px" }}
                  >
                    {referralData.level3.length} member
                    {referralData.level3.length !== 1 ? "s" : ""}
                  </div>
                </div>
              </div>

              {/* Center: SVG connecting lines */}
              <div
                style={{
                  position: "relative",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  minHeight: "400px",
                }}
              >
                <svg
                  width="120"
                  height="520"
                  style={{ position: "absolute", left: 0, top: 0 }}
                >
                  {/* Blue arrow */}
                  <line
                    x1="20"
                    y1="140"
                    x2="100"
                    y2="140"
                    stroke="#3b82f6"
                    strokeWidth="4"
                    opacity="0.8"
                    markerEnd="url(#arrowheadBlue)"
                  />
                  {/* Green arrow */}
                  <line
                    x1="20"
                    y1="300"
                    x2="100"
                    y2="300"
                    stroke="#22c55e"
                    strokeWidth="4"
                    opacity="0.8"
                    markerEnd="url(#arrowheadGreen)"
                  />
                  {/* Pink arrow */}
                  <line
                    x1="20"
                    y1="460"
                    x2="100"
                    y2="460"
                    stroke="#ec4899"
                    strokeWidth="4"
                    opacity="0.8"
                    markerEnd="url(#arrowheadPink)"
                  />
                  <defs>
                    <marker
                      id="arrowheadBlue"
                      markerWidth="6"
                      markerHeight="6"
                      refX="5"
                      refY="3"
                      orient="auto"
                      markerUnits="strokeWidth"
                    >
                      <path d="M0,0 L0,6 L6,3 Z" fill="#3b82f6" opacity="0.8" />
                    </marker>
                    <marker
                      id="arrowheadGreen"
                      markerWidth="6"
                      markerHeight="6"
                      refX="5"
                      refY="3"
                      orient="auto"
                      markerUnits="strokeWidth"
                    >
                      <path d="M0,0 L0,6 L6,3 Z" fill="#22c55e" opacity="0.8" />
                    </marker>
                    <marker
                      id="arrowheadPink"
                      markerWidth="6"
                      markerHeight="6"
                      refX="5"
                      refY="3"
                      orient="auto"
                      markerUnits="strokeWidth"
                    >
                      <path d="M0,0 L0,6 L6,3 Z" fill="#ec4899" opacity="0.8" />
                    </marker>
                  </defs>
                </svg>
              </div>

              {/* Right side: Referral tree diagram */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "0",
                }}
              >
                <div
                  style={{
                    color: "white",
                    fontSize: "18px",
                    fontWeight: "bold",
                    marginBottom: "8px",
                  }}
                >
                  Example Graph
                </div>
                <ReferralNetworkDiagram />
              </div>
            </div>
          </div>

          {/* Referral Link Section */}
          <div
            style={{
              background: "rgba(255,255,255,0.1)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255,255,255,0.2)",
              borderRadius: "16px",
              padding: "24px",
            }}
          >
            <h3
              style={{
                fontSize: "20px",
                fontWeight: "600",
                marginBottom: "16px",
              }}
            >
              Your Referral Link
            </h3>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "16px",
                marginBottom: "24px",
              }}
            >
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    borderRadius: "8px",
                    padding: "16px",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                >
                  <code
                    style={{
                      color: "rgba(255,255,255,0.9)",
                      fontSize: "14px",
                      wordBreak: "break-all",
                    }}
                  >
                    {userStats.referralLink}
                  </code>
                </div>
              </div>
              <div style={{ display: "flex", gap: "8px" }}>
                <button
                  onClick={() =>
                    copyToClipboard(userStats.referralLink, "link")
                  }
                  style={{
                    background: "rgba(255,255,255,0.2)",
                    border: "1px solid rgba(255,255,255,0.3)",
                    color: "white",
                    padding: "8px 16px",
                    borderRadius: "8px",
                    cursor: "pointer",
                    fontSize: "14px",
                  }}
                >
                  {copiedLink ? "Copied!" : "Copy"}
                </button>
                <button
                  onClick={shareReferralLink}
                  style={{
                    background:
                      "linear-gradient(to right, rgba(168, 85, 247, 0.2), rgba(139, 92, 246, 0.2))",
                    border: "1px solid rgba(168, 85, 247, 0.3)",
                    color: "#e9d5ff",
                    padding: "8px 16px",
                    borderRadius: "8px",
                    cursor: "pointer",
                    fontSize: "14px",
                    fontWeight: "500",
                  }}
                >
                  Share
                </button>
              </div>
            </div>

            {/* CTA Section */}
            <div
              style={{
                background:
                  "linear-gradient(to right, rgba(168, 85, 247, 0.2), rgba(236, 72, 153, 0.2))",
                borderRadius: "16px",
                padding: "24px",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "16px" }}
              >
                <div
                  style={{
                    background: "rgba(255,255,255,0.1)",
                    borderRadius: "50%",
                    width: "48px",
                    height: "48px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <img
                    src="/PureCSS-Wallet-Design/public/logos/Community-builder-icon.png"
                    alt="Invite Friends"
                    style={{
                      width: "24px",
                      height: "24px",
                    }}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <h4
                    style={{
                      fontSize: "18px",
                      fontWeight: "600",
                      marginBottom: "4px",
                    }}
                  >
                    Invite friends to earn more CAPs
                  </h4>
                  <p
                    style={{
                      color: "rgba(255,255,255,0.8)",
                      fontSize: "14px",
                      margin: 0,
                    }}
                  >
                    Share your referral link and earn CAPs for every friend who
                    joins ReMeLife
                  </p>
                </div>
                <button
                  onClick={shareReferralLink}
                  style={{
                    background:
                      "linear-gradient(to right, rgba(168, 85, 247, 0.2), rgba(139, 92, 246, 0.2))",
                    border: "1px solid rgba(168, 85, 247, 0.3)",
                    color: "#e9d5ff",
                    padding: "12px 24px",
                    borderRadius: "8px",
                    cursor: "pointer",
                    fontSize: "14px",
                    fontWeight: "500",
                  }}
                >
                  Start Inviting
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default CommunityBuilder;
