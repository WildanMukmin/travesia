import RoleGate from "@/components/auth/role-gate";
import ReservasiMemberDetailPage from "@/components/reservasi/reservasi-member-detail-page";
import { currentUser } from "@/lib/authenticate";
import { Role } from "@prisma/client";

export default async function Page() {
  const user = await currentUser();
  if (user?.role === Role.MEMBER) {
    return (
      <RoleGate accessRole={Role.MEMBER}>
        <ReservasiMemberDetailPage
          id={user.id || ""}
          namaUser={user.name || ""}
          telponUser={"097192836232"}
          namaOwner={"Wildan Mukmin"}
          namaDestinasi={"Pahawang"}
          alamatDestinasi={
            "jln pahawang no 1 lampung tengah lorem ipsum lorem ipsum lorem ipsum"
          }
          jumlahOrang={2}
          tanggalReservasi={"2023-01-01"}
          statusReservasi={"diproses"}
          jamReservasi={new Date()}
        />
      </RoleGate>
    );
  }
  if (user?.role === Role.OWNER) {
    return (
      <RoleGate accessRole={Role.OWNER}>
        <h1>Reservasi Detail Owner</h1>
      </RoleGate>
    );
  }
}
