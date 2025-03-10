import RoleGate from "@/components/auth/role-gate";
import ReservasiMemberDiprosesPage from "@/components/reservasi/reservasi-member-diproses-page";
import { currentUser } from "@/lib/authenticate";
import { Role } from "@prisma/client";

export default async function Page() {
  const user = await currentUser();
  if (user?.role === Role.MEMBER) {
    return (
      <RoleGate accessRole={Role.MEMBER}>
        <ReservasiMemberDiprosesPage />
      </RoleGate>
    );
  }
  if (user?.role === Role.OWNER) {
    return (
      <RoleGate accessRole={Role.OWNER}>
        <h1>Reservasi Dibatalkan Owner</h1>
      </RoleGate>
    );
  }
}
