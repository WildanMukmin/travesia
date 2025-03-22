"use client";

import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

const PusatBantuanKelolaAkunPage = () => {
  const [openQuestion, setOpenQuestion] = useState(null);

  const toggleQuestion = (questionId: any) => {
    setOpenQuestion(openQuestion === questionId ? null : questionId);
  };

  return (
    <main className="flex-1 overflow-y-auto p-4">
      <h2 className="text-3xl font-bold">Kelola Akun</h2>
      {/* Category 1: Kelola Akun */}
      <div className="mb-6">
        <div className="mt-2 space-y-2">
          {/* Question 1-1 */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div
              className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50"
              onClick={() => toggleQuestion("1-1")}
            >
              <h3 className="text-md font-medium">
                Bagaimana cara mendaftar di Travesia?
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
                  <p>
                    Untuk mendaftar di Travesia, ikuti langkah-langkah berikut:
                  </p>
                  <ol className="ml-5 mt-2 list-decimal space-y-2">
                    <li>Kunjungi halaman utama Travesia.</li>
                    <li>Klik tombol "Daftar" di pojok kanan atas layar.</li>
                    <li>
                      Isi formulir pendaftaran dengan informasi yang diperlukan
                      (nama, email, dan kata sandi).
                    </li>
                    <li>
                      Anda juga dapat mendaftar menggunakan akun Google atau
                      Facebook Anda.
                    </li>
                    <li>
                      Setelah mengisi semua informasi, klik tombol "Daftar".
                    </li>
                    <li>
                      Periksa email Anda untuk verifikasi dan ikuti petunjuk
                      untuk menyelesaikan proses pendaftaran.
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
                Saya lupa kata sandi, bagaimana cara meresetnya?
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
                  <p>
                    Jika Anda lupa kata sandi, ikuti langkah-langkah berikut:
                  </p>
                  <ol className="ml-5 mt-2 list-decimal space-y-2">
                    <li>Pada halaman masuk, klik tautan "Lupa kata sandi?"</li>
                    <li>
                      Masukkan alamat email yang terdaftar dengan akun Anda.
                    </li>
                    <li>Klik tombol "Kirim Tautan Reset".</li>
                    <li>Periksa email Anda untuk tautan reset kata sandi.</li>
                    <li>
                      Klik tautan tersebut dan ikuti petunjuk untuk membuat kata
                      sandi baru.
                    </li>
                    <li>
                      Setelah berhasil mengatur ulang kata sandi, Anda dapat
                      masuk menggunakan kata sandi baru.
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

export default PusatBantuanKelolaAkunPage;
