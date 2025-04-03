import AdminKelolaAkunPage from "@/components/admin/admin-kelola-akun-page";
import { getAllUser } from "@/data/user";
import RoleGate from "@/components/auth/role-gate";
import { Role } from "@prisma/client";

export default async function Page() {
  const users = await getAllUser();
  return (
    <RoleGate accessRole={Role.ADMIN}>
      <AdminKelolaAkunPage users={users} />;
    </RoleGate>
  );
}
