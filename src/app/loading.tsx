import { Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function LoadingPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-900 dark:to-slate-800">
      <Card className="w-full max-w-md p-4 shadow-lg border-slate-200 dark:border-slate-700">
        <CardContent className="flex flex-col items-center justify-center space-y-8 pt-6">
          <div className="flex flex-col items-center gap-2">
            <Loader2 className="h-16 w-16 text-primary animate-spin" />
            <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200">
              Sedang Memuat
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-center">
              Harap tunggu sebentar, kami sedang menyiapkan hal menarik untuk
              Anda
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
