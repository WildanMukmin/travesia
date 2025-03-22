import { Button } from "@/components/ui/button";
import { Role } from "@prisma/client";
import Link from "next/link";

interface ReservasiWrapComponentProps {
  children: React.ReactNode;
  role: Role;
  handleFilter: (status: string) => void;
}

const ReservasiWrapComponent = ({
  children,
  role,
  handleFilter,
}: ReservasiWrapComponentProps) => {
  return (
    <main className="flex min-h-screen bg-gray-50">
      {/* Main Content */}
      <section className="flex-1 p-8">
        <h2 className="text-3xl font-semibold mb-6 text-gray-800">
          Halaman Reservasi
        </h2>
        <div className="flex space-x-4 mb-6">
          <Button
            onClick={() => handleFilter && handleFilter("all")}
            size={"sm"}
            variant={"default"}
          >
            Semua Reservasi
          </Button>
          <Button
            onClick={() => handleFilter && handleFilter("diproses")}
            size={"sm"}
            variant={"default"}
          >
            Reservasi Diproses
          </Button>
          <Button
            onClick={() => handleFilter && handleFilter("selesai")}
            size={"sm"}
            variant={"default"}
          >
            Reservasi Selesai
          </Button>
          <Button
            onClick={() => handleFilter && handleFilter("dibatalkan")}
            size={"sm"}
            variant={"default"}
          >
            Reservasi Dibatalkan
          </Button>
          <Button
            onClick={() => handleFilter && handleFilter("pengajuan")}
            size={"sm"}
            variant={"default"}
          >
            Pengajuan Pembatalan
          </Button>
          {role === Role.MEMBER && (
            <Link href="/destinasi">
              <Button size={"sm"} variant={"default"}>
                Buat Reservasi
              </Button>
            </Link>
          )}
        </div>

        {children}
      </section>
    </main>
  );
};

export default ReservasiWrapComponent;
