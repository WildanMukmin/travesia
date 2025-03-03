"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const PusatBantuanAksesDestinasiReservasiPage = () => {
  const [openQuestion, setOpenQuestion] = useState(null);

  const toggleQuestion = (questionId: any) => {
    setOpenQuestion(openQuestion === questionId ? null : questionId);
  };

  return (
    <main className="flex-1 overflow-y-auto p-4">
      <h2 className="text-3xl font-bold">Akses Destinasi & Reservasi</h2>
      <div className="mb-6">
        <div className="mt-2 space-y-2">
          {/* Question 1-1 */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div
              className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50"
              onClick={() => toggleQuestion("1-1")}
            >
              <h3 className="text-md font-medium">
                Bagaimana cara mencari destinasi?
              </h3>
              {openQuestion === "1-1" ? (
                <ChevronUp className="h-5 w-5 text-gray-500" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-500" />
              )}
            </div>

            {openQuestion === "1-1" && (
              <div className="p-4 border-t border-gray-100 bg-gray-50">
                <div className="text-gray-700">
                  <p>Untuk mencari destinasi di Travesia:</p>
                  <ol className="ml-5 mt-2 list-decimal space-y-2">
                    <li>
                      Pada halaman utama, gunakan kotak pencarian di bagian
                      atas.
                    </li>
                    <li>
                      Masukkan nama lokasi, kota, atau jenis wisata yang Anda
                      minati.
                    </li>
                    <li>
                      Anda juga dapat menggunakan filter untuk mempersempit
                      pencarian berdasarkan kategori, harga, atau fasilitas.
                    </li>
                    <li>
                      Klik pada hasil pencarian untuk melihat detail destinasi.
                    </li>
                    <li>
                      Jelajahi galeri foto, deskripsi, ulasan, dan informasi
                      penting lainnya tentang destinasi tersebut.
                    </li>
                  </ol>
                </div>
              </div>
            )}
          </div>

          {/* Question 1-2 */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div
              className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50"
              onClick={() => toggleQuestion("1-2")}
            >
              <h3 className="text-md font-medium">
                Bagaimana cara melakukan reservasi destinasi?
              </h3>
              {openQuestion === "1-2" ? (
                <ChevronUp className="h-5 w-5 text-gray-500" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-500" />
              )}
            </div>

            {openQuestion === "1-2" && (
              <div className="p-4 border-t border-gray-100 bg-gray-50">
                <div className="text-gray-700">
                  <p>Untuk melakukan reservasi destinasi:</p>
                  <ol className="ml-5 mt-2 list-decimal space-y-2">
                    <li>Pilih destinasi yang ingin Anda kunjungi.</li>
                    <li>
                      Pada halaman detail destinasi, lihat kalender ketersediaan
                      dan pilih tanggal kunjungan.
                    </li>
                    <li>
                      Pilih jumlah pengunjung dan paket atau tiket yang
                      tersedia.
                    </li>
                    <li>Klik tombol "Reservasi Sekarang".</li>
                    <li>
                      Lengkapi informasi yang diminta, termasuk data pribadi dan
                      preferensi.
                    </li>
                    <li>Pilih metode pembayaran dan selesaikan transaksi.</li>
                    <li>
                      Setelah pembayaran berhasil, Anda akan menerima email
                      konfirmasi reservasi.
                    </li>
                  </ol>
                </div>
              </div>
            )}
          </div>

          {/* Question 1-3 */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div
              className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50"
              onClick={() => toggleQuestion("1-3")}
            >
              <h3 className="text-md font-medium">
                Bagaimana cara membatalkan reservasi destinasi?
              </h3>
              {openQuestion === "1-2" ? (
                <ChevronUp className="h-5 w-5 text-gray-500" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-500" />
              )}
            </div>

            {openQuestion === "1-2" && (
              <div className="p-4 border-t border-gray-100 bg-gray-50">
                <div className="text-gray-700">
                  <p>Untuk membatalkan reservasi destinasi:</p>
                  <ol className="ml-5 mt-2 list-decimal space-y-2">
                    <li>Pilih destinasi yang ingin Anda kunjungi.</li>
                    <li>
                      Pada halaman detail destinasi, lihat kalender ketersediaan
                      dan pilih tanggal kunjungan.
                    </li>
                    <li>
                      Pilih jumlah pengunjung dan paket atau tiket yang
                      tersedia.
                    </li>
                    <li>Klik tombol "Reservasi Sekarang".</li>
                    <li>
                      Lengkapi informasi yang diminta, termasuk data pribadi dan
                      preferensi.
                    </li>
                    <li>Pilih metode pembayaran dan selesaikan transaksi.</li>
                    <li>
                      Setelah pembayaran berhasil, Anda akan menerima email
                      konfirmasi reservasi.
                    </li>
                  </ol>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default PusatBantuanAksesDestinasiReservasiPage;
