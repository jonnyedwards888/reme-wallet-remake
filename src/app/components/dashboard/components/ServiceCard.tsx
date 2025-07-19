import React from "react";
import { TooltipComponent } from "../../tooltip";

export interface ServiceCardProps {
  type: "ragency" | "rcb" | "market" | "luki" | "claim";
  title: string;
  description?: string;
  tooltipMessage: string;
  icon: React.ReactNode;
  buttonText?: string;
  buttonAction?: () => void;
  children?: React.ReactNode;
  comingSoon?: boolean;
  comingSoonBadge?: boolean;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({
  type,
  title,
  description,
  tooltipMessage,
  icon,
  buttonText,
  buttonAction,
  children,
  comingSoon = false,
  comingSoonBadge = false,
}) => {
  return (
    <div className={`service-card ${type} modern-service-card`}>
      <div className="service-tooltip">
        <TooltipComponent msg={tooltipMessage} />
      </div>
      <div className={`service-icon ${type} modern-icon-wrapper`}>{icon}</div>
      <div className="service-content">
        <div
          className="service-title"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            justifyContent: "center",
          }}
        >
          {title}
          {comingSoonBadge && (
            <span
              style={{
                background: "linear-gradient(90deg, #f59e0b 0%, #d97706 100%)",
                color: "white",
                fontSize: "0.7rem",
                fontWeight: "700",
                padding: "4px 8px",
                borderRadius: "8px",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
                boxShadow: "0 2px 8px rgba(245, 158, 11, 0.3)",
              }}
            >
              COMING SOON
            </span>
          )}
        </div>
        {description && (
          <div className="service-description">{description}</div>
        )}
        {buttonText && (
          <button
            className={`service-button ${buttonAction ? "" : "with-margin"} ${comingSoon ? "coming-soon" : "modern-button"}`}
            onClick={buttonAction}
            disabled={comingSoon}
            style={{ position: "relative" }}
          >
            {buttonText}
            {comingSoon && (
              <span className="coming-soon-badge">COMING SOON</span>
            )}
          </button>
        )}
        {children}
      </div>
    </div>
  );
};
