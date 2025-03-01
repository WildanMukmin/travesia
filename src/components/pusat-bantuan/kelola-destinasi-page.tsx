"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const PusatBantuanKelolaDestinasiPage = () => {
  const [openQuestion, setOpenQuestion] = useState(null);

  const toggleQuestion = (questionId: any) => {
    setOpenQuestion(openQuestion === questionId ? null : questionId);
  };

  return (
    <main className="flex-1 overflow-y-auto p-4">
      <h2 className="text-3xl font-bold">Kelola Destinasi</h2>
      <div className="mb-6">
        <div className="mt-2 space-y-2">
          {/* Question 1-1 */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div
              className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50"
              onClick={() => toggleQuestion("1-1")}
            >
              <h3 className="text-md font-medium">
                Bagaimana cara mendaftarkan destinasi saya?
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
                  <p>Untuk mendaftarkan destinasi wisata Anda di Travesia:</p>
                  <ol className="ml-5 mt-2 list-decimal space-y-2">
                    <li>
                      Masuk ke akun Travesia Anda atau buat akun bisnis baru.
                    </li>
                    <li>
                      Klik "Daftarkan Destinasi" di menu dropdown profil atau di
                      halaman "Partner dengan Kami".
                    </li>
                    <li>
                      Lengkapi formulir pendaftaran dengan informasi lengkap
                      tentang destinasi Anda, termasuk:
                      <ul className="ml-5 mt-1 list-disc">
                        <li>Nama dan lokasi destinasi</li>
                        <li>Deskripsi lengkap</li>
                        <li>Kategori dan jenis aktivitas</li>
                        <li>Foto-foto berkualitas tinggi (minimal 5 foto)</li>
                        <li>Fasilitas yang tersedia</li>
                        <li>Harga dan paket yang ditawarkan</li>
                        <li>Dokumen legalitas usaha</li>
                      </ul>
                    </li>
                    <li>Kirimkan formulir untuk ditinjau oleh tim Travesia.</li>
                    <li>
                      Tim Travesia akan melakukan verifikasi dan menghubungi
                      Anda dalam 3-5 hari kerja.
                    </li>
                    <li>
                      Setelah disetujui, destinasi Anda akan muncul di platform
                      dan Anda akan mendapatkan akses ke dashboard pengelolaan.
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
                Bagaimana cara mengelola reservasi?
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
                  <p>Untuk mengelola reservasi sebagai pemilik destinasi:</p>
                  <ol className="ml-5 mt-2 list-decimal space-y-2">
                    <li>Masuk ke akun bisnis Travesia Anda.</li>
                    <li>Klik tab "Dashboard" di menu utama.</li>
                    <li>Pilih "Kelola Reservasi" dari menu samping.</li>
                    <li>
                      Di sini Anda dapat:
                      <ul className="ml-5 mt-1 list-disc">
                        <li>
                          Melihat semua reservasi yang masuk, termasuk detail
                          pengunjung dan jadwal
                        </li>
                        <li>
                          Memperbarui status reservasi (konfirmasi, pending,
                          atau dibatalkan)
                        </li>
                        <li>Mengirim pesan kepada pengunjung</li>
                        <li>Melihat laporan dan statistik reservasi</li>
                        <li>Mengatur ketersediaan dan kalender booking</li>
                        <li>Menangani permintaan khusus atau pembatalan</li>
                      </ul>
                    </li>
                    <li>
                      Anda akan menerima notifikasi email untuk setiap reservasi
                      baru.
                    </li>
                    <li>
                      Pastikan untuk memperbarui status reservasi secara tepat
                      waktu untuk menjaga kepuasan pelanggan.
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

export default PusatBantuanKelolaDestinasiPage;
