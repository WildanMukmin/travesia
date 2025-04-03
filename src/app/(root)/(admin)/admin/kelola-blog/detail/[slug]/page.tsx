import RoleGate from "@/components/auth/role-gate";
import BlogDetailPage from "@/components/blog/blog-detail-page";
import { currentUser } from "@/lib/authenticate";
import { Role } from "@prisma/client";
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
      <RoleGate accessRole={Role.ADMIN}>
        <div className="max-w-screen-xl mx-auto px-4">
          <BlogDetailPage slug={slug} user={user} />
        </div>
      </RoleGate>
    </Suspense>
  );
}
