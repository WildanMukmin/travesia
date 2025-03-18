# Travesia

## Tentang Kami
Travesia adalah platform komunitas petualangan yang dirancang untuk menghubungkan para pecinta alam dan traveler di seluruh Indonesia. Kami menyediakan forum diskusi, informasi destinasi, sistem reservasi aktivitas outdoor, serta blog rekomendasi perlengkapan petualangan, forum sebagai media informasi, dan masih banyak lainnya. Dengan Travesia, petualanganmu jadi lebih terencana, seru, dan aman!

## Visi
Menjadi platform komunitas petualangan terdepan yang menghubungkan para traveler, mendukung eksplorasi wisata alam, dan memperkenalkan destinasi tersembunyi yang menarik.

## Misi
- Membantu para petualang menemukan dan berbagi informasi destinasi terbaik.
- Menyediakan forum interaktif bagi komunitas traveler dan pecinta outdoor.
- Menghadirkan fitur reservasi aktivitas petualangan dengan sistem yang aman.
- Mendorong ekowisata lokal dan petualangan yang bertanggung jawab terhadap lingkungan.

## Anggota Kelompok
Kami bangga dengan tim kami yang antusias terhadap solusi dan selalu mencari lebih banyak orang dengan hasrat & pengalaman serupa di dunia teknologi.

- **Wildan Mukmin** - Founder and Developer
- **Febrina Aulia Azahra** - Sistem Analyst
- **Bungaran Natanael** - Designer
- **Napis Rizqullah** - QA Tester

## Teknologi yang Digunakan
Tools dan teknologi yang kami gunakan untuk membangun Travesia:
- **Next.js** - React framework for production
- **React** - UI component library
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn UI** - Re-usable UI components
- **Node.js** - JavaScript runtime
- **PostgreSQL** - SQL database

## Cara Menjalankan Proyek
### 1. Clone Repository
```sh
 git clone https://github.com/username/travesia.git
 cd travesia
```

### 2. Instalasi Dependensi
```sh
npm install
```

### 3. Konfigurasi Environment Variables
Buat file `.env` di root proyek dan tambahkan konfigurasi berikut:
```env
DATABASE_URL="postgresql://user:password@host:port/database"
NEXTAUTH_SECRET="your-secret"
NEXTAUTH_URL="http://localhost:3000"
```

### 4. Migrasi Database
```sh
npx prisma migrate dev --name init
```

### 5. Menjalankan Server
```sh
npm run dev
```
Aplikasi akan berjalan di `http://localhost:3000`

## Kontribusi
1. Fork repository ini
2. Buat branch baru (`git checkout -b feature-anda`)
3. Commit perubahan (`git commit -m 'Menambahkan fitur X'`)
4. Push ke branch tersebut (`git push origin feature-anda`)
5. Buat Pull Request

## Lisensi
Proyek ini dilisensikan di bawah MIT License.

