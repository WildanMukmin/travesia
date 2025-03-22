import BlogDetailPage from "@/components/blog/blog-detail-page";
import { currentUser } from "@/lib/authenticate";
import { Suspense } from "react";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const user = await currentUser();
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BlogDetailPage slug={slug} userId={user?.id || ""} />
    </Suspense>
  );
}
