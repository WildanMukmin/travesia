import CardDestinasi from "@/components/card/card-blog";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const BlogPage = () => {
  return (
    <main className="mt-10 flex flex-col">
      <h2 className="text-3xl font-bold border-b-2 border-blue-800 pb-2 mb-4">
        Blog
      </h2>

      <div className="space-y-6">
        <CardDestinasi
          src="https://images.unsplash.com/photo-1724271362937-391a150db603?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMXx8fGVufDB8fHx8fA%3D%3D"
          judul="Judul"
          deskripsi="Deskripsi Singkat Lorem ipsum dolor sit amet consectetur adipisicing
              elit. Sunt animi cumque aut voluptatum, maiores odit nostrum neque
              fuga itaque ipsam inventore perspiciatis nobis labore expedita.
              Facere, tempora! Aliquam, odio officia?"
          penulis="wildan mukmin pada tanggal 26 januari 2025"
        />
        <CardDestinasi
          src="https://images.unsplash.com/photo-1724271362937-391a150db603?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMXx8fGVufDB8fHx8fA%3D%3D"
          judul="Judul"
          deskripsi="Deskripsi Singkat Lorem ipsum dolor sit amet consectetur adipisicing
              elit. Sunt animi cumque aut voluptatum, maiores odit nostrum neque
              fuga itaque ipsam inventore perspiciatis nobis labore expedita.
              Facere, tempora! Aliquam, odio officia?"
          penulis="wildan mukmin pada tanggal 26 januari 2025"
        />
        <CardDestinasi
          src="https://images.unsplash.com/photo-1724271362937-391a150db603?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMXx8fGVufDB8fHx8fA%3D%3D"
          judul="Judul"
          deskripsi="Deskripsi Singkat Lorem ipsum dolor sit amet consectetur adipisicing
              elit. Sunt animi cumque aut voluptatum, maiores odit nostrum neque
              fuga itaque ipsam inventore perspiciatis nobis labore expedita.
              Facere, tempora! Aliquam, odio officia?"
          penulis="wildan mukmin pada tanggal 26 januari 2025"
        />
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

export default BlogPage;
