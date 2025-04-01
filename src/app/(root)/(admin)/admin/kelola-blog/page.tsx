import { getBlog } from "@/actions/blog";
import AdminKelolaBlogPage from "@/components/admin/admin-kelola-blog-page";

export default async function Page() {
  const blog = await getBlog();
  return <AdminKelolaBlogPage blogs={blog} />;
}
