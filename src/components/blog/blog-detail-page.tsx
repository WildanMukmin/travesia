"use client";

import { deleteBlog, getOneBlog, OneBlogWithCreator } from "@/actions/blog";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import ToolDropdown from "@/components/utils/tool-dropdown";
import { ArrowLeft, CalendarDays, Clock, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { redirect, useSearchParams } from "next/navigation";
import { startTransition, useEffect, useState } from "react";

interface BlogDetailPageProps {
  slug: string;
  userId: string;
}

const BlogDetailPage = ({ slug, userId }: BlogDetailPageProps) => {
  const blogId = useSearchParams().get("id");
  if (!blogId) {
    return null;
  }
  const [errorMessage, setErrorMessage] = useState("");
  const [blogData, setBlogData] = useState<OneBlogWithCreator | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      setIsLoading(true);
      try {
        const blog = await getOneBlog(blogId);
        setBlogData(blog);
      } catch (error) {
        console.error("Error fetching blog:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchBlog();
  }, [blogId]);

  const onDelete = (id: string) => {
    startTransition(() => {
      deleteBlog(id).then((res) => {
        if (res?.error) {
          setErrorMessage(res?.error);
        }
        if (res?.success) {
          redirect("/blog");
        }
      });
    });
  };

  const formattedTitle = slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  // Skeletal loading UI
  if (isLoading || !blogData || !userId) {
    return (
      <div className="max-w-full mx-auto px-4 py-8">
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

        <div className="animate-pulse">
          <div className="mb-8 relative h-96 w-full rounded-lg overflow-hidden bg-gray-300"></div>

          <div className="bg-white shadow-lg rounded-lg p-6">
            <div className="h-8 bg-gray-300 rounded w-3/4 mb-4"></div>
            <div className="flex gap-4 mb-6">
              <div className="h-4 bg-gray-300 rounded w-32"></div>
              <div className="h-4 bg-gray-300 rounded w-40"></div>
            </div>

            <div className="space-y-4 mt-8">
              <div className="h-4 bg-gray-300 rounded w-full"></div>
              <div className="h-4 bg-gray-300 rounded w-full"></div>
              <div className="h-4 bg-gray-300 rounded w-5/6"></div>
              <div className="h-4 bg-gray-300 rounded w-full"></div>
              <div className="h-4 bg-gray-300 rounded w-4/5"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Format date for display
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(new Date(date));
  };

  const readingTime = Math.max(
    1,
    Math.ceil(blogData.content.join(" ").split(" ").length / 200),
  );

  return (
    <div className="max-w-full mx-auto px-4 py-8">
      {/* Breadcrumbs with improved spacing and styling */}
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

      {/* Main Content */}
      <article className="bg-white rounded-xl shadow-md overflow-hidden">
        {/* Hero Image with improved styling */}
        <div className="relative h-96 w-full overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1740514531864-ea9cec02fbac?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyOHx8fGVufDB8fHx8fA%3D%3D"
            alt={blogData.title}
            fill
            className="object-cover transition-transform hover:scale-105 duration-700"
            priority
          />
        </div>

        {/* Content Container */}
        <div className="p-8">
          {/* Title and metadata section */}
          <div className="relative mb-8">
            {/* Title with improved typography */}
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
              {blogData.title}
            </h1>

            {/* Enhanced metadata display with icons */}
            <div className="flex flex-wrap items-center gap-6 text-gray-600 text-sm border-b border-gray-100 pb-6">
              <div className="flex items-center">
                <CalendarDays size={16} className="mr-2" />
                <time dateTime={blogData.createdAt.toISOString()}>
                  {formatDate(blogData.createdAt)}
                </time>
              </div>

              <div className="flex items-center">
                <User size={16} className="mr-2" />
                <span>
                  By{" "}
                  <Link
                    href="/author/wildan-mukmin"
                    className="text-blue-600 hover:text-blue-800 font-medium hover:underline transition-colors"
                  >
                    {blogData.user.name}
                  </Link>
                </span>
              </div>

              <div className="flex items-center">
                <Clock size={16} className="mr-2" />
                <span>{readingTime} min read</span>
              </div>
            </div>

            {/* Dropdown positioned better */}
            {userId === blogData.user.id && (
              <div className="absolute top-0 -right-8">
                <ToolDropdown
                  blogId={blogId}
                  onDelete={() => onDelete(blogId)}
                />
              </div>
            )}
          </div>

          {/* Blog Content with improved typography and spacing */}
          <div className="prose prose-lg max-w-none">
            {blogData.content.map((paragraph, index) => (
              <p key={index} className="mb-6 text-gray-700 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </article>

      {/* Back to blog link with improved styling */}
      <div className="mt-12">
        <Link
          href="/blog"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors font-medium"
        >
          <ArrowLeft size={18} className="mr-2" />
          Back to all posts
        </Link>
      </div>

      {/* Error message display */}
      {errorMessage && (
        <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-md">
          {errorMessage}
        </div>
      )}
    </div>
  );
};

export default BlogDetailPage;
