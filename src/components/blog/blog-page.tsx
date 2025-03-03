import CardBlog from "@/components/card/card-blog";
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
    <main className="mt-10 max-w-full mx-auto px-4">
      <h2 className="text-3xl font-bold border-b-2 border-blue-800 pb-2 mb-6">
        Blog
      </h2>

      <div className="space-y-10">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((index) => (
          <CardBlog
            key={index}
            src="https://images.unsplash.com/photo-1724271362937-391a150db603?w=500&auto=format&fit=crop&q=60"
            judul={`Blog ${index}`}
            slug={`blog-${index}`}
            deskripsi="Deskripsi Singkat Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt animi cumque aut voluptatum."
            penulis="wildan mukmin pada tanggal 26 januari 2025"
          />
        ))}
      </div>

      <div className="flex justify-center mt-12">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            {[1, 2, 3].map((page) => (
              <PaginationItem key={page}>
                <PaginationLink href="#" isActive={page === 2}>
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))}
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
