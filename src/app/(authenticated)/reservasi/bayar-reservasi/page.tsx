"use client";

import { useSearchParams } from "next/navigation";

const ReservasiPage = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const harga = searchParams.get("harga");

  if (!id) {
    return <div>Parameter ID tidak ditemukan</div>;
  }
  if (!harga) {
    return <div>Parameter Harga tidak ditemukan</div>;
  }

  return (
    <div>
      <h1>Reservasi ID: {id}</h1>
      <h1>Reservasi Harga: {harga}</h1>
    </div>
  );
};

export default ReservasiPage;
