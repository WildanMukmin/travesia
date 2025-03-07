import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  Clock,
  MapPin,
  Phone,
  Info,
  CheckCircle,
  SquarePen,
  UserIcon,
  MapPinIcon,
  PhoneIcon,
  MailIcon,
  BadgeCheck,
  DollarSign,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { Destinasi, User } from "@prisma/client";
import Image from "next/image";

interface DashboardOwnerPageProps {
  user: User;
  destinasi: Destinasi;
}

const DashboardOwnerPage = ({ user, destinasi }: DashboardOwnerPageProps) => {
  const formatPrice = (price: bigint) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(Number(price));
  };

  const truncateDescription = (text: string, maxLength = 150) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + "...";
  };
  return (
    <main className="flex flex-col bg-gray-50">
      <section className="flex p-8">
        <h2 className="text-3xl font-semibold mb-6 text-gray-800">
          Welcome Back,{" "}
          {user?.name && user.name.charAt(0).toUpperCase() + user.name.slice(1)}
        </h2>
      </section>

      <section className="p-8">
        {destinasi?.id ? (
          <Card className="w-full overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="relative w-full h-96 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
              <Image
                src="https://images.unsplash.com/photo-1519046904884-53103b34b206?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGJlYWNofGVufDB8fDB8fHww"
                alt={destinasi.namaDestinasi}
                fill
                className="w-full h-full object-cover"
              />
              {destinasi.buka ? (
                <Badge className="absolute top-4 right-4 z-20 bg-green-500 hover:bg-green-600">
                  Buka
                </Badge>
              ) : (
                <Badge className="absolute top-4 right-4 z-20 bg-red-500 hover:bg-red-600">
                  Tutup
                </Badge>
              )}
            </div>

            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  {destinasi?.namaDestinasi}
                </h2>
                <Badge
                  variant="outline"
                  className="bg-blue-20 text-xl text-blue-700 border-blue-200"
                >
                  {destinasi.kategoriLokasi}
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2">
                  <div className="prose max-w-none">
                    <p className="text-gray-600 mb-6">{destinasi?.deskripsi}</p>

                    <h2 className="text-2xl font-bold text-gray-800 mb-4">
                      Fasilitas
                    </h2>
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      {destinasi?.fasilitas?.map((fasilitas, index) => (
                        <div className="flex items-center" key={index}>
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
                        <UserIcon className="w-5 h-5 text-blue-600 mt-1 mr-3" />
                        <div>
                          <h4 className="font-medium text-gray-900">
                            Pengelola
                          </h4>
                          <p className="text-gray-600">{user?.name}</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <MapPin className="w-5 h-5 text-blue-600 mt-1 mr-3" />
                        <div>
                          <h4 className="font-medium text-gray-900">Lokasi</h4>
                          <p className="text-gray-600">{destinasi?.alamat}</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <Clock className="w-5 h-5 text-blue-600 mt-1 mr-3" />
                        <div>
                          <h4 className="font-medium text-gray-900">
                            Jam Operasional
                          </h4>
                          <p className="text-gray-600">
                            {destinasi.jamOprasional}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <DollarSign className="w-5 h-5 text-blue-600 mt-1 mr-3" />
                        <div>
                          <h4 className="font-medium text-gray-900">
                            Harga Tiket
                          </h4>
                          <p className="text-gray-600 leading-relaxed">
                            {new Intl.NumberFormat("id-ID", {
                              style: "currency",
                              currency: "IDR",
                              minimumFractionDigits: 2,
                            }).format(Number(destinasi.harga))}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/*               
              <div>
                <h3 className="text-xl font-bold text-green-600 mb-1">
                  {formatPrice(destinasi.harga)}
                </h3>
                <div className="text-sm text-gray-700">
                  {destinasi.deskripsi}
                </div>
              </div>

              <div className="flex flex-col">
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-2 text-gray-500" />
                  <span>{destinasi.jamOprasional}</span>
                </div>
                <div className="flex items-center">
                  <Phone className="w-4 h-4 mr-2 text-gray-500" />
                  <span>{destinasi.nomorOwner}</span>
                </div>
              </div>

              <div>
                <p className="text-sm font-medium mb-2">Fasilitas:</p>
                <div className="flex flex-wrap gap-2">
                  {destinasi.fasilitas.map((fasilitas, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="flex items-center gap-1"
                    >
                      <CheckCircle className="w-3 h-3" />
                      {fasilitas}
                    </Badge>
                  ))}
                </div>
              </div> */}
            </CardContent>

            <CardFooter className="flex justify-between pt-2 border-t">
              <div className="text-sm text-gray-500 flex items-center">
                <Info className="w-4 h-4 mr-1" />
                ID: {destinasi.id.substring(0, 8)}...
              </div>
              <Link href={`/destinasi/edit-destinasi?id=${destinasi.id}`}>
                <Button size={"sm"}>
                  <SquarePen />
                  Edit Destinasi
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ) : (
          <Link href={`/destinasi/daftar-destinasi?id=${user.id}`}>
            <div className="w-full flex items-center justify-center p-6">
              <div className="w-full relative overflow-hidden group">
                <Button className="w-full py-10 h-56  border-none relative overflow-hidden transition-all duration-300 shadow-lg hover:shadow-xl group-hover:scale-105">
                  <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>

                  <div className="flex flex-col items-center justify-center space-y-2">
                    <div className="flex items-center mb-2">
                      <span className="text-4xl font-bold">
                        Daftarkan Destinasi Anda
                      </span>
                    </div>

                    <p className="text-lg opacity-90">
                      Promosikan tempat wisata Anda ke ribuan pengunjung
                    </p>

                    <div className="flex items-center mt-4 text-lg">
                      <span>Mulai Sekarang</span>
                      <ArrowRight className="ml-2 h-5 w-5 animate-pulse" />
                    </div>
                  </div>

                  <Sparkles className="absolute top-6 right-10 h-8 w-8 text-yellow-300 animate-pulse" />
                </Button>
              </div>
            </div>
          </Link>
        )}
      </section>

      <section className="p-8">
        <div className="flex p-8 gap-8">
          <Link href={"/blog"} className="w-full">
            <Card className="hover:shadow-lg transition-all w-full">
              <CardContent className="flex items-center p-6">
                <div className="ml-4">
                  <h3 className="text-sm text-gray-500">
                    Postingan Blog Terakhir
                  </h3>
                  <p className="text-2xl font-bold">blog</p>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href={"/blog"} className="w-full">
            <Card className="hover:shadow-lg transition-all w-full">
              <CardContent className="flex items-center p-6">
                <div className="ml-4">
                  <h3 className="text-sm text-gray-500">
                    Postingan Forum Terakhir
                  </h3>
                  <p className="text-2xl font-bold">Forum</p>
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>
      </section>
    </main>
  );
};

export default DashboardOwnerPage;
