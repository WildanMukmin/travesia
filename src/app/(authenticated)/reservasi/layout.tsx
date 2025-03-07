import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex min-h-screen bg-gray-50">
      {/* Main Content */}
      <section className="flex-1 p-8">
        <h2 className="text-3xl font-semibold mb-6 text-gray-800">
          Halaman Reservasi
        </h2>
        <div className="flex space-x-4 mb-6">
          <Link href="/reservasi">
            <Button size={"sm"} variant={"outline"}>
              Semua Reservasi
            </Button>
          </Link>
          <Link href="/reservasi/reservasi-selesai">
            <Button size={"sm"} variant={"outline"}>
              Reservasi Selesai
            </Button>
          </Link>
          <Link href="/reservasi/reservasi-dibatalkan">
            <Button size={"sm"} variant={"outline"}>
              Reservasi Dibatalkan
            </Button>
          </Link>
          <Link href="/destinasi">
            <Button size={"sm"} variant={"outline"}>
              Buat Reservasi
            </Button>
          </Link>
        </div>

        {children}
      </section>
    </main>
  );
}
