import { getForumById } from "@/actions/forum";
import ForumEditPage from "@/components/forum/forum-edit-page";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { currentUser } from "@/lib/authenticate";
import { AlertCircle } from "lucide-react";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  if (!id) {
    return null;
  }
  const user = await currentUser();
  const forum = await getForumById(id);

  if (!!user) {
    return <ForumEditPage forumData={forum} userId={user.id || ""} />;
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
