import { DestinasiWithOwner } from "@/actions/destinasi";
import DestinasiCard from "@/components/card/card-destinasi";
import DestinasiKategoriCard from "@/components/card/card-kategori";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import Link from "next/link";

interface DestinasiPageProps {
  data: DestinasiWithOwner;
}

const DestinasiPage = ({ data }: DestinasiPageProps) => {
  const kategoriLokasiData = [
    {
      kategori: "Aceh",
      url: "https://images.unsplash.com/photo-1599537504477-ec5a7bb32321?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      kategori: "Bali",
      url: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YmFsaXxlbnwwfHwwfHx8MA%3D%3D",
    },
    {
      kategori: "Banten",
      url: "https://images.unsplash.com/photo-1658061927507-e135012dbe20?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YmFudGVufGVufDB8fDB8fHwy",
    },
    {
      kategori: "Bengkulu",
      url: "https://images.unsplash.com/photo-1665012606236-cd53348976d9?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmVuZ2t1bHV8ZW58MHx8MHx8fDI%3D",
    },
    {
      kategori: "DI Yogyakarta",
      url: "https://images.unsplash.com/photo-1703643511092-956e85a3c783?q=80&w=1891&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      kategori: "DKI Jakarta",
      url: "https://images.unsplash.com/photo-1590930754517-64d5fffa06ac?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8amFrYXJ0YXxlbnwwfHwwfHx8Mg%3D%3D",
    },
    {
      kategori: "Gorontalo",
      url: "https://images.unsplash.com/photo-1605852967399-59aaa3e7ef19?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      kategori: "Jambi",
      url: "https://images.unsplash.com/photo-1595562704137-cd55f334de73?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8amFtYml8ZW58MHx8MHx8fDI%3D",
    },
    {
      kategori: "Jawa Barat",
      url: "https://images.unsplash.com/photo-1571048231310-ee1152ec6094?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      kategori: "Jawa Tengah",
      url: "https://images.unsplash.com/photo-1597133541155-8f2f9da143a6?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      kategori: "Jawa Timur",
      url: "https://images.unsplash.com/photo-1635162500170-c88bcdc44413?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      kategori: "Kalimantan Barat",
      url: "https://images.unsplash.com/photo-1712024280287-9cea82fec948?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8a2FsaW1hbnRhbiUyMGJhcmF0fGVufDB8MXwwfHx8Mg%3D%3D",
    },
    {
      kategori: "Kalimantan Selatan",
      url: "https://images.unsplash.com/photo-1663503539599-4b6aa4fd3078?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      kategori: "Kalimantan Tengah",
      url: "https://images.unsplash.com/photo-1607391414256-ce739c31af36?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      kategori: "Kalimantan Timur",
      url: "https://images.unsplash.com/photo-1670670942843-ad958e253d36?q=80&w=2127&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    { kategori: "Kalimantan Utara", url: null },
    {
      kategori: "Kepulauan Bangka Belitung",
      url: "https://images.unsplash.com/photo-1672717070793-572dbbfffd7d?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      kategori: "Kepulauan Riau",
      url: "https://images.unsplash.com/photo-1628506918761-b76697876826?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      kategori: "Lampung",
      url: "https://images.unsplash.com/photo-1604670858150-d9db9ee4a99c?q=80&w=1872&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      kategori: "Maluku",
      url: "https://images.unsplash.com/photo-1635949602735-1bf023e27b09?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWFsdWt1fGVufDB8fDB8fHwy",
    },
    {
      kategori: "Maluku Utara",
      url: "https://images.unsplash.com/photo-1611229857444-3dc00391d6b5?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      kategori: "Nusa Tenggara Barat",
      url: "https://images.unsplash.com/photo-1661318538348-a80960980a5a?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      kategori: "Nusa Tenggara Timur",
      url: "https://images.unsplash.com/photo-1582391564016-801999ec01d1?q=80&w=2153&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      kategori: "Papua",
      url: "https://images.unsplash.com/photo-1718421670815-1179bb9722cd?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      kategori: "Papua Barat",
      url: "https://images.unsplash.com/photo-1570789210967-2cac24afeb00?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    { kategori: "Papua Barat Daya", url: null },
    { kategori: "Papua Pegunungan", url: null },
    { kategori: "Papua Selatan", url: null },
    { kategori: "Papua Tengah", url: null },
    {
      kategori: "Riau",
      url: "https://images.unsplash.com/photo-1710498089871-d38ecfed9a3c?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    { kategori: "Sulawesi Barat", url: null },
    {
      kategori: "Sulawesi Selatan",
      url: "https://images.unsplash.com/photo-1582426007790-f5a2e2392dd3?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    { kategori: "Sulawesi Tengah", url: null },
    {
      kategori: "Sulawesi Tenggara",
      url: "https://images.unsplash.com/photo-1602144586078-7d95c8d7808c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      kategori: "Sulawesi Utara",
      url: "https://images.unsplash.com/photo-1696326790529-e6a24574db1b?q=80&w=2127&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      kategori: "Sumatera Barat",
      url: "https://images.unsplash.com/photo-1638199406429-f0c6cf5de006?q=80&w=2127&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      kategori: "Sumatera Selatan",
      url: "https://images.unsplash.com/photo-1598675551183-1b091d43f99f?q=80&w=2192&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      kategori: "Sumatera Utara",
      url: "https://images.unsplash.com/photo-1638022351671-119a75b2f6f3?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];
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
              <BreadcrumbPage>Destinasi</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="mb-14">
        <h2 className="text-3xl font-bold border-b-2 border-blue-800 pb-2 mb-6">
          Mau Kemana Hari Ini?
        </h2>
        <div className="flex flex-col gap-3 items-center justify-center">
          <Carousel
            opts={{
              align: "start",
            }}
            className="w-full max-w-6xl"
          >
            <CarouselContent>
              {kategoriLokasiData.map((item, index) => (
                <CarouselItem className="md:basis-1/2 lg:basis-64" key={index}>
                  <DestinasiKategoriCard
                    kategori={`${item.kategori}`}
                    src={
                      item.url ||
                      "https://images.unsplash.com/photo-1740501410249-bed15e937ca0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyN3x8fGVufDB8fHx8fA%3D%3D"
                    }
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>

      <div>
        <h2 className="text-3xl font-bold border-b-2 border-blue-800 pb-2 mb-6">
          Destinasi
        </h2>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {data && data.length > 0 ? (
              data.map((field) => (
                <DestinasiCard
                  key={field.id}
                  src={
                    field.image?.gambar ||
                    "https://images.unsplash.com/photo-1724271362937-391a150db603?w=500&auto=format&fit=crop&q=60"
                  }
                  judul={`${field.namaDestinasi}`}
                  kategori={`${field.kategoriLokasi}`}
                  penulis={`Owner ${field.owner?.user?.name ?? "Unknown"}`}
                  deskripsi={field.deskripsi.slice(0, 100)}
                  id={field.id}
                />
              ))
            ) : (
              <p>Belum ada destinasi</p>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-8">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive>
                2
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </main>
  );
};

export default DestinasiPage;
