"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getOneBlog, OneBlogWithCreator } from "@/actions/blog";

interface BlogDetailPageProps {
  slug: string;
}

const BlogDetailPage = ({ slug }: BlogDetailPageProps) => {
  const blogId = useSearchParams().get("id");
  if (!blogId) {
    return null;
  }

  const [blogData, setBlogData] = useState<OneBlogWithCreator | null>(null);
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const blog = await getOneBlog(blogId);
        setBlogData(blog);
      } catch (error) {
        console.error("Error fetching blog:", error);
      }
    };
    fetchBlog();
  }, [blogId]);

  if (!blogData) {
    return null;
  }
  return (
    <article className="max-w-full mx-auto px-4 py-8">
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
                <Link href="/blog">Blog</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>
                {slug
                  .split("-")
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(" ")}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="mb-8 relative h-96 w-full rounded-lg overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1740514531864-ea9cec02fbac?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyOHx8fGVufDB8fHx8fA%3D%3D"
          alt={blogData.title}
          fill
          className="object-cover"
          priority
        />
      </div>

      <h1 className="text-3xl font-bold mb-4">{blogData.title}</h1>

      <div className="flex items-center mb-6 text-gray-600">
        <span className="mr-4">
          <time dateTime={blogData.createdAt.toLocaleDateString()}>
            {blogData.createdAt.toLocaleDateString()}
          </time>
        </span>
        <span>
          By{" "}
          <Link
            href="/author/wildan-mukmin"
            className="text-blue-600 hover:underline"
          >
            {blogData.user.name}
          </Link>
        </span>
      </div>

      {blogData.content.map((paragraph, index) => (
        <div className="prose max-w-none mb-2 text-lg font-thin" key={index}>
          <p>{paragraph}</p>
        </div>
      ))}

      <div className="mt-12 pt-6 border-t">
        <Link href="/blog" className="text-blue-600 hover:underline">
          ← Back to all posts
        </Link>
      </div>
    </article>
  );
};

export default BlogDetailPage;
