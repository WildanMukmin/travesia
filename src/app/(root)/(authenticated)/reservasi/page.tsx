import { getAllReservasiByUserId } from "@/actions/reservasi";
import RoleGate from "@/components/auth/role-gate";
import ReservasiMemberPage from "@/components/reservasi/reservasi-member-page";
import ReservasiOwnerPage from "@/components/reservasi/reservasi-owner-page";
import { currentUser } from "@/lib/authenticate";
import { Role } from "@prisma/client";

export default async function Page() {
  const user = await currentUser();
  if (user?.role === Role.MEMBER) {
    const reservasi = await getAllReservasiByUserId(user?.id || "");
    return (
      <RoleGate accessRole={Role.MEMBER}>
        <ReservasiMemberPage reservasiData={reservasi} />
      </RoleGate>
    );
  }
  if (user?.role === Role.OWNER) {
    return (
      <RoleGate accessRole={Role.OWNER}>
        <ReservasiOwnerPage />
      </RoleGate>
    );
  }
}
