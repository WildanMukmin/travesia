"use client";

import { Button } from "@/components/ui/button";
import { GetProfileType } from "@/lib/profile";
import { User, UserPen } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface ProfileMemberPageProps {
  userData: GetProfileType;
  admin?: boolean;
}

const ProfileMemberPage = ({ userData, admin }: ProfileMemberPageProps) => {
  return (
    <main className="py-8 px-4 w-full mx-auto">
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        {/* Header dengan info utama */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-white">
          <h1 className="text-2xl font-bold">Profil Pengguna</h1>
        </div>

        <div className="md:flex">
          {/* Bagian foto profil */}
          <section className="md:w-1/3 p-6 flex flex-col items-center justify-center border-r border-gray-200">
            <div className="relative w-48 h-48 rounded-full overflow-hidden mb-4 border-4 border-white">
              {userData?.imageProfile ? (
                <Image
                  src={userData?.imageProfile}
                  alt={`Foto profil ${userData.name || "pengguna"}`}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <span className="text-4xl text-gray-400">
                    <User size="48px" />
                  </span>
                </div>
              )}
            </div>
          </section>

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

              <div>
                <label className="block text-sm font-medium text-gray-500">
                  Gender
                </label>
                <p className="text-gray-800 font-medium">
                  {userData?.member?.gender || "-"}
                </p>
              </div>
            </div>
          </section>
        </div>
        <div className="mt-8">
          {admin ? (
            <Link href={`/admin/kelola-user/edit/${userData?.id}`}>
              <Button
                size={"sm"}
                className="px-4 w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors mr-3"
              >
                <UserPen />
                Edit Profil
              </Button>
            </Link>
          ) : (
            <Link href="/profile/edit-profile">
              <Button
                size={"sm"}
                className="px-4 w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors mr-3"
              >
                <UserPen />
                Edit Profil
              </Button>
            </Link>
          )}
        </div>
      </div>
    </main>
  );
};

export default ProfileMemberPage;
