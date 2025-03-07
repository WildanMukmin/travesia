import RoleGate from "@/components/auth/role-gate";
import DashboardAdminPage from "@/components/dashboard/dashboard-admin-page";
import DashboardMemberPage from "@/components/dashboard/dashboard-member-page";
import DashboardOwnerPage from "@/components/dashboard/dashboard-owner-page";
import { currentUser } from "@/lib/authenticate";
import { Destinasi, Role, User } from "@prisma/client";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default async function Page() {
  const user = await currentUser();
  if (user?.role === Role.ADMIN) {
    return (
      <RoleGate accessRole={Role.ADMIN}>
        <DashboardAdminPage />
      </RoleGate>
    );
  }
  if (user?.role === Role.MEMBER) {
    return (
      <RoleGate accessRole={Role.MEMBER}>
        <DashboardMemberPage name={user.name || "Member"} />
      </RoleGate>
    );
  }
  if (user?.role === Role.OWNER) {
    const sampleDestinasi = {
      id: "550e8400-e29b-41d4-a716-446655440000",
      ownerId: "123456789",
      namaDestinasi: "Pantai Kuta Bali",
      harga: 50000,
      deskripsi:
        "Pantai Kuta adalah salah satu pantai terindah di Bali dengan pasir putih dan ombak yang cocok untuk berselancar. Tempat ini sangat populer di kalangan wisatawan lokal maupun internasional.",
      alamat: "Jl. Pantai Kuta, Kuta, Badung, Bali",
      nomorOwner: "+62812345678",
      kategoriLokasi: "Bali",
      jamOprasional: "08:00 - 18:00",
      fasilitas: [
        "Parkir",
        "Toilet",
        "Kamar Bilas",
        "Penyewaan Papan Selancar",
        "Gazebo",
      ],
      buka: true,
      image: { url: "https://example.com/path/to/image.jpg" },
    };
    return (
      <RoleGate accessRole={Role.OWNER}>
        <DashboardOwnerPage
          user={user as User}
          destinasi={sampleDestinasi as unknown as Destinasi}
        />
      </RoleGate>
    );
  }

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          Terjadi kesalahan, silahkan login kembali
        </AlertDescription>
      </Alert>
    </div>
  );
}
