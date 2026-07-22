import Payment from "@/Page/Payment";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Payment",
  description: "Complete your TrippyJiffy tour booking payment.",
  path: "/payment",
  noIndex: true,
});

export default function Page() {
  return <Payment />;
}
