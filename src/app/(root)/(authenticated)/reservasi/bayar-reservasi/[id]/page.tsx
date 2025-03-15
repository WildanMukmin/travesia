import { batalReservasi, getReservasiById } from "@/actions/reservasi";
import RoleGate from "@/components/auth/role-gate";
import ReservasiMemberPembayaranPage from "@/components/reservasi/reservasi-member-pembayaran-page";
import { currentUser } from "@/lib/authenticate";
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
    redirect("/destinasi");
  }

  const user = await currentUser();

  if (user?.role === Role.MEMBER) {
    const reservasi = await getReservasiById(id);

    if (!reservasi) {
      return <p>Reservasi tidak ditemukan.</p>;
    }

    if (reservasi.status === "selesai") {
      return <p>Reservasi telah selesai.</p>;
    }

    const hasExpired =
      reservasi.expired !== undefined
        ? new Date(reservasi.expired) < new Date()
        : false;

    let updatedReservasi = { ...reservasi };

    if (hasExpired && reservasi.status !== "dibatalkan" && user.id) {
      await batalReservasi(id, user.id);
      updatedReservasi.status = "dibatalkan";
    }

    return (
      <RoleGate accessRole={Role.MEMBER}>
        <ReservasiMemberPembayaranPage id={id} reservasi={updatedReservasi} />
      </RoleGate>
    );
  }
}
