import { getOneBlog } from "@/actions/blog";
import RoleGate from "@/components/auth/role-gate";
import BlogEditPage from "@/components/blog/blog-edit-page";
import { redirect } from "next/navigation";
import { Role } from "@prisma/client";
import { currentUser } from "@/lib/authenticate";

interface PageProps {
  params: { id: string };
  searchParams: { userId?: string };
}

export default async function Page({ params, searchParams }: PageProps) {
  const { id } = params;
  if (!id) {
    redirect("/admin/kelola-blog");
  }

  const userId = searchParams.userId || "";
  const blog = await getOneBlog(id);

  return (
    <RoleGate accessRole={Role.ADMIN}>
      <BlogEditPage userId={userId} blogId={id} blogData={blog} admin={true} />
    </RoleGate>
  );
}
