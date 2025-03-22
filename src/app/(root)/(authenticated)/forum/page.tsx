import { getForum } from "@/actions/forum";
import ForumPage from "@/components/forum/forum-page";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { currentUser } from "@/lib/authenticate";
import { AlertCircle } from "lucide-react";

export default async function Page() {
  const user = await currentUser();

  const forum = await getForum();

  if (!!user) {
    return <ForumPage forumData={forum} />;
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
