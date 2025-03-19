import { getOneBlog } from "@/actions/blog";
import { getDestinasiById } from "@/actions/destinasi";
import BlogEditPage from "@/components/blog/blog-edit-page";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { currentUser } from "@/lib/authenticate";
import { AlertCircle } from "lucide-react";
import { redirect } from "next/navigation";
interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  if (!id) {
    redirect("/blog");
  }
  const user = await currentUser();
  const blog = await getOneBlog(id);

  if (user?.id === blog?.user?.id) {
    return <BlogEditPage userId={user?.id || ""} blogId={id} blogData={blog} />;
  }

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          Anda tidak memiliki akses ke halaman ini, Silahkan login Terlebih
          Dahulu!
        </AlertDescription>
      </Alert>
    </div>
  );
}
