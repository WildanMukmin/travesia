import { currentUser } from "@/lib/authenticate";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import ForumPage from "@/components/forum/forum-page";

export default async function Page() {
  const user = await currentUser();

  if (!!user) {
    return <ForumPage />;
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
