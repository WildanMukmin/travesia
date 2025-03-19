import BlogDetailPage from "@/components/blog/blog-detail-page";
import { Suspense } from "react";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BlogDetailPage slug={slug} />;
    </Suspense>
  );
}
