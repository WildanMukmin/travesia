import { getBlog } from "@/actions/blog";
import AdminKelolaBlogPage from "@/components/admin/admin-kelola-blog-page";
import RoleGate from "@/components/auth/role-gate";
import { Role } from "@prisma/client";

export default async function Page() {
  const blog = await getBlog();
  return (
    <RoleGate accessRole={Role.ADMIN}>
      <AdminKelolaBlogPage blogs={blog} />;
    </RoleGate>
  );
}
