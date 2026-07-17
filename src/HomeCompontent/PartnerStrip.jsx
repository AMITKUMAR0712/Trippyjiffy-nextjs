"use client";
import PartnerCard from "./PartnerCard";

const ALL_PARTNERS = ["klook", "tripadvisor", "hostelworld"];

const PartnerStrip = ({ city, partners = ALL_PARTNERS }) => {
  const heading = city ? `Plan more in ${city}` : "Book Activities & Stays";

  return (
    <section style={{ padding: "48px 20px", maxWidth: "1200px", margin: "0 auto" }}>
      <h2 style={{
        textAlign: "center",
        fontSize: "1.6rem",
        fontWeight: 700,
        color: "#1a1a2e",
        marginBottom: "32px",
      }}>
        {heading}
      </h2>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        gap: "24px",
      }}>
        {partners.map((key) => (
          <PartnerCard key={key} partner={key} city={city} />
        ))}
      </div>

      <p style={{
        textAlign: "center",
        fontSize: "0.78rem",
        color: "#94a3b8",
        marginTop: "20px",
      }}>
        We may earn a commission when you book through our partner links — at no extra cost to you.
      </p>
    </section>
  );
};

export default PartnerStrip;
