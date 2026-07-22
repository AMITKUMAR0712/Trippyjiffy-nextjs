"use client";
import React, { lazy, Suspense, useEffect, useRef, useState } from "react";
import Banner from "./HomeCompontent/Banner";
import AutoLeadPopup from "./HomeCompontent/AutoLeadPopup";

const Destinations = lazy(() => import("./HomeCompontent/Destinations"));
const Testimonials = lazy(() => import("./Page/Testimonials"));
const Blog = lazy(() => import("./HomeCompontent/Blog"));
const Choose = lazy(() => import("./HomeCompontent/Choose"));

const SectionFallback = ({ minHeight = 420 }) => (
  <div aria-hidden="true" style={{ minHeight, contentVisibility: "auto" }} />
);

function LazySection({ minHeight, children }) {
  const ref = useRef(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setShow(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShow(true);
          io.disconnect();
        }
      },
      { rootMargin: "200px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} style={{ minHeight, contentVisibility: "auto" }}>
      {show ? children : <SectionFallback minHeight={minHeight} />}
    </div>
  );
}

const Homepage = ({ initialDestinations, initialBlogs }) => {
  return (
    <div>
      <AutoLeadPopup context="Homepage" triggerAfterScrollPercent={60} />

      <Banner />

      <LazySection minHeight={620}>
        <Suspense fallback={<SectionFallback minHeight={620} />}>
          <Destinations initialData={initialDestinations} />
        </Suspense>
      </LazySection>
      <LazySection minHeight={520}>
        <Suspense fallback={<SectionFallback minHeight={520} />}>
          <Testimonials />
        </Suspense>
      </LazySection>
      <LazySection minHeight={460}>
        <Suspense fallback={<SectionFallback minHeight={460} />}>
          <Blog initialBlogs={initialBlogs} />
        </Suspense>
      </LazySection>
      <LazySection minHeight={420}>
        <Suspense fallback={<SectionFallback minHeight={420} />}>
          <Choose />
        </Suspense>
      </LazySection>
    </div>
  );
};

export default Homepage;
