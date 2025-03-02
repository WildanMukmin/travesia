import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

const KebijakanPrivasiPage = () => {
  const privacyData = [
    {
      id: "section-1",
      title: "1. Informasi yang Kami Kumpulkan",
      content: `Kami mengumpulkan berbagai jenis informasi untuk memberikan pengalaman terbaik bagi pengguna:

Informasi yang Anda Berikan Secara Langsung
- Akun & Profil: Saat mendaftar, kami mengumpulkan nama, email, nomor telepon, dan foto profil (opsional).
- Postingan & Konten: Saat Anda membuat postingan di forum atau blog, kami menyimpan teks, gambar, dan media lain yang Anda unggah.
- Reservasi: Jika Anda melakukan pemesanan, kami mengumpulkan detail transaksi, dan informasi terkait reservasi.

Informasi yang Kami Kumpulkan Secara Otomatis
- Data Penggunaan: Kami merekam aktivitas Anda di platform, seperti destinasi yang dikunjungi, postingan yang dibaca
- Lokasi: Jika Anda memberikan izin, kami dapat mengakses lokasi Anda untuk menampilkan rekomendasi destinasi disekitar Anda.
- Cookie & Teknologi Pelacakan: Kami menggunakan cookie untuk menyimpan preferensi dan meningkatkan performa layanan.`,
    },
    {
      id: "section-2",
      title: "2. Cara Kami Menggunakan Informasi Anda",
      content: `Kami menggunakan data yang dikumpulkan untuk:
- Menyediakan Layanan – Memungkinkan Anda membuat akun, memposting di forum, melakukan reservasi, dan menggunakan fitur lainnya.
- Personalisasi Konten – Menampilkan rekomendasi destinasi, blog, dan forum sesuai minat Anda.
- Keamanan & Penipuan – Mencegah aktivitas mencurigakan dan melindungi akun pengguna.
- Peningkatan Layanan – Menganalisis data untuk mengembangkan fitur baru dan meningkatkan pengalaman pengguna.
- Komunikasi – Mengirimkan email, notifikasi, atau pesan terkait akun, reservasi, atau pembaruan layanan.`,
    },
    {
      id: "section-3",
      title: "3. Cara Kami Membagikan Informasi Anda",
      content: `Kami tidak menjual data Anda kepada pihak ketiga. Namun, informasi Anda dapat dibagikan dalam kondisi berikut:

- Dengan Owner Destinasi – Jika Anda melakukan reservasi, informasi pemesanan Anda akan diberikan kepada pemilik destinasi terkait.
- Dengan Komunitas – Postingan yang Anda buat di forum atau blog dapat dilihat oleh publik.
- Dengan Penyedia Layanan – Kami bekerja sama dengan layanan cloud hosting untuk menjalankan platform dengan aman.
- Keperluan Hukum – Jika diwajibkan oleh hukum, kami dapat memberikan data kepada otoritas berwenang.`,
    },
    {
      id: "section-4",
      title: "4. Keamanan Data Anda",
      content: `Kami menerapkan langkah-langkah keamanan untuk melindungi informasi Anda, termasuk:
- Enkripsi Data – Informasi sensitif dilindungi dengan enkripsi standar industri.
- Akses Terbatas – Hanya tim yang berwenang yang memiliki akses ke data pengguna.
- Pemantauan Keamanan – Sistem kami terus dipantau untuk mencegah penyalahgunaan dan kebocoran data.

Namun, tidak ada sistem yang 100% aman. Jika Anda menemukan aktivitas mencurigakan pada akun Anda, harap segera hubungi kami.`,
    },
    {
      id: "section-5",
      title: "5. Hak & Kontrol Pengguna",
      content: `Anda memiliki kendali atas informasi pribadi Anda, termasuk:

- Mengubah atau Menghapus Data – Anda dapat memperbarui profil atau meminta penghapusan akun kapan saja.
- Menolak Penggunaan Lokasi & Cookie – Anda dapat menonaktifkan fitur ini melalui pengaturan perangkat.
- Menarik Persetujuan – Jika Anda tidak ingin menerima komunikasi dari kami, Anda dapat mengatur preferensi email.`,
    },
    {
      id: "section-6",
      title: "6. Kebijakan untuk Anak di Bawah Umur",
      content: `Travesia tidak diperuntukkan bagi anak di bawah usia 13 tahun. Jika kami mengetahui bahwa seorang anak telah mendaftar tanpa izin orang tua, kami akan menghapus akun tersebut.`,
    },
    {
      id: "section-7",
      title: "7. Perubahan Kebijakan Privasi",
      content: `Kami dapat memperbarui kebijakan ini dari waktu ke waktu untuk menyesuaikan dengan perubahan layanan atau regulasi. Jika ada perubahan besar, kami akan memberi tahu Anda melalui email atau pemberitahuan di aplikasi.`,
    },
  ];

  return (
    <Card className="w-full">
      <CardHeader className="bg-primary/10">
        <CardTitle className="text-2xl font-bold text-primary">
          Kebijakan Privasi Travesia
        </CardTitle>
        <CardDescription>Terakhir diperbarui: 2 Maret 2025</CardDescription>
      </CardHeader>

      <CardContent className="p-6">
        <div className="mb-6">
          <p className="text-muted-foreground">
            Selamat datang di Travesia! Privasi Anda sangat penting bagi kami.
            Travesia kami berkomitmen untuk melindungi dan menghormati privasi
            Anda serta mematuhi undang-undang perlindungan data yang berlaku.
            Kebijakan privasi ini menjelaskan bagaimana kami mengumpulkan,
            menggunakan, dan melindungi data Anda saat menggunakan platform
            kami.
          </p>
        </div>

        <ScrollArea className="h-96 rounded-md border p-4">
          <Accordion type="multiple" className="w-full">
            {privacyData.map((section) => (
              <AccordionItem key={section.id} value={section.id}>
                <AccordionTrigger className="text-left font-medium">
                  {section.title}
                </AccordionTrigger>
                <AccordionContent className="text-sm whitespace-pre-line">
                  {section.content}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </ScrollArea>

        <div className="mt-6 p-4 bg-primary/5 rounded-md border border-primary/10">
          <p className="text-sm text-center font-medium">
            Kami berkomitmen untuk menjaga privasi Anda dan memastikan
            pengalaman yang aman di Travesia!
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default KebijakanPrivasiPage;
