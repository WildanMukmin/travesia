import { GetOneDestinasiWithOwner } from "@/actions/destinasi";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { CurrentUser } from "@/lib/authenticate";
import { Role } from "@prisma/client";
import {
  ArrowLeft,
  BadgeCheck,
  Clock,
  DollarSign,
  MapPin,
  SquarePen,
  User,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface DestinasiDetailPageProps {
  destinasiData: GetOneDestinasiWithOwner;
  user: CurrentUser;
}

const DestinasiDetailPage = ({
  destinasiData,
  user,
}: DestinasiDetailPageProps) => {
  return (
    <main className="mt-10 flex flex-col">
      {user?.role !== Role.ADMIN && (
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
                    href={`/destinasi/kategori/${destinasiData?.kategoriLokasi.split(" ").join("-")}`}
                  >
                    {destinasiData?.kategoriLokasi}
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{destinasiData?.namaDestinasi}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      )}
      {user?.role === Role.ADMIN ? (
        <div className="w-full flex justify-between">
          <Link
            href="/admin/kelola-destinasi"
            className="flex items-center text-blue-600 mb-6 hover:underline w-fit"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Kembali ke Daftar...
          </Link>
          <Link
            href={`/admin/kelola-destinasi/edit/${destinasiData?.id}`}
            className="mr-8"
          >
            <Button>Edit Destinasi</Button>
          </Link>
        </div>
      ) : (
        <Link
          href="/destinasi"
          className="flex items-center text-blue-600 mb-6 hover:underline w-fit"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Kembali ke Destinasi
        </Link>
      )}

      {/* Content Section */}
      <div className="p-8">
        <div className="flex justify-between items-start mb-6">
          <div className="mb-4">
            <h1 className="text-4xl font-bold text-gray-900 font-serif mb-2">
              {destinasiData?.namaDestinasi}
            </h1>
            <span className="text-gray-600">
              {destinasiData?.kategoriLokasi}
            </span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {/* Hero Section with Image */}
          <div className="relative w-full h-96 hover:scale-105 transition mb-7">
            <Image
              src={
                destinasiData?.image?.gambar ||
                "https://images.unsplash.com/photo-1724271362937-391a150db603?w=500&auto=format&fit=crop&q=60"
              }
              alt={destinasiData?.namaDestinasi || ""}
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
                <p className="text-gray-600 mb-6">{destinasiData?.deskripsi}</p>

                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  Fasilitas
                </h2>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {/* Fasilitas list */}
                  {destinasiData?.fasilitas.map((fasilitas, index) => (
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
                      <p className="text-gray-600">
                        {destinasiData?.owner.user.name}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <MapPin className="w-5 h-5 text-blue-600 mt-1 mr-3" />
                    <div>
                      <h4 className="font-medium text-gray-900">Lokasi</h4>
                      <p className="text-gray-600">{destinasiData?.alamat}</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Clock className="w-5 h-5 text-blue-600 mt-1 mr-3" />
                    <div>
                      <h4 className="font-medium text-gray-900">
                        Jam Operasional
                      </h4>
                      <p className="text-gray-600">
                        Setiap Hari: {destinasiData?.jamOprasional} WIB
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
                        }).format(destinasiData?.harga || 0)}
                      </p>
                    </div>
                  </div>
                </div>
                {!user?.role && (
                  <Link href="/login">
                    <Button className="w-full mt-6 bg-blue-600 hover:bg-blue-700">
                      Login Akun Untuk Reservasi
                    </Button>
                  </Link>
                )}

                {user?.role === Role.MEMBER && (
                  <Link href={`/reservasi/buat-reservasi/${destinasiData?.id}`}>
                    <Button className="w-full mt-6 bg-blue-600 hover:bg-blue-700">
                      Buat Reservasi
                    </Button>
                  </Link>
                )}

                {user?.role === Role.OWNER &&
                  user.id === destinasiData?.owner.user.id && (
                    <Link
                      href={`/destinasi/edit-destinasi?id=${destinasiData?.id}`}
                    >
                      <Button className="w-full mt-6 bg-blue-600 hover:bg-blue-700 flex items-center gap-2">
                        <SquarePen />
                        Edit Destinasi
                      </Button>
                    </Link>
                  )}

                {user?.role === Role.ADMIN && (
                  <Link
                    href={`/admin/kelola-destinasi/edit/${destinasiData?.id}`}
                  >
                    <Button className="w-full mt-6 bg-blue-600 hover:bg-blue-700">
                      Edit Destinasi
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
