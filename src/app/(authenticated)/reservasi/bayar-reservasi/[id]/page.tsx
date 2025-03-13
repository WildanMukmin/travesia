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

    const hasExpired =
      reservasi.expired !== undefined
        ? new Date(reservasi.expired) < new Date()
        : false;

    let updatedReservasi = { ...reservasi }; // Copy object agar tidak memodifikasi langsung

    if (hasExpired) {
      await batalReservasi(id);
      updatedReservasi.status = "dibatalkan"; // Update status sebelum dikirim ke props
    }

    return (
      <RoleGate accessRole={Role.MEMBER}>
        <ReservasiMemberPembayaranPage id={id} reservasi={updatedReservasi} />
      </RoleGate>
    );
  }
}
