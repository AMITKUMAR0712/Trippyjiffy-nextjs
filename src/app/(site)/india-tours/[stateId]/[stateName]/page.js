import State from "@/Page/State";
import { JsonLd } from "@/components/JsonLd";
import { fetchStateByParams } from "@/lib/api.server";
import {
  breadcrumbJsonLd,
  buildIndiaTourPath,
  buildStateMetadata,
  stateListingJsonLd,
} from "@/lib/seo";

export const revalidate = 3600;

export async function generateMetadata({ params }) {
  const { stateId, stateName } = await params;
  const state = await fetchStateByParams(stateId, stateName);
  const path = buildIndiaTourPath(state, stateId, stateName, false);
  return buildStateMetadata(state, path);
}

export default async function Page({ params }) {
  const { stateId, stateName } = await params;
  const state = await fetchStateByParams(stateId, stateName);
  const path = buildIndiaTourPath(state, stateId, stateName, false);

  return (
    <>
      <JsonLd
        data={[
          stateListingJsonLd(state, path),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "India Tours", path: "/family-tours" },
            { name: state?.state_name || "Tour", path },
          ]),
        ]}
      />
      <State skipClientSeo initialState={state} />
    </>
  );
}
