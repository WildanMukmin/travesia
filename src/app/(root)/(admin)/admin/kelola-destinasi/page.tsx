import { getDestinasi } from "@/actions/destinasi";
import AdminKelolaDestinasiPage from "@/components/admin/admin-kelola-destinasi-page";
import RoleGate from "@/components/auth/role-gate";
import { Role } from "@prisma/client";

export default async function Page() {
  const destinasi = await getDestinasi();
  return (
    <RoleGate accessRole={Role.ADMIN}>
      <AdminKelolaDestinasiPage destinasi={destinasi} />
    </RoleGate>
  );
}
