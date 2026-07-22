import TourDetails from "@/Page/TourDetails";
import { JsonLd } from "@/components/JsonLd";
import { fetchFaqsByTourId, fetchTourById } from "@/lib/api.server";
import {
  breadcrumbJsonLd,
  buildTourMetadata,
  faqPageJsonLd,
  tourPackageJsonLd,
} from "@/lib/seo";

export const revalidate = 3600;

export async function generateMetadata({ params }) {
  const { tourId } = await params;
  const tour = await fetchTourById(tourId);
  return buildTourMetadata(tour);
}

export default async function Page({ params }) {
  const { tourId } = await params;
  const tour = await fetchTourById(tourId);
  const faqs = tour ? await fetchFaqsByTourId(tour.id) : [];

  return (
    <>
      <JsonLd
        data={[
          tourPackageJsonLd(tour, faqs),
          faqPageJsonLd(faqs),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Tours", path: "/family-tours" },
            { name: tour?.tour_name || "Tour", path: `/tour/${tourId}` },
          ]),
        ]}
      />
      <TourDetails skipClientSeo initialTour={tour} />
    </>
  );
}
