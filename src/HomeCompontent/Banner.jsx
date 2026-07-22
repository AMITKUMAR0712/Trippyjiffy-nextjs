"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDebounce } from "../hooks/useDebounce";
import { Search, MapPin, ArrowRight } from "lucide-react";
import Style from "../Style/Banner.module.scss";

const LCP_IMAGE = "/banner/lcp.webp";
const EXTRA_SLIDES = [
  { src: "/banner/2.webp", alt: "India tour packages" },
  { src: "/banner/3.webp", alt: "Affordable travelling packages in India" },
  { src: "/banner/4.webp", alt: "Affordable travelling packages in India" },
];

const Banner = () => {
  const [combinedData, setCombinedData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [hasLoadedSearchData, setHasLoadedSearchData] = useState(false);
  const [enableCarousel, setEnableCarousel] = useState(false);
  const [SwiperBits, setSwiperBits] = useState(null);

  const router = useRouter();
  const debouncedSearch = useDebounce(searchTerm, 500);
  const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://trippyjiffy.com";

  // Defer Swiper + extra slides until after LCP (idle / 3s / interaction)
  useEffect(() => {
    let cancelled = false;
    const startCarousel = async () => {
      if (cancelled) return;
      try {
        const [{ Swiper, SwiperSlide }, modules, css, navCss, fadeCss] = await Promise.all([
          import("swiper/react"),
          import("swiper/modules"),
          import("swiper/css"),
          import("swiper/css/navigation"),
          import("swiper/css/effect-fade"),
        ]);
        if (cancelled) return;
        // keep css side-effects
        void css;
        void navCss;
        void fadeCss;
        setSwiperBits({
          Swiper,
          SwiperSlide,
          Navigation: modules.Navigation,
          Autoplay: modules.Autoplay,
          EffectFade: modules.EffectFade,
        });
        setEnableCarousel(true);
      } catch (err) {
        console.error("Banner carousel deferred load failed:", err);
      }
    };

    const onInteract = () => {
      startCarousel();
      cleanup();
    };
    const cleanup = () => {
      window.removeEventListener("scroll", onInteract);
      window.removeEventListener("touchstart", onInteract);
      window.removeEventListener("click", onInteract);
    };

    window.addEventListener("scroll", onInteract, { once: true, passive: true });
    window.addEventListener("touchstart", onInteract, { once: true, passive: true });
    window.addEventListener("click", onInteract, { once: true });

    const idle = window.requestIdleCallback || ((cb) => setTimeout(cb, 3000));
    const idleId = idle(() => startCarousel(), { timeout: 4000 });
    const fallback = setTimeout(startCarousel, 3500);

    return () => {
      cancelled = true;
      cleanup();
      clearTimeout(fallback);
      if (window.cancelIdleCallback) window.cancelIdleCallback(idleId);
    };
  }, []);

  const loadSearchData = async () => {
    if (hasLoadedSearchData) return;
    try {
      const res = await fetch(`${baseURL}/api/combined-data`);
      const data = await res.json();
      setCombinedData(data || []);
      setHasLoadedSearchData(true);
    } catch (err) {
      console.error("Error fetching combined data:", err.message);
    }
  };

  useEffect(() => {
    if (debouncedSearch.trim() === "") {
      setFilteredResults([]);
      setShowDropdown(false);
      return;
    }
    const filtered = combinedData.filter((item) => {
      const name = item.state_name || item.country_name || "";
      return name.toLowerCase().includes(debouncedSearch.toLowerCase());
    });
    setFilteredResults(filtered);
    setShowDropdown(true);
  }, [debouncedSearch, combinedData]);

  const slugify = (text) => {
    if (!text) return "";
    return text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-");
  };

  const handleSelectItem = (item) => {
    const name = item.state_name || item.country_name;
    setSearchTerm(name);
    setShowDropdown(false);
    const slug = slugify(name);
    if (item.state_name) {
      router.push(`/india-tours/state/${item.id}/${slug}`);
    } else {
      router.push(`/asia-tours/${slug}`);
    }
  };

  const allSlides = [
    { src: LCP_IMAGE, alt: "Best family tours in India" },
    ...EXTRA_SLIDES,
  ];

  return (
    <div className={Style.Banner}>
      {enableCarousel && SwiperBits ? (
        <SwiperBits.Swiper
          modules={[SwiperBits.Navigation, SwiperBits.Autoplay, SwiperBits.EffectFade]}
          loop={allSlides.length >= 2}
          effect="fade"
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          speed={1200}
          className={Style.swiperContainer}
        >
          {allSlides.map((slide, idx) => (
            <SwiperBits.SwiperSlide key={slide.src}>
              <div className={Style.slide}>
                <img
                  src={slide.src}
                  alt={slide.alt}
                  className={Style.bannerImage}
                  width={1280}
                  height={720}
                  loading={idx === 0 ? "eager" : "lazy"}
                  fetchPriority={idx === 0 ? "high" : "low"}
                  decoding={idx === 0 ? "sync" : "async"}
                />
                <div className={Style.overlay} />
              </div>
            </SwiperBits.SwiperSlide>
          ))}
        </SwiperBits.Swiper>
      ) : (
        <div className={Style.swiperContainer}>
          <div className={Style.slide}>
            <img
              src={LCP_IMAGE}
              alt="Best family tours in India"
              className={Style.bannerImage}
              width={1280}
              height={720}
              loading="eager"
              fetchPriority="high"
              decoding="sync"
            />
            <div className={Style.overlay} />
          </div>
        </div>
      )}

      <div className={Style.contentWrapper}>
        <div className={Style.Bannertext}>
          <span className={Style.badge}>Explore the 4th Dimension</span>
          <h1 title="Best India Tours & Family Tour Packages">
            Best India Tours & <span>Family Tour Packages</span>
          </h1>
          <p>
            Explore affordable travelling packages in India with customized family tours,
            honeymoon trips, group tours, and international holiday packages.
          </p>

          <div className={Style.searchContainer}>
            <div className={Style.searchBox}>
              <div className={Style.iconWrapper}>
                <MapPin size={20} />
              </div>
              <input
                type="text"
                placeholder="Where do you want to go?"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  loadSearchData();
                }}
                onFocus={() => {
                  loadSearchData();
                  if (searchTerm.trim() !== "") setShowDropdown(true);
                }}
              />
              <button className={Style.searchBtn} type="button">
                <Search size={20} />
                <span>Search</span>
              </button>

              {showDropdown && filteredResults.length > 0 && (
                <div className={Style.searchResults}>
                  {filteredResults.map((item) => (
                    <div
                      key={item.id}
                      className={Style.searchItem}
                      onClick={() => handleSelectItem(item)}
                    >
                      <MapPin size={16} />
                      <span>{item.state_name || item.country_name}</span>
                      <ArrowRight size={14} className={Style.itemArrow} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className={Style.features}>
            <div className={Style.featureItem}>
              <strong>500+</strong>
              <span>Destinations</span>
            </div>
            <div className={Style.separator} />
            <div className={Style.featureItem}>
              <strong>10k+</strong>
              <span>Happy Travelers</span>
            </div>
            <div className={Style.separator} />
            <div className={Style.featureItem}>
              <strong>4.9/5</strong>
              <span>Average Rating</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
