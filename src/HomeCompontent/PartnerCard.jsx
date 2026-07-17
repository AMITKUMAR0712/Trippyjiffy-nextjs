"use client";
import { AFFILIATES, getAffiliateLink } from "@/lib/affiliates";

const PartnerCard = ({ partner, city, ctaText = "Explore Deals" }) => {
  const config = AFFILIATES[partner];
  if (!config) return null;

  const link = getAffiliateLink(partner, city);
  const isPlaceholder = !link || link === "#" || !link.startsWith("http");
  const heading = city ? config.cityHeading(city) : config.name;

  return (
    <div style={{
      background: "#fff",
      borderRadius: "16px",
      overflow: "hidden",
      boxShadow: "0 2px 16px rgba(0,0,0,0.08)",
      display: "flex",
      flexDirection: "column",
      transition: "transform 0.2s, box-shadow 0.2s",
    }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.boxShadow = "0 8px 30px rgba(0,0,0,0.12)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 2px 16px rgba(0,0,0,0.08)";
      }}
    >
      <div style={{
        height: "6px",
        background: config.color,
      }} />
      <div style={{ padding: "24px", flex: 1, display: "flex", flexDirection: "column" }}>
        <h3 style={{
          margin: "0 0 8px",
          fontSize: "1.2rem",
          fontWeight: 700,
          color: "#1a1a2e",
        }}>
          {heading}
        </h3>
        <p style={{
          margin: "0 0 20px",
          fontSize: "0.9rem",
          color: "#64748b",
          flex: 1,
        }}>
          {config.tagline}
        </p>

        {isPlaceholder ? (
          <span style={{
            display: "inline-block",
            padding: "10px 20px",
            borderRadius: "8px",
            background: "#e2e8f0",
            color: "#94a3b8",
            fontWeight: 600,
            fontSize: "0.9rem",
            textAlign: "center",
            cursor: "default",
          }}>
            Coming soon
          </span>
        ) : (
          <a
            href={link}
            target="_blank"
            rel="nofollow sponsored noopener"
            style={{
              display: "inline-block",
              padding: "10px 20px",
              borderRadius: "8px",
              background: config.color,
              color: "#fff",
              fontWeight: 600,
              fontSize: "0.9rem",
              textAlign: "center",
              textDecoration: "none",
              transition: "opacity 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            {ctaText} →
          </a>
        )}
      </div>
    </div>
  );
};

export default PartnerCard;
