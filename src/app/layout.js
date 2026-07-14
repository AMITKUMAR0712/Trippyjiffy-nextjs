import "./globals.css";
import Script from "next/script";

export const metadata = {
  metadataBase: new URL("https://trippyjiffy.com"),
  title: "Family Tours | India Tour Sites, Travelling Packages in India & Vacation Packages",
  description:
    "Book affordable India tours, family tours, and travelling packages in India. Explore domestic and international holiday destinations with customized packages.",
  keywords:
    "TrippyJiffy, India Tours, Family Tours, Travelling Packages in India, Vacation Packages, India Tour Sites",
  authors: [{ name: "TrippyJiffy" }],
  robots: "index, follow",
  verification: {
    google: "Vl74CMXxnE8ovZb1mtkCyPSopPEEIrr72_cOlJ39xn0",
  },
  icons: {
    icon: "/trippylogo.png",
  },
  openGraph: {
    type: "website",
    url: "https://trippyjiffy.com/",
    title: "TrippyJiffy | Best Tour Packages",
    description:
      "Discover India & Asia with TrippyJiffy. Premium curated travel experiences for the modern traveler.",
    images: ["https://trippyjiffy.com/og-banner.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "TrippyJiffy | Best Tour Packages",
    description:
      "Discover India & Asia with TrippyJiffy. Premium curated travel experiences for the modern traveler.",
    images: ["https://trippyjiffy.com/og-banner.jpg"],
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "TravelAgency",
  name: "TrippyJiffy Travel",
  url: "https://trippyjiffy.com/",
  logo: "https://trippyjiffy.com/logo.png",
  image: "https://trippyjiffy.com/banner.jpg",
  description:
    "Unlock India's 4th Dimension of Travel with TrippyJiffy. Premium curated travel experiences, customized itineraries, and professional tour management.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Sector 1, Vikas Nagar",
    addressLocality: "Lucknow",
    addressRegion: "Uttar Pradesh",
    postalCode: "226022",
    addressCountry: "IN",
  },
  telephone: "+91-9870210896",
  priceRange: "$$",
  openingHours: "Mo-Su 09:00-21:00",
  sameAs: [
    "https://www.facebook.com/profile.php?id=61590639771522",
    "https://www.instagram.com/trippy.jiffy",
    "https://twitter.com/trippyjiffy",
    "https://www.linkedin.com/company/trippyjiffy/",
    "https://www.youtube.com/@trippyjiffy",
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {/* Performance Hints */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://checkout.razorpay.com" />
        <link rel="preconnect" href="https://api.razorpay.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />

        {/* LCP Preload */}
        <link rel="preload" as="image" href="/Banner_LCP.webp" fetchPriority="high" />

        {/* Critical Fonts — sans-serif system (Inter, used for headings and body) */}
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />

        {/* Global Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />

        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-MHR3DXPV"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>

        {/* Fallback for Non-JS Crawlers / LLMs */}
        <noscript>
          <div style={{ padding: "20px" }}>
            <h1>TrippyJiffy | Best Tour Packages &amp; Holiday Deals</h1>
            <p>
              Discover India and Asia with TrippyJiffy. We provide premium, curated travel
              experiences, customized itineraries, and professional tour management for the
              modern traveler.
            </p>
            <h2>Popular Destinations</h2>
            <ul>
              <li>Explore India&apos;s Hidden Gems</li>
              <li>Discover Asia&apos;s Rich Culture</li>
            </ul>
            <p>
              Contact us at travelqueries@trippyjiffy.com or call +91-9870210896.
            </p>
            <p>
              Follow us on <a href="https://www.youtube.com/@trippyjiffy">YouTube</a>.
            </p>
          </div>
        </noscript>

        {children}

        {/* Analytics are loaded after hydration to protect Core Web Vitals */}
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            window.gtag = window.gtag || function(){ window.dataLayer.push(arguments); };
            window.gtag("js", new Date());
          `}
        </Script>
        <Script id="gtm-loader" strategy="lazyOnload">
          {`
            (function (w, d, s, l, i) {
              w[l] = w[l] || [];
              w[l].push({ "gtm.start": new Date().getTime(), event: "gtm.js" });
              var f = d.getElementsByTagName(s)[0],
                j = d.createElement(s),
                dl = l != "dataLayer" ? "&l=" + l : "";
              j.async = true;
              j.src = "https://www.googletagmanager.com/gtm.js?id=" + i + dl;
              f.parentNode.insertBefore(j, f);
            })(window, document, "script", "dataLayer", "GTM-MHR3DXPV");
          `}
        </Script>
        <Script
          id="gtag-src"
          strategy="lazyOnload"
          src="https://www.googletagmanager.com/gtag/js?id=G-DGEZY5NBY0"
        />
        <Script id="gtag-config" strategy="lazyOnload">
          {`
            window.gtag && window.gtag("config", "G-DGEZY5NBY0");
            window.gtag && window.gtag("config", "G-XSV86BKWEG");
            window.gtag && window.gtag("config", "AW-17771713499");
          `}
        </Script>
        <Script id="travelpayouts" strategy="lazyOnload">
          {`
            (function () {
              var script = document.createElement("script");
              script.async = 1;
              script.src = 'https://emrldtp.com/NTQ4NjQ1.js?t=548645';
              document.head.appendChild(script);
            })();
          `}
        </Script>
      </body>
    </html>
  );
}
