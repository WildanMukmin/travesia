"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const PusatBantuanforumKomunitasBlogPage = () => {
  const [openQuestion, setOpenQuestion] = useState(null);

  const toggleQuestion = (questionId: any) => {
    setOpenQuestion(openQuestion === questionId ? null : questionId);
  };

  return (
    <main className="flex-1 overflow-y-auto p-4">
      <h2 className="text-3xl font-bold">Forum Komunitas & Blog</h2>
      <div className="mb-6">
        <div className="mt-2 space-y-2">
          {/* Question 1-1 */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div
              className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50"
              onClick={() => toggleQuestion("1-1")}
            >
              <h3 className="text-md font-medium">
                Bagaimana cara membuat postingan di forum komunitas?
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
                  <p>Untuk membuat postingan di forum komunitas Travesia:</p>
                  <ol className="ml-5 mt-2 list-decimal space-y-2">
                    <li>Masuk ke akun Travesia Anda.</li>
                    <li>Klik tab "Komunitas" di menu utama.</li>
                    <li>
                      Pilih kategori forum yang sesuai untuk postingan Anda.
                    </li>
                    <li>Klik tombol "Buat Postingan Baru".</li>
                    <li>
                      Berikan judul yang menarik dan informatif untuk postingan
                      Anda.
                    </li>
                    <li>
                      Tulis konten postingan di editor yang disediakan. Anda
                      dapat menambahkan teks, gambar, dan tautan.
                    </li>
                    <li>
                      Tambahkan tag relevan untuk membantu pengguna lain
                      menemukan postingan Anda.
                    </li>
                    <li>
                      Klik "Publikasikan" untuk membagikan postingan Anda ke
                      komunitas.
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
                Siapa saja yang bisa menulis blog di Travesia?
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
                  <p>Blog Travesia terbuka untuk berbagai kontributor:</p>
                  <ul className="ml-5 mt-2 list-disc space-y-2">
                    <li>
                      Anggota terverifikasi Travesia dengan minimal 3 bulan
                      keanggotaan aktif.
                    </li>
                    <li>Pemilik destinasi dan mitra bisnis resmi Travesia.</li>
                    <li>
                      Influencer travel dan kreator konten yang telah disetujui
                      oleh tim editorial.
                    </li>
                    <li>
                      Ahli industri pariwisata dan profesional yang diundang
                      secara khusus.
                    </li>
                  </ul>
                  <p className="mt-3">Untuk menjadi kontributor blog:</p>
                  <ol className="ml-5 mt-2 list-decimal space-y-2">
                    <li>Klik "Menjadi Kontributor" di halaman Blog.</li>
                    <li>
                      Lengkapi formulir aplikasi dengan detail dan sampel
                      tulisan Anda.
                    </li>
                    <li>
                      Tim editorial akan meninjau aplikasi Anda dalam 5-7 hari
                      kerja.
                    </li>
                    <li>
                      Jika disetujui, Anda akan menerima panduan penulisan dan
                      akses ke dashboard kontributor.
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

export default PusatBantuanforumKomunitasBlogPage;
