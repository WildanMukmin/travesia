"use client";

import { BlogWithCreator, deleteBlog } from "@/actions/blog";
import CardBlog from "@/components/card/card-blog";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { CurrentUser } from "@/lib/authenticate";
import Link from "next/link";
import { startTransition, useState } from "react";

interface BlogPageProps {
  blogData: BlogWithCreator;
  user: CurrentUser;
}

const BlogPage = ({ blogData, user }: BlogPageProps) => {
  const isLogin = user ? true : false;
  const [data, setData] = useState(blogData);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const onDelete = (id: string) => {
    startTransition(() => {
      deleteBlog(id).then((res) => {
        if (res?.error) {
          setErrorMessage(res?.error);
        }
        if (res?.success) {
          setSuccessMessage(res?.success);
        }
        setData((prevData) => prevData?.filter((item) => item.id !== id) ?? []);
      });
    });
  };

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
      <div className="flex justify-between border-b-2 border-blue-800 pb-2 mb-6">
        <h2 className="text-3xl font-bold">Blog</h2>
        {isLogin && (
          <Link href="/blog/posting-blog">
            <Button>Posting Blog</Button>
          </Link>
        )}
      </div>

      {successMessage && (
        <div className="bg-green-100 rounded-lg py-5 px-6 text-base text-green-700 mb-3">
          {successMessage}
        </div>
      )}
      {errorMessage && (
        <div className="bg-red-100 rounded-lg py-5 px-6 text-base text-red-700 mb-3">
          {errorMessage}
        </div>
      )}

      <div className="space-y-10">
        {data &&
          data.map((item) => (
            <CardBlog
              key={item.id}
              blogId={item.id}
              creatorId={item.user.id}
              userId={user?.id || ""}
              src="https://images.unsplash.com/photo-1724271362937-391a150db603?w=500&auto=format&fit=crop&q=60"
              judul={`${item.title}`}
              slug={`${item.slug}`}
              deskripsi={item.content[0].slice(0, 100)}
              penulis={`${item.user.name} pada ${item.createdAt.toLocaleDateString()}`}
              onDelete={() => onDelete(item.id)}
            />
          ))}
        {data && data.length === 0 && (
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
