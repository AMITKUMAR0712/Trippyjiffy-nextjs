"use client";
import { useState } from "react";
import PartnerStrip from "@/HomeCompontent/PartnerStrip";

const CITIES = ["Goa", "Manali", "Jaipur", "Bangkok", "Singapore", "Dubai", "Bali"];

const Experiences = () => {
  const [selectedCity, setSelectedCity] = useState(null);

  return (
    <div style={{ minHeight: "100vh", background: "#f8fafc" }}>
      {/* Hero */}
      <section style={{
        background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",
        color: "#fff",
        padding: "80px 20px 60px",
        textAlign: "center",
      }}>
        <h1 style={{ fontSize: "2.2rem", fontWeight: 800, margin: "0 0 12px" }}>
          Activities, Experiences & Budget Stays
        </h1>
        <p style={{ fontSize: "1.1rem", color: "#cbd5e1", maxWidth: "600px", margin: "0 auto" }}>
          Handpicked travel partners by TrippyJiffy — book tours, attractions & hostels worldwide.
        </p>
      </section>

      {/* All partners */}
      <PartnerStrip />

      {/* City chips */}
      <section style={{ padding: "0 20px 48px", maxWidth: "1200px", margin: "0 auto" }}>
        <h2 style={{
          textAlign: "center",
          fontSize: "1.4rem",
          fontWeight: 700,
          color: "#1a1a2e",
          marginBottom: "24px",
        }}>
          Popular Destinations
        </h2>

        <div style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "10px",
          marginBottom: "32px",
        }}>
          {CITIES.map((city) => (
            <button
              key={city}
              onClick={() => setSelectedCity(selectedCity === city ? null : city)}
              style={{
                padding: "8px 20px",
                borderRadius: "24px",
                border: selectedCity === city ? "2px solid #d35400" : "2px solid #e2e8f0",
                background: selectedCity === city ? "#d35400" : "#fff",
                color: selectedCity === city ? "#fff" : "#334155",
                fontWeight: 600,
                fontSize: "0.9rem",
                cursor: "pointer",
                transition: "all 0.2s",
              }}
            >
              {city}
            </button>
          ))}
        </div>

        {selectedCity && <PartnerStrip city={selectedCity} />}
      </section>
    </div>
  );
};

export default Experiences;
