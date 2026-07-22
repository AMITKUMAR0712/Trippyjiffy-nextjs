import BlogDetails from "@/Page/BlogDetails";
import { JsonLd } from "@/components/JsonLd";
import { fetchBlogById } from "@/lib/api.server";
import { blogPostingJsonLd, breadcrumbJsonLd, buildBlogMetadata } from "@/lib/seo";

export const revalidate = 3600;

export async function generateMetadata({ params }) {
  const { id } = await params;
  const blog = await fetchBlogById(id);
  return buildBlogMetadata(blog);
}

export default async function Page({ params }) {
  const { id } = await params;
  const blog = await fetchBlogById(id);

  return (
    <>
      <JsonLd
        data={[
          blogPostingJsonLd(blog),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Blog", path: "/blogpage" },
            { name: blog?.title || "Article", path: `/blog/${id}` },
          ]),
        ]}
      />
      <BlogDetails skipClientSeo initialBlog={blog} />
    </>
  );
}
