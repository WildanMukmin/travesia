import { getBlog } from "@/actions/blog";
import BlogPage from "@/components/blog/blog-page";

export default async function Page() {
  const blog = await getBlog();
  return <BlogPage blogData={blog} />;
}
