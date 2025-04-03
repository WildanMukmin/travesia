import { getOneBlog } from "@/actions/blog";
import RoleGate from "@/components/auth/role-gate";
import BlogEditPage from "@/components/blog/blog-edit-page";
import { Role } from "@prisma/client";
import { redirect } from "next/navigation";
interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  if (!id) {
    redirect("/admin/kelola-blog");
  }
  const blog = await getOneBlog(id);
  return (
    <RoleGate accessRole={Role.ADMIN}>
      <BlogEditPage
        userId={blog?.userId || ""}
        blogId={id}
        blogData={blog}
        admin={true}
      />
    </RoleGate>
  );
}
