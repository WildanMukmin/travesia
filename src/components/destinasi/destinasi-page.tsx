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

const DestinasiPage = () => {
  return (
    <main className="mt-10 flex flex-col">
      <h2 className="text-3xl font-bold border-b-2 border-blue-800 pb-2 mb-6">
        Destinasi
      </h2>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <DestinasiCard
            src="https://images.unsplash.com/photo-1739609579483-00b49437cc45?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyfHx8ZW58MHx8fHx8"
            judul="Destinasi 1"
            deskripsi="Deskripsi Singkat"
            penulis="Penulis 1"
          />
          <DestinasiCard
            src="https://images.unsplash.com/photo-1739609579483-00b49437cc45?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyfHx8ZW58MHx8fHx8"
            judul="Destinasi 1"
            deskripsi="Deskripsi Singkat"
            penulis="Penulis 1"
          />
          <DestinasiCard
            src="https://images.unsplash.com/photo-1739609579483-00b49437cc45?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyfHx8ZW58MHx8fHx8"
            judul="Destinasi 1"
            deskripsi="Deskripsi Singkat"
            penulis="Penulis 1"
          />
          <DestinasiCard
            src="https://images.unsplash.com/photo-1739609579483-00b49437cc45?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyfHx8ZW58MHx8fHx8"
            judul="Destinasi 1"
            deskripsi="Deskripsi Singkat"
            penulis="Penulis 1"
          />
          <DestinasiCard
            src="https://images.unsplash.com/photo-1739609579483-00b49437cc45?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyfHx8ZW58MHx8fHx8"
            judul="Destinasi 1"
            deskripsi="Deskripsi Singkat"
            penulis="Penulis 1"
          />
          <DestinasiCard
            src="https://images.unsplash.com/photo-1739609579483-00b49437cc45?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyfHx8ZW58MHx8fHx8"
            judul="Destinasi 1"
            deskripsi="Deskripsi Singkat"
            penulis="Penulis 1"
          />
          <DestinasiCard
            src="https://images.unsplash.com/photo-1739609579483-00b49437cc45?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyfHx8ZW58MHx8fHx8"
            judul="Destinasi 1"
            deskripsi="Deskripsi Singkat"
            penulis="Penulis 1"
          />
          <DestinasiCard
            src="https://images.unsplash.com/photo-1739609579483-00b49437cc45?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyfHx8ZW58MHx8fHx8"
            judul="Destinasi 2"
            deskripsi="Deskripsi Singkat"
            penulis="Penulis 2"
          />
          <DestinasiCard
            src="https://images.unsplash.com/photo-1739609579483-00b49437cc45?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyfHx8ZW58MHx8fHx8"
            judul="Destinasi 3"
            deskripsi="Deskripsi Singkat"
            penulis="Penulis 3"
          />
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
