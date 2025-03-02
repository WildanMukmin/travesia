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

export default function TermsAndConditions() {
  const termsData = [
    {
      id: "section-1",
      title: "1. Persetujuan Anda",
      content:
        "Dengan mengakses dan menggunakan Travesia, Anda menyatakan bahwa Anda telah membaca, memahami, dan menyetujui Syarat & Ketentuan ini.",
    },
    {
      id: "section-2",
      title: "2. Perubahan Ketentuan Penggunaan",
      content:
        "Kami berhak memperbarui Syarat & Ketentuan ini sewaktu-waktu. Perubahan akan diberitahukan melalui email atau notifikasi di platform. Anda disarankan untuk memeriksa halaman ini secara berkala.",
    },
    {
      id: "section-3",
      title: "3. Akses dan Penggunaan Layanan",
      content: `Travesia menyediakan layanan berbasis komunitas, termasuk:
      
      a. Forum dan blog untuk berbagi pengalaman petualangan.
      b. Sistem pencarian untuk menemukan destinasi dan aktivitas petualangan.
      c. Sistem reservasi untuk destinasi petualangan.
      
      Anda dilarang menggunakan layanan untuk aktivitas ilegal, penyebaran spam, atau pelanggaran hak orang lain.`,
    },
    {
      id: "section-4",
      title: "4. Platform dan Konten Travesia",
      content: `- Kami berhak mengubah, memperbarui, atau menghentikan layanan kapan saja tanpa pemberitahuan sebelumnya.
      - Semua konten di Travesia (artikel, ulasan, gambar, dan data lainnya) hanya boleh digunakan sesuai dengan aturan platform.`,
    },
    {
      id: "section-5",
      title: "5. Hak Kekayaan Intelektual",
      content: `- Semua hak cipta, merek dagang, logo, dan konten dalam platform ini adalah milik Travesia atau pihak ketiga yang memiliki lisensi sah.
      - Pengguna tidak diperkenankan menyalin, menjual, atau mendistribusikan konten Travesia tanpa izin.`,
    },
    {
      id: "section-6",
      title: "6. Kiriman Pengguna",
      content: `- Anda dapat mengunggah konten ke forum dan blog.
      - Dengan mengunggah konten, Anda memberi Travesia hak non-eksklusif untuk menampilkan, memodifikasi, dan mendistribusikan konten tersebut.
      - Kami berhak menghapus konten yang melanggar aturan komunitas.`,
    },
    {
      id: "section-7",
      title: "7. Pernyataan, Jaminan, dan Janji Pengguna",
      content: `Dengan menggunakan Travesia, Anda menyatakan dan menjamin bahwa:
      
      - Semua informasi yang Anda berikan adalah benar dan akurat.
      - Anda tidak akan melakukan aktivitas ilegal atau merugikan pengguna lain.
      - Anda tidak akan menggunakan Travesia untuk menyebarkan virus atau kode berbahaya lainnya.`,
    },
    {
      id: "section-8",
      title: "8. Pendaftaran dan Keamanan",
      content: `Pendaftaran Akun
      - Anda harus berusia minimal 18 tahun atau memiliki izin dari orang tua/wali untuk mendaftar.
      - Informasi pendaftaran harus benar dan terbaru.
      
      Keamanan Akun
      - Anda bertanggung jawab atas keamanan akun Anda.
      - Laporkan aktivitas mencurigakan ke support@Travesia.com.
      
      Hak Penangguhan Akun
      Kami berhak menangguhkan atau menghapus akun jika ditemukan pelanggaran terhadap syarat & ketentuan ini.`,
    },
    {
      id: "section-9",
      title: "9. Konfirmasi Pemesanan",
      content: `- Setelah melakukan reservasi, Anda akan menerima email konfirmasi dari sistem kami.
      - Pastikan data yang Anda berikan benar sebelum menyelesaikan pembayaran.
      - Jika ada kendala dalam pemesanan, hubungi layanan pelanggan kami.`,
    },
    {
      id: "section-10",
      title: "10. Hak & Kewajiban Pengguna",
      content: `Member
      - Berhak membuat postingan di forum dan blog.
      - Bertanggung jawab atas isi konten yang dipublikasikan.
      - Wajib menghormati sesama anggota komunitas.
      
      Owner Destinasi
      - Berhak mengelola destinasi dan mengatur reservasi.
      - Wajib memberikan informasi akurat mengenai lokasi, harga, dan fasilitas.
      
      Admin Travesia
      - Berhak mengelola akun, moderasi forum/blog, serta menangguhkan pengguna yang melanggar aturan.
      - Tidak bertanggung jawab atas perselisihan antara member dan owner destinasi.`,
    },
    {
      id: "section-11",
      title: "11. Pelanggaran & Sanksi",
      content: `Pelanggaran yang dapat menyebabkan penangguhan atau penghapusan akun:
      
      - Konten Terlarang: Menyebarkan hoaks, SARA, ujaran kebencian, atau pornografi.
      - Penyalahgunaan Data: Menggunakan informasi pengguna lain tanpa izin.
      - Kecurangan & Penipuan: Melakukan transaksi fiktif atau penyalahgunaan fitur reservasi.
      - Spam & Peretasan: Mengirim spam atau mencoba meretas sistem.
      
      Kami berhak mengambil tindakan hukum jika pelanggaran berdampak serius pada platform atau komunitas.`,
    },
    {
      id: "section-12",
      title: "12. Pembaruan Syarat & Ketentuan",
      content:
        "Kami dapat memperbarui ketentuan ini sewaktu-waktu. Pengguna akan diberitahu tentang perubahan besar melalui email atau notifikasi di platform.",
    },
  ];

  return (
    <Card className="w-full">
      <CardHeader className="bg-primary/10">
        <CardTitle className="text-2xl font-bold text-primary">
          Syarat & Ketentuan Travesia
        </CardTitle>
        <CardDescription>Terakhir diperbarui: 2 Maret 2025</CardDescription>
      </CardHeader>

      <CardContent className="p-6">
        <div className="mb-6">
          <p className="text-muted-foreground">
            Selamat datang di Travesia! Dengan menggunakan platform ini, Anda
            setuju untuk mematuhi Syarat & Ketentuan berikut. Harap baca dengan
            cermat sebelum menggunakan layanan kami.
          </p>
        </div>

        <ScrollArea className="h-96 rounded-md border p-4">
          <Accordion type="multiple" className="w-full">
            {termsData.map((section) => (
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
      </CardContent>
    </Card>
  );
}
