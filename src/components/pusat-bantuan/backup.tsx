"use client";

import { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  User,
  MessageSquare,
  MapPin,
  ThumbsUp,
  ThumbsDown,
} from "lucide-react";

const PusatBantuanKelolaAkunPage = () => {
  const [openCategory, setOpenCategory] = useState(null);
  const [openQuestion, setOpenQuestion] = useState(null);

  const toggleCategory = (categoryId: any) => {
    setOpenCategory(openCategory === categoryId ? null : categoryId);
    setOpenQuestion(null);
  };

  const toggleQuestion = (questionId: any) => {
    setOpenQuestion(openQuestion === questionId ? null : questionId);
  };

  const categories = [
    {
      id: 1,
      title: "Kelola Akun",
      icon: <User className="h-5 w-5" />,
      questions: [
        {
          id: "1-1",
          question: "Bagaimana cara mendaftar di Travesia?",
          answer: (
            <div>
              <p>Untuk mendaftar di Travesia, ikuti langkah-langkah berikut:</p>
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
                <li>Setelah mengisi semua informasi, klik tombol "Daftar".</li>
                <li>
                  Periksa email Anda untuk verifikasi dan ikuti petunjuk untuk
                  menyelesaikan proses pendaftaran.
                </li>
              </ol>
            </div>
          ),
        },
        {
          id: "1-2",
          question: "Saya lupa kata sandi, bagaimana cara meresetnya?",
          answer: (
            <div>
              <p>Jika Anda lupa kata sandi, ikuti langkah-langkah berikut:</p>
              <ol className="ml-5 mt-2 list-decimal space-y-2">
                <li>Pada halaman masuk, klik tautan "Lupa kata sandi?"</li>
                <li>Masukkan alamat email yang terdaftar dengan akun Anda.</li>
                <li>Klik tombol "Kirim Tautan Reset".</li>
                <li>Periksa email Anda untuk tautan reset kata sandi.</li>
                <li>
                  Klik tautan tersebut dan ikuti petunjuk untuk membuat kata
                  sandi baru.
                </li>
                <li>
                  Setelah berhasil mengatur ulang kata sandi, Anda dapat masuk
                  menggunakan kata sandi baru.
                </li>
              </ol>
            </div>
          ),
        },
      ],
    },
    {
      id: 2,
      title: "Akses Destinasi & Reservasi",
      icon: <MapPin className="h-5 w-5" />,
      questions: [
        {
          id: "2-1",
          question: "Bagaimana cara mencari destinasi?",
          answer: (
            <div>
              <p>Untuk mencari destinasi di Travesia:</p>
              <ol className="ml-5 mt-2 list-decimal space-y-2">
                <li>
                  Pada halaman utama, gunakan kotak pencarian di bagian atas.
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
                  Jelajahi galeri foto, deskripsi, ulasan, dan informasi penting
                  lainnya tentang destinasi tersebut.
                </li>
              </ol>
            </div>
          ),
        },
        {
          id: "2-2",
          question: "Bagaimana cara melakukan reservasi destinasi?",
          answer: (
            <div>
              <p>Untuk melakukan reservasi destinasi:</p>
              <ol className="ml-5 mt-2 list-decimal space-y-2">
                <li>Pilih destinasi yang ingin Anda kunjungi.</li>
                <li>
                  Pada halaman detail destinasi, lihat kalender ketersediaan dan
                  pilih tanggal kunjungan.
                </li>
                <li>
                  Pilih jumlah pengunjung dan paket atau tiket yang tersedia.
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
          ),
        },
      ],
    },
    {
      id: 3,
      title: "Forum Komunitas & Blog",
      icon: <MessageSquare className="h-5 w-5" />,
      questions: [
        {
          id: "3-1",
          question: "Bagaimana cara membuat postingan di forum komunitas?",
          answer: (
            <div>
              <p>Untuk membuat postingan di forum komunitas Travesia:</p>
              <ol className="ml-5 mt-2 list-decimal space-y-2">
                <li>Masuk ke akun Travesia Anda.</li>
                <li>Klik tab "Komunitas" di menu utama.</li>
                <li>Pilih kategori forum yang sesuai untuk postingan Anda.</li>
                <li>Klik tombol "Buat Postingan Baru".</li>
                <li>
                  Berikan judul yang menarik dan informatif untuk postingan
                  Anda.
                </li>
                <li>
                  Tulis konten postingan di editor yang disediakan. Anda dapat
                  menambahkan teks, gambar, dan tautan.
                </li>
                <li>
                  Tambahkan tag relevan untuk membantu pengguna lain menemukan
                  postingan Anda.
                </li>
                <li>
                  Klik "Publikasikan" untuk membagikan postingan Anda ke
                  komunitas.
                </li>
              </ol>
            </div>
          ),
        },
        {
          id: "3-2",
          question: "Siapa saja yang bisa menulis blog di Travesia?",
          answer: (
            <div>
              <p>Blog Travesia terbuka untuk berbagai kontributor:</p>
              <ul className="ml-5 mt-2 list-disc space-y-2">
                <li>
                  Anggota terverifikasi Travesia dengan minimal 3 bulan
                  keanggotaan aktif.
                </li>
                <li>Pemilik destinasi dan mitra bisnis resmi Travesia.</li>
                <li>
                  Influencer travel dan kreator konten yang telah disetujui oleh
                  tim editorial.
                </li>
                <li>
                  Ahli industri pariwisata dan profesional yang diundang secara
                  khusus.
                </li>
              </ul>
              <p className="mt-3">Untuk menjadi kontributor blog:</p>
              <ol className="ml-5 mt-2 list-decimal space-y-2">
                <li>Klik "Menjadi Kontributor" di halaman Blog.</li>
                <li>
                  Lengkapi formulir aplikasi dengan detail dan sampel tulisan
                  Anda.
                </li>
                <li>
                  Tim editorial akan meninjau aplikasi Anda dalam 5-7 hari
                  kerja.
                </li>
                <li>
                  Jika disetujui, Anda akan menerima panduan penulisan dan akses
                  ke dashboard kontributor.
                </li>
              </ol>
            </div>
          ),
        },
      ],
    },
    {
      id: 4,
      title: "Kelola Destinasi",
      icon: <MapPin className="h-5 w-5" />,
      questions: [
        {
          id: "4-1",
          question: "Bagaimana cara mendaftarkan destinasi saya?",
          answer: (
            <div>
              <p>Untuk mendaftarkan destinasi wisata Anda di Travesia:</p>
              <ol className="ml-5 mt-2 list-decimal space-y-2">
                <li>Masuk ke akun Travesia Anda atau buat akun bisnis baru.</li>
                <li>
                  Klik "Daftarkan Destinasi" di menu dropdown profil atau di
                  halaman "Partner dengan Kami".
                </li>
                <li>
                  Lengkapi formulir pendaftaran dengan informasi lengkap tentang
                  destinasi Anda, termasuk:
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
                  Tim Travesia akan melakukan verifikasi dan menghubungi Anda
                  dalam 3-5 hari kerja.
                </li>
                <li>
                  Setelah disetujui, destinasi Anda akan muncul di platform dan
                  Anda akan mendapatkan akses ke dashboard pengelolaan.
                </li>
              </ol>
            </div>
          ),
        },
        {
          id: "4-2",
          question: "Bagaimana cara mengelola reservasi?",
          answer: (
            <div>
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
                      Memperbarui status reservasi (konfirmasi, pending, atau
                      dibatalkan)
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
                  Pastikan untuk memperbarui status reservasi secara tepat waktu
                  untuk menjaga kepuasan pelanggan.
                </li>
              </ol>
            </div>
          ),
        },
      ],
    },
  ];

  return (
    <main className="flex-1 overflow-y-auto p-4">
      <div className="max-w-4xl mx-auto">
        {categories.map((category) => (
          <div key={category.id} className="mb-6">
            <div
              className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm cursor-pointer"
              onClick={() => toggleCategory(category.id)}
            >
              <div className="flex items-center">
                <span className="mr-3 text-blue-600">{category.icon}</span>
                <h2 className="text-lg font-semibold">{category.title}</h2>
              </div>
              {openCategory === category.id ? (
                <ChevronUp className="h-5 w-5 text-gray-500" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-500" />
              )}
            </div>

            {openCategory === category.id && (
              <div className="mt-2 space-y-2">
                {category.questions.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-lg shadow-sm overflow-hidden"
                  >
                    <div
                      className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50"
                      onClick={() => toggleQuestion(item.id)}
                    >
                      <h3 className="text-md font-medium">{item.question}</h3>
                      {openQuestion === item.id ? (
                        <ChevronUp className="h-5 w-5 text-gray-500" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-gray-500" />
                      )}
                    </div>

                    {openQuestion === item.id && (
                      <div className="p-4 border-t border-gray-100 bg-gray-50">
                        <div className="text-gray-700">{item.answer}</div>

                        <div className="mt-4 pt-4 border-t border-gray-200">
                          <p className="text-sm text-gray-600 mb-2">
                            Apakah artikel ini membantu?
                          </p>
                          <div className="flex space-x-2">
                            <button className="flex items-center px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50">
                              <ThumbsUp className="h-4 w-4 mr-1" />
                              Ya
                            </button>
                            <button className="flex items-center px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50">
                              <ThumbsDown className="h-4 w-4 mr-1" />
                              Tidak
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </main>
  );
};

export default PusatBantuanKelolaAkunPage;
