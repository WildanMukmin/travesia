import { getAllForum } from "@/actions/forum";
import AdminKelolaForumPage from "@/components/admin/admin-kelola-forum-page";
import RoleGate from "@/components/auth/role-gate";
import { Role } from "@prisma/client";

export default async function Page() {
  const forums = await getAllForum();
  return (
    <RoleGate accessRole={Role.ADMIN}>
      <AdminKelolaForumPage forums={forums} />
    </RoleGate>
  );
}
