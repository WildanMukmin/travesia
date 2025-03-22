import { getReservasiById } from "@/actions/reservasi";
import RoleGate from "@/components/auth/role-gate";
import ReservasiMemberDetailPage from "@/components/reservasi/reservasi-member-detail-page";
import ReservasiOwnerDetailPage from "@/components/reservasi/reservasi-owner-detail-page";
import { currentUser } from "@/lib/authenticate";
import { Role } from "@prisma/client";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  if (!id) {
    return null;
  }
  const user = await currentUser();
  if (user?.role === Role.MEMBER) {
    const reservasi = await getReservasiById(id);
    return (
      <RoleGate accessRole={Role.MEMBER}>
        <ReservasiMemberDetailPage reservasiData={reservasi} />
      </RoleGate>
    );
  }
  if (user?.role === Role.OWNER) {
    const reservasi = await getReservasiById(id);
    return (
      <RoleGate accessRole={Role.OWNER}>
        <ReservasiOwnerDetailPage reservasiData={reservasi} />
      </RoleGate>
    );
  }
}
