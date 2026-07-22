import CountryTourDetails from "@/Page/CountryTourDetails";
import { JsonLd } from "@/components/JsonLd";
import {
  fetchAsiaStateById,
  fetchCountryTourByAsiaStateId,
  fetchFaqs,
} from "@/lib/api.server";
import { slugify } from "@/lib/slug";
import {
  breadcrumbJsonLd,
  buildCountryTourMetadata,
  faqPageJsonLd,
  tourPackageJsonLd,
} from "@/lib/seo";

export const revalidate = 3600;

export async function generateMetadata({ params }) {
  const { countryId, asiastateId, stateName } = await params;
  const asiaState = await fetchAsiaStateById(asiastateId);
  const tour = await fetchCountryTourByAsiaStateId(asiastateId);
  const path = `/country/${countryId}/${asiastateId}/${slugify(stateName || asiaState?.state_name)}`;
  return buildCountryTourMetadata(tour, asiaState, path);
}

export default async function Page({ params }) {
  const { countryId, asiastateId, stateName } = await params;
  const asiaState = await fetchAsiaStateById(asiastateId);
  const tour = await fetchCountryTourByAsiaStateId(asiastateId);
  const path = `/country/${countryId}/${asiastateId}/${slugify(stateName || asiaState?.state_name)}`;
  const faqs = tour ? (await fetchFaqs()).filter((f) => String(f.tour_id) === String(tour.id)) : [];

  return (
    <>
      <JsonLd
        data={[
          tourPackageJsonLd(tour, faqs),
          faqPageJsonLd(faqs),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Asia Tours", path: "/destinations" },
            { name: asiaState?.state_name || "Tour", path },
          ]),
        ]}
      />
      <CountryTourDetails skipClientSeo initialTour={tour} initialAsiaState={asiaState} />
    </>
  );
}
