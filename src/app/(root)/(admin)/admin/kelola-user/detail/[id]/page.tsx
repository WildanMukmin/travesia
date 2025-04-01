import RoleGate from "@/components/auth/role-gate";
import ProfileMemberPage from "@/components/profile/profile-member-page";
import ProfileOwnerPage from "@/components/profile/profile-owner-page";
import { Button } from "@/components/ui/button";
import { getUserById } from "@/data/user";
import { getProfile } from "@/lib/profile";
import { Role } from "@prisma/client";
import { UserPen } from "lucide-react";
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

  const user = await getUserById(id);
  if (user?.role === Role.MEMBER && user.id) {
    const userData = await getProfile(user.id);
    return (
      <RoleGate accessRole={Role.ADMIN}>
        <main className="py-8 px-4 w-full mx-auto max-w-4xl">
          <Link
            className="text-blue-600 underline underline-offset-1"
            href={"/admin/kelola-user"}
          >
            Back to List....
          </Link>
          <ProfileMemberPage userData={userData} />
        </main>
      </RoleGate>
    );
  }
  if (user?.role === Role.OWNER && user.id) {
    const userData = await getProfile(user.id);
    return (
      <RoleGate accessRole={Role.ADMIN}>
        <main className="py-8 px-4 w-full mx-auto max-w-4xl">
          <Link
            className="text-blue-600 underline underline-offset-1"
            href={"/admin/kelola-user"}
          >
            Back to List....
          </Link>
          <ProfileOwnerPage userData={userData} />
        </main>
      </RoleGate>
    );
  }
  if (user?.role === Role.ADMIN) {
    const userData = await getProfile(user.id);
    return (
      <main className="py-8 px-4 w-full mx-auto max-w-3xl">
        <Link
          className="text-blue-600 underline underline-offset-1"
          href={"/admin/kelola-user"}
        >
          Back to List....
        </Link>
        <div className="bg-white rounded-xl shadow-md overflow-hidden mt-5">
          {/* Header dengan info utama */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-white">
            <h1 className="text-2xl font-bold">Profil Pengguna</h1>
          </div>

          <div className="md:flex">
            {/* Bagian data profil */}
            <section className="md:w-2/3 p-6">
              <h2 className="text-xl font-semibold mb-6 text-gray-800 border-b pb-2">
                Informasi Pribadi
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-500">
                    Nama
                  </label>
                  <p className="text-gray-800 font-medium">
                    {userData?.name || "-"}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-500">
                    Email
                  </label>
                  <p className="text-gray-800 font-medium">
                    {userData?.email || "-"}
                  </p>
                </div>
              </div>
            </section>
          </div>
          <div className="mt-8">
            <Link href="/profile/edit-profile">
              <Button
                size={"sm"}
                className="px-4 w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors mr-3"
              >
                <UserPen />
                Edit Profil
              </Button>
            </Link>
          </div>
        </div>
      </main>
    );
  }
}
