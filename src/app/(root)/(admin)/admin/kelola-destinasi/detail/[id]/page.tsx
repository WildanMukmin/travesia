import { getDestinasiById } from "@/actions/destinasi";
import RoleGate from "@/components/auth/role-gate";
import DestinasiDetailPage from "@/components/destinasi/destinasi-detail-page";
import { currentUser } from "@/lib/authenticate";
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
        <DestinasiDetailPage destinasiData={data} user={user} />
      </div>
    </RoleGate>
  );
}
