import "./globals.css";
import Script from "next/script";
import { Inter } from "next/font/google";
import { JsonLd } from "@/components/JsonLd";
import { travelAgencyJsonLd, localBusinessJsonLd } from "@/lib/seo";
import { SITE_NAME } from "@/lib/site";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-inter",
  preload: true,
  adjustFontFallback: true,
});

export const metadata = {
  metadataBase: new URL("https://trippyjiffy.com"),
  title: {
    default:
      "Best Family Tour Packages in India & Overseas | TrippyJiffy",
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "Book customized family tours, India tour packages, overseas holidays, honeymoon trips, and group travel deals with TrippyJiffy. Expert itinerary planning and affordable vacation packages.",
  keywords: [
    "family tour packages",
    "India tour packages",
    "travelling packages in India",
    "vacation packages",
    "overseas tour packages",
    "honeymoon packages",
    "TrippyJiffy",
  ],
  authors: [{ name: SITE_NAME }],
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
  },
  verification: {
    google: "Vl74CMXxnE8ovZb1mtkCyPSopPEEIrr72_cOlJ39xn0",
  },
  icons: {
    icon: "/trippylogo.webp",
  },
  alternates: {
    canonical: "https://trippyjiffy.com/",
  },
  openGraph: {
    type: "website",
    url: "https://trippyjiffy.com/",
    title: "Best Family Tour Packages in India & Overseas | TrippyJiffy",
    description:
      "Book customized family tours, India tour packages, overseas holidays, and group travel deals with TrippyJiffy.",
    siteName: SITE_NAME,
    images: [
      {
        url: "https://trippyjiffy.com/og-banner.jpg",
        width: 1200,
        height: 630,
        alt: "TrippyJiffy Tour Packages",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Best Family Tour Packages in India & Overseas | TrippyJiffy",
    description:
      "Book customized family tours, India tour packages, overseas holidays, and group travel deals with TrippyJiffy.",
    images: ["https://trippyjiffy.com/og-banner.jpg"],
  },
  other: {
    "google-site-verification": "Vl74CMXxnE8ovZb1mtkCyPSopPEEIrr72_cOlJ39xn0",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link
          rel="preload"
          as="image"
          href="/banner/lcp.webp"
          fetchPriority="high"
          type="image/webp"
        />
      </head>
      <body className={inter.className}>
        <JsonLd data={[travelAgencyJsonLd, localBusinessJsonLd]} />

        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-MHR3DXPV"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
            title="Google Tag Manager"
          />
        </noscript>

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
          </div>
        </noscript>

        {children}

        {/* Analytics only after real user interaction or 12s — protects LCP/TBT */}
        <Script id="gtag-init" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            window.gtag = window.gtag || function(){ window.dataLayer.push(arguments); };
          `}
        </Script>
        <Script id="deferred-third-party" strategy="lazyOnload">
          {`
            (function () {
              function loadThirdPartyScripts() {
                if (window.__tjScriptsLoaded) return;
                window.__tjScriptsLoaded = true;
                window.gtag && window.gtag("js", new Date());
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
                var gtagScript = document.createElement("script");
                gtagScript.async = true;
                gtagScript.src = "https://www.googletagmanager.com/gtag/js?id=G-DGEZY5NBY0";
                document.head.appendChild(gtagScript);
                gtagScript.onload = function () {
                  window.gtag && window.gtag("config", "G-DGEZY5NBY0");
                  window.gtag && window.gtag("config", "G-XSV86BKWEG");
                  window.gtag && window.gtag("config", "AW-17771713499");
                };
                var tpScript = document.createElement("script");
                tpScript.async = true;
                tpScript.src = "https://emrldtp.com/NTQ4NjQ1.js?t=548645";
                document.head.appendChild(tpScript);
              }
              ["scroll", "click", "touchstart", "keydown"].forEach(function (evt) {
                window.addEventListener(evt, loadThirdPartyScripts, { once: true, passive: true });
              });
              setTimeout(loadThirdPartyScripts, 12000);
            })();
          `}
        </Script>
      </body>
    </html>
  );
}
