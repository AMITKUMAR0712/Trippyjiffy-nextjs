import UpcomingDetails from "@/Page/UpcomingDetails";
import { JsonLd } from "@/components/JsonLd";
import { fetchUpcomingById } from "@/lib/api.server";
import { breadcrumbJsonLd, buildUpcomingMetadata, tourPackageJsonLd } from "@/lib/seo";

export const revalidate = 3600;

export async function generateMetadata({ params }) {
  const { id } = await params;
  const trip = await fetchUpcomingById(id);
  return buildUpcomingMetadata(trip);
}

export default async function Page({ params }) {
  const { id } = await params;
  const trip = await fetchUpcomingById(id);

  return (
    <>
      <JsonLd
        data={[
          tourPackageJsonLd(trip),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Upcoming Tours", path: "/upcoming-best-tours" },
            { name: trip?.title || "Tour", path: `/upcoming-best-tours/${id}` },
          ]),
        ]}
      />
      <UpcomingDetails skipClientSeo initialTrip={trip} />
    </>
  );
}
