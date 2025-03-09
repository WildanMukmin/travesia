import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import DestinasiCard from "@/components/card/card-destinasi";
import { DestinasiWithOwner } from "@/actions/destinasi";

interface DestinasiKategoriPageProps {
  data: any[];
  kategori: string;
}

const DestinasiKategoriPage = ({
  data,
  kategori,
}: DestinasiKategoriPageProps) => {
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
              <BreadcrumbPage>{kategori.split("-").join(" ")}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div>
        <h2 className="text-3xl font-bold border-b-2 border-blue-800 pb-2 mb-6">
          Destinasi di {kategori.split("-").join(" ")}
        </h2>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {data && data?.length > 0 ? (
              data.map((field) => (
                <DestinasiCard
                  key={field.id}
                  src="https://images.unsplash.com/photo-1739609579483-00b49437cc45?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyfHx8ZW58MHx8fHx8"
                  judul={`${field.namaDestinasi}`}
                  id={field.id}
                  deskripsi={field.deskripsi.slice(0, 100)}
                  kategori={kategori.split("-").join(" ")}
                  penulis={`Owner ${field.owner?.user.name}`}
                />
              ))
            ) : (
              <p>Destinasi Tidak Ditemukan</p>
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

export default DestinasiKategoriPage;
