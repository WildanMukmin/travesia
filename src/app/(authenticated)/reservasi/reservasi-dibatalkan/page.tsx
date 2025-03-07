import RoleGate from "@/components/auth/role-gate";
import ReservasiMemberDibatalkanPage from "@/components/reservasi/reservasi-member-dibatalkan-page";
import { currentUser } from "@/lib/authenticate";
import { Role } from "@prisma/client";

export default async function Page() {
  const user = await currentUser();
  if (user?.role === Role.MEMBER) {
    return (
      <RoleGate accessRole={Role.MEMBER}>
        <ReservasiMemberDibatalkanPage />
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
