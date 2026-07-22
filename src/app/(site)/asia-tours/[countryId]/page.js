import CountryState from "@/Page/CountryState";
import { JsonLd } from "@/components/JsonLd";
import { fetchCountryBySlug } from "@/lib/api.server";
import { slugify } from "@/lib/slug";
import {
  breadcrumbJsonLd,
  buildCountryMetadata,
  countryListingJsonLd,
} from "@/lib/seo";

export const revalidate = 3600;

export async function generateMetadata({ params }) {
  const { countryId } = await params;
  const country = await fetchCountryBySlug(countryId);
  const path = `/asia-tours/${slugify(country?.country_name || countryId)}`;
  return buildCountryMetadata(country, path);
}

export default async function Page({ params }) {
  const { countryId } = await params;
  const country = await fetchCountryBySlug(countryId);
  const path = `/asia-tours/${slugify(country?.country_name || countryId)}`;

  return (
    <>
      <JsonLd
        data={[
          countryListingJsonLd(country, path),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Asia Tours", path: "/destinations" },
            { name: country?.country_name || "Country", path },
          ]),
        ]}
      />
      <CountryState skipClientSeo initialCountry={country} />
    </>
  );
}
