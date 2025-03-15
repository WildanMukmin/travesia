import ReservasiMemberSimulasiBayarPage from "@/components/public/simulasi-pembayaran-page";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ReservasiMemberSimulasiBayarPage />;
    </Suspense>
  );
}
