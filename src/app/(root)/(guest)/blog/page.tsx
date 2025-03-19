import { getBlog } from "@/actions/blog";
import BlogPage from "@/components/blog/blog-page";
import { currentUser } from "@/lib/authenticate";

export default async function Page() {
  const blog = await getBlog();
  const user = await currentUser();
  return <BlogPage blogData={blog} user={user} />;
}
