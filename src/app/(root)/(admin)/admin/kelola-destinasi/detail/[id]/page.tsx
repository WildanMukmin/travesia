import { getDestinasiById } from "@/actions/destinasi";
import DestinasiDetailPage from "@/components/destinasi/destinasi-detail-page";
import { currentUser } from "@/lib/authenticate";
import RoleGate from "@/components/auth/role-gate";
import { Role } from "@prisma/client";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  const data = await getDestinasiById(id);

  if (!id) {
    return null;
  }

  if (!data) {
    return (
      <main>
        <h1>Destinasi Tidak Ditemukan</h1>
      </main>
    );
  }
  const user = await currentUser();
  return (
    <RoleGate accessRole={Role.ADMIN}>
      <div className="max-w-screen-xl mx-auto px-4">
        <DestinasiDetailPage
          userId={data?.owner?.user?.id || ""}
          id={data?.id || ""}
          namaDestinasi={data?.namaDestinasi || ""}
          deskripsi={data?.deskripsi || ""}
          fasilitas={data?.fasilitas || []}
          kategoriLokasi={data?.kategoriLokasi || ""}
          namaOwner={data?.owner?.user?.name || ""}
          lokasi={data?.alamat || ""}
          jamOperasional={data?.jamOprasional || ""}
          harga={data?.harga || 0}
          role={user?.role}
          currentUserId={user?.id || ""}
        />
      </div>
    </RoleGate>
  );
}
