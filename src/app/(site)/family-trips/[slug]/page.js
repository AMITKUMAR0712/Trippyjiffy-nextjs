import LandingTourPage from "@/Page/LandingTourPage";
import { JsonLd } from "@/components/JsonLd";
import { fetchLandingPageBySlug } from "@/lib/api.server";
import { breadcrumbJsonLd, buildLandingMetadata } from "@/lib/seo";

export const revalidate = 3600;

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const page = await fetchLandingPageBySlug(slug);
  return buildLandingMetadata(page, slug);
}

export default async function Page({ params }) {
  const { slug } = await params;
  const page = await fetchLandingPageBySlug(slug);

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: page?.title || "Tour Package", path: `/family-trips/${slug}` },
        ])}
      />
      <LandingTourPage skipClientSeo initialPage={page} />
    </>
  );
}
