import { getDestinasiById } from "@/actions/destinasi";
import RoleGate from "@/components/auth/role-gate";
import ReservasiMemberBuatReservasi from "@/components/reservasi/reservasi-member-buat-reservasi";
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
  const destinasi = await getDestinasiById(id);
  if (user?.role === Role.MEMBER) {
    return (
      <RoleGate accessRole={Role.MEMBER}>
        <ReservasiMemberBuatReservasi
          userOwnerId={destinasi?.owner?.user?.id || ""}
          destinasiId={id}
          userId={user.id || ""}
          namaDestinasi={destinasi?.namaDestinasi || ""}
          deskripsi={destinasi?.deskripsi || ""}
          harga={destinasi?.harga.toString() || "0"}
          kategoriLokasi={destinasi?.kategoriLokasi || ""}
          nomorOwner={destinasi?.nomorOwner || ""}
          alamatDestinasi={destinasi?.alamat || ""}
        />
      </RoleGate>
    );
  }
}
