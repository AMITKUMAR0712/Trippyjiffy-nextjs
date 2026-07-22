import BlogPage from "@/Page/BlogPage";
import { fetchBlogs } from "@/lib/api.server";
import { buildPageMetadata } from "@/lib/seo";

export const revalidate = 3600;

export const metadata = buildPageMetadata({
  title: "Travel Blog & Guides",
  description:
    "Read TrippyJiffy travel blogs — destination guides, travel tips, tourism insights, and holiday inspiration for India and international trips.",
  path: "/blogpage",
});

export default async function Page() {
  const blogs = await fetchBlogs();
  return <BlogPage initialBlogs={blogs} />;
}
