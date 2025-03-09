import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  MapPin,
  Clock,
  User,
  ArrowLeft,
  BadgeCheck,
  DollarSign,
  SquarePen,
} from "lucide-react";
import { Role } from "@prisma/client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface DestinasiDetailPageProps {
  userId: string;
  currentUserId: string;
  id: string;
  role: Role;
  namaDestinasi: string;
  kategoriLokasi: string;
  deskripsi: string;
  fasilitas: string[];
  namaOwner: string;
  lokasi: string;
  jamOperasional: string;
  harga: number;
}

const DestinasiDetailPage = ({
  userId,
  currentUserId,
  id,
  role,
  namaDestinasi,
  kategoriLokasi,
  deskripsi,
  fasilitas,
  namaOwner,
  lokasi,
  jamOperasional,
  harga,
}: DestinasiDetailPageProps) => {
  return (
    <main className="mt-10 flex flex-col">
      <div className="flex justify-start mb-8">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/destinasi">Destinasi</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link
                  href={`/destinasi/kategori/${kategoriLokasi.split(" ").join("-")}`}
                >
                  {kategoriLokasi}
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{namaDestinasi}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <Link
        href="/destinasi"
        className="flex items-center text-blue-600 mb-6 hover:underline w-fit"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Kembali ke Destinasi
      </Link>

      {/* Content Section */}
      <div className="p-8">
        <div className="flex justify-between items-start mb-6">
          <div className="mb-4">
            <h1 className="text-4xl font-bold text-gray-900 font-serif mb-2">
              {namaDestinasi}
            </h1>
            <span className="text-gray-600">{kategoriLokasi}</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {/* Hero Section with Image */}
          <div className="relative w-full h-96 hover:scale-105 transition mb-7">
            <Image
              src="https://images.unsplash.com/photo-1739609579483-00b49437cc45?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyfHx8ZW58MHx8fHx8"
              alt={namaDestinasi}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-60"></div>
            {/* <div className="absolute top-4 right-4 flex space-x-2">
            <Button
              variant="outline"
              size="icon"
              className="bg-white text-gray-800 hover:bg-gray-100 rounded-full"
            >
              <Share2 className="w-5 h-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="bg-white text-gray-800 hover:bg-gray-100 rounded-full"
            >
              <Bookmark className="w-5 h-5" />
            </Button>
          </div> */}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <div className="prose max-w-none">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  Tentang Destinasi
                </h2>
                <p className="text-gray-600 mb-6">{deskripsi}</p>

                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  Fasilitas
                </h2>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {/* Fasilitas list */}
                  {fasilitas.map((fasilitas, index) => (
                    <div key={index} className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                        <BadgeCheck className="w-4 h-4 text-blue-600" />
                      </div>
                      <span className="text-gray-700">{fasilitas}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <div className="bg-gray-50 px-6 pb-6 rounded-lg">
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  Informasi
                </h3>

                <div className="space-y-4">
                  <div className="flex items-start">
                    <User className="w-5 h-5 text-blue-600 mt-1 mr-3" />
                    <div>
                      <h4 className="font-medium text-gray-900">Pengelola</h4>
                      <p className="text-gray-600">{namaOwner}</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <MapPin className="w-5 h-5 text-blue-600 mt-1 mr-3" />
                    <div>
                      <h4 className="font-medium text-gray-900">Lokasi</h4>
                      <p className="text-gray-600">{lokasi}</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Clock className="w-5 h-5 text-blue-600 mt-1 mr-3" />
                    <div>
                      <h4 className="font-medium text-gray-900">
                        Jam Operasional
                      </h4>
                      <p className="text-gray-600">
                        Setiap Hari: {jamOperasional} WIB
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <DollarSign className="w-5 h-5 text-blue-600 mt-1 mr-3" />
                    <div>
                      <h4 className="font-medium text-gray-900">Harga Tiket</h4>
                      <p className="text-gray-600 leading-relaxed">
                        {new Intl.NumberFormat("id-ID", {
                          style: "currency",
                          currency: "IDR",
                          minimumFractionDigits: 2,
                        }).format(harga)}
                      </p>
                    </div>
                  </div>
                </div>
                {!role && (
                  <Link href="/login">
                    <Button className="w-full mt-6 bg-blue-600 hover:bg-blue-700">
                      Login Akun Untuk Reservasi
                    </Button>
                  </Link>
                )}

                {role === Role.MEMBER && (
                  <Link href={`/reservasi/buat-reservasi/${id}`}>
                    <Button className="w-full mt-6 bg-blue-600 hover:bg-blue-700">
                      Buat Reservasi
                    </Button>
                  </Link>
                )}

                {role === Role.OWNER && currentUserId === userId && (
                  <Link href={`/destinasi/edit-destinasi?id=${id}`}>
                    <Button className="w-full mt-6 bg-blue-600 hover:bg-blue-700 flex items-center gap-2">
                      <SquarePen />
                      Edit Destinasi
                    </Button>
                  </Link>
                )}

                {role === Role.ADMIN && (
                  <Link href="/dashboard-admin">
                    <Button className="w-full mt-6 bg-blue-600 hover:bg-blue-700">
                      Dashboard Admin
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default DestinasiDetailPage;
