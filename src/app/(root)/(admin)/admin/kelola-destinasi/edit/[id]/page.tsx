import { getDestinasiById } from "@/actions/destinasi";
import DestinasiDetailPage from "@/components/destinasi/destinasi-detail-page";
import { currentUser } from "@/lib/authenticate";
import RoleGate from "@/components/auth/role-gate";
import { Role } from "@prisma/client";
import DestinasiEditAdminPage from "@/components/destinasi/detinasi-edit-admin";
import Link from "next/link";

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

  const destinasiData = await getDestinasiById(id);
  if (!destinasiData) {
    return (
      <main>
        <h1>Destinasi Tidak Ditemukan</h1>
      </main>
    );
  }

  return (
    <RoleGate accessRole={Role.ADMIN}>
      <main className="py-8 px-4 w-full mx-auto max-w-6xl">
        <Link
          className="text-blue-600 underline underline-offset-1"
          href={`/admin/kelola-destinasi`}
        >
          Kembali ke Daftar...
        </Link>
        <DestinasiEditAdminPage
          destinasiId={id}
          destinasiData={destinasiData}
        />
      </main>
    </RoleGate>
  );
}
