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

interface DestinasiKategoriPageProps {
  kategori: string;
}

const DestinasiKategoriPage = ({ kategori }: DestinasiKategoriPageProps) => {
  return (
    <main>
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
                <Link href={`/destinasi/kategori/${kategori}`}>
                  {kategori.charAt(0).toUpperCase() + kategori.slice(1)}
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div>
        <h2 className="text-3xl font-bold border-b-2 border-blue-800 pb-2 mb-6">
          Destinasi di {kategori.charAt(0).toUpperCase() + kategori.slice(1)}
        </h2>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <DestinasiCard
              src="https://images.unsplash.com/photo-1739609579483-00b49437cc45?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyfHx8ZW58MHx8fHx8"
              judul="Destinasi 1"
              id="jne9q8uw0rqi-weri023h9rhdf9wehq0-csdas"
              deskripsi="Deskripsi Singkat"
              kategori={kategori.charAt(0).toUpperCase() + kategori.slice(1)}
              penulis="Penulis 1"
            />
            <DestinasiCard
              src="https://images.unsplash.com/photo-1739609579483-00b49437cc45?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyfHx8ZW58MHx8fHx8"
              judul="Destinasi 1"
              id="jne9q8uw0rqi-weri023h9rhdf9wehq0-csdas"
              deskripsi="Deskripsi Singkat"
              kategori={kategori.charAt(0).toUpperCase() + kategori.slice(1)}
              penulis="Penulis 1"
            />
            <DestinasiCard
              src="https://images.unsplash.com/photo-1739609579483-00b49437cc45?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyfHx8ZW58MHx8fHx8"
              judul="Destinasi 1"
              id="jne9q8uw0rqi-weri023h9rhdf9wehq0-csdas"
              deskripsi="Deskripsi Singkat"
              kategori={kategori.charAt(0).toUpperCase() + kategori.slice(1)}
              penulis="Penulis 1"
            />
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
