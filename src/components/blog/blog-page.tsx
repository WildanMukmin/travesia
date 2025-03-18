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
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { BlogWithCreator } from "@/actions/blog";

interface BlogPageProps {
  blogData: BlogWithCreator;
}

const BlogPage = ({ blogData }: BlogPageProps) => {
  return (
    <main className="mt-10 max-w-full mx-auto px-4">
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
              <BreadcrumbPage>Blog</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <h2 className="text-3xl font-bold border-b-2 border-blue-800 pb-2 mb-6">
        Blog
      </h2>

      <div className="space-y-10">
        {blogData &&
          blogData.map((item) => (
            <CardBlog
              key={item.id}
              blogId={item.id}
              src="https://images.unsplash.com/photo-1724271362937-391a150db603?w=500&auto=format&fit=crop&q=60"
              judul={`${item.title}`}
              slug={`${item.slug}`}
              deskripsi={item.content[0].slice(0, 100)}
              penulis={`${item.user.name} pada ${item.createdAt.toLocaleDateString()}`}
            />
          ))}
        {blogData && blogData.length === 0 && (
          <p className="text-center">Belum ada Postingan</p>
        )}
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
