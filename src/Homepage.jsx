"use client";
import React, { lazy, Suspense } from "react";
import Banner from "./HomeCompontent/Banner";
import AutoLeadPopup from "./HomeCompontent/AutoLeadPopup";

const Destinations = lazy(() => import("./HomeCompontent/Destinations"));
const Testimonials = lazy(() => import("./Page/Testimonials"));
const Blog = lazy(() => import("./HomeCompontent/Blog"));
const Choose = lazy(() => import("./HomeCompontent/Choose"));

const SectionFallback = ({ minHeight = 420 }) => (
  <div aria-hidden="true" style={{ minHeight }} />
);

const Homepage = ({ initialDestinations, initialBlogs }) => {
  return (
    <div>
      <AutoLeadPopup context="Homepage" triggerAfterScrollPercent={60} />

      <Banner />

      <Suspense fallback={<SectionFallback minHeight={620} />}>
        <Destinations initialData={initialDestinations} />
      </Suspense>
      <Suspense fallback={<SectionFallback minHeight={520} />}>
        <Testimonials />
      </Suspense>
      <Suspense fallback={<SectionFallback minHeight={460} />}>
        <Blog initialBlogs={initialBlogs} />
      </Suspense>
      <Suspense fallback={<SectionFallback minHeight={420} />}>
        <Choose />
      </Suspense>
    </div>
  );
};

export default Homepage;
