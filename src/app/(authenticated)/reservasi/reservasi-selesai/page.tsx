import RoleGate from "@/components/auth/role-gate";
import ReservasiMemberSelesaiPage from "@/components/reservasi/reservasi-member-selesai-page";
import { currentUser } from "@/lib/authenticate";
import { Role } from "@prisma/client";

export default async function Page() {
  const user = await currentUser();
  if (user?.role === Role.MEMBER) {
    return (
      <RoleGate accessRole={Role.MEMBER}>
        <ReservasiMemberSelesaiPage />
      </RoleGate>
    );
  }
  if (user?.role === Role.OWNER) {
    return (
      <RoleGate accessRole={Role.OWNER}>
        <h1>Reservasi Selesai Owner</h1>
      </RoleGate>
    );
  }
}
