"use client";
import React, { useState, useEffect, memo } from "react";
import Link from "next/link";
import axios from "axios";
import {
  FaInstagram,
  FaLinkedin,
  FaFacebookF,
  FaYoutube,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaGlobeAmericas
} from "react-icons/fa";


import Style from "../Style/Footer.module.scss";
const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://trippyjiffy.com";

const STATIC_INDIA = [
  { id: 1, region_name: "Golden Triangle Tour" },
  { id: 2, region_name: "South India Tour" },
  { id: 3, region_name: "Rajasthan Tour" },
  { id: 4, region_name: "Weekend Tour" },
  { id: 5, region_name: "Wildlife Tours" },
];

const STATIC_ASIA = [
  { country_name: "Dubai" },
  { country_name: "Thailand" },
  { country_name: "Nepal" },
  { country_name: "Singapore" },
  { country_name: "Egypt" },
];

const Footer = () => {
  const [indiaTours, setIndiaTours] = useState(STATIC_INDIA);
  const [asiaTours, setAsiaTours] = useState(STATIC_ASIA);

  useEffect(() => {
    let cancelled = false;

    const fetchFooterTours = async () => {
      try {
        const [indiaRes, asiaRes] = await Promise.all([
          axios.get(`${baseURL}/api/category-india/get`),
          axios.get(`${baseURL}/api/asia/get`),
        ]);

        if (cancelled) return;
        const india = Array.isArray(indiaRes.data) ? indiaRes.data : [];
        const asia = Array.isArray(asiaRes.data) ? asiaRes.data : [];
        if (india.length) setIndiaTours(india.slice(0, 8));
        if (asia.length) setAsiaTours(asia.slice(0, 8));
      } catch (err) {
        console.error("Error fetching footer tours:", err);
      }
    };

    const runWhenIdle = window.requestIdleCallback || ((cb) => window.setTimeout(cb, 1800));
    const idleId = runWhenIdle(fetchFooterTours);

    return () => {
      cancelled = true;
      if (window.cancelIdleCallback) {
        window.cancelIdleCallback(idleId);
      } else {
        window.clearTimeout(idleId);
      }
    };
  }, []);

  const socialLinks = [
    { icon: <FaInstagram aria-hidden="true" />, url: "https://www.instagram.com/trippy.jiffy?igsh=b3A2ZzIxcHdxZmVo&utm_source=qr", label: "Instagram" },
    { icon: <FaLinkedin aria-hidden="true" />, url: "https://www.linkedin.com/company/trippyjiffy/", label: "LinkedIn" },
    { icon: <FaFacebookF aria-hidden="true" />, url: "https://www.facebook.com/profile.php?id=61590639771522", label: "Facebook" },
    { icon: <FaYoutube aria-hidden="true" />, url: "https://youtube.com/@trippyjiffy?si=K9vr-sxTLp2LHYxg", label: "YouTube" },
  ];

  const usefulLinks = [
    { name: "Family Tours", path: "/family-tours" },
    { name: "Blogs", path: "/blogpage" },
    { name: "Valuable Customer Feedback", path: "/feedback-form" },
    { name: "About Us", path: "/about-us" },
    { name: "Plan Your Trip", path: "/enquiry-form" },
    { name: "Pay Now", path: "/payment" },
    { name: "Privacy Policy", path: "/privacypolicy" },
    { name: "Terms & Conditions", path: "/termscondition" },
  ];

  const slugify = (text) =>
    (text || "")
      .toString()
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-");

  const handleLinkClick = (e, link) => {
    if (link.isPopup) {
      e.preventDefault();
      window.dispatchEvent(new CustomEvent("openLeadPopup"));
    }
  };

  return (
    <footer className={Style.Footer}>
      <div className={Style.wrapper}>
        <div className={Style.FooterFlex}>
          <div className={Style.FooterWrap}>
            <div className={Style.FooterImage}>
              <img
                src="/trippylogo.webp"
                alt="Footer Logo"
                width="96"
                height="96"
                loading="lazy"
                decoding="async"
              />
            </div>
            <p>Where unforgettable memories don&apos;t come with a price tag!</p>

            <div className={Style.FooterInsta}>
              <h2>Follow Us:</h2>
              <ul>
                {socialLinks.map((social, i) => (
                  <li key={i}>
                    <a
                      href={social.url}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={social.label}
                    >
                      {social.icon}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className={Style.FooterWrap1}>
            <h2>Quick Links</h2>
            <ul>
              {usefulLinks.map((link, i) => (
                <li key={i}>
                  <Link
                    href={link.path}
                    onClick={(e) => handleLinkClick(e, link)}
                    className={link.isFeatured ? Style.featuredLink : ""}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className={Style.FooterWrap2}>
            <h2>India Tours</h2>
            <ul>
              {indiaTours.map((tour) => (
                  <li key={tour.id}>
                    <Link
                      href={`/india-tours/${tour.id}/${slugify(tour.region_name)}`}
                    >
                      {tour.region_name}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>

          <div className={Style.FooterWrap2}>
            <h2>Overseas Tours</h2>
            <ul>
              {asiaTours.map((tour) => (
                  <li key={tour.id || tour._id || tour.country_name}>
                    <Link
                      href={`/asia-tours/${slugify(
                        tour.country_name || tour.region_name || tour.name
                      )}`}
                    >
                      {tour.country_name || tour.region_name || tour.name}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>

          <div className={Style.FooterWrap3}>
            <h2>Contact Us</h2>
            <address style={{ fontStyle: 'normal' }}>
              <ul>
                <li>
                  <a href="mailto:travelqueries@trippyjiffy.com" style={{ color: 'inherit', textDecoration: 'none' }}>
                    <FaEnvelope aria-hidden="true" /> travelqueries@trippyjiffy.com
                  </a>
                </li>
                <li>
                  <a href="tel:+919870210896" style={{ color: 'inherit', textDecoration: 'none' }}>
                    <FaPhoneAlt aria-hidden="true" /> +91 98702 10896
                  </a>
                  {' , '}
                  <a href="tel:+918527454549" style={{ color: 'inherit', textDecoration: 'none' }}>
                    85274 54549
                  </a>
                </li>
                <li>
                  <FaMapMarkerAlt aria-hidden="true" />
                  <span>Sector 1, Vikas Nagar Lucknow 226022 (India)</span>
                </li>
              </ul>
              <div style={{ marginTop: '20px' }}>
                <Link
                  href="/customize-your-holiday-plan"
                  className={Style.featuredLink}
                >
                  Customize Your Holiday
                </Link>
              </div>
            </address>
          </div>
        </div>

        <div className={Style.FooterBottom}>
          <p>
            <span style={{ display: 'inline-block', marginRight: '8px' }}>
              <FaGlobeAmericas style={{ color: 'var(--primary-color, #d35400)' }} />
            </span>
            © {new Date().getFullYear()} Trippyjiffy Travel. All Rights Reserved. Empowering your next journey.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default memo(Footer);
