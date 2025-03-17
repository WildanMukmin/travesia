# Travesia

## Deskripsi Proyek
Travesia adalah sebuah platform yang menghubungkan relawan dengan korban bencana. Sistem ini dirancang untuk memudahkan koordinasi bantuan, pencatatan relawan, serta distribusi kebutuhan bagi korban.

## Fitur Utama
- **Registrasi dan Autentikasi**: Pengguna dapat mendaftar sebagai relawan atau korban dan masuk ke sistem dengan akun yang telah dibuat.
- **Pemetaan Lokasi**: Menampilkan lokasi bencana dan daerah yang membutuhkan bantuan.
- **Manajemen Relawan**: Relawan dapat mendaftar ke lokasi tertentu dan menawarkan bantuan sesuai dengan keahliannya.
- **Manajemen Bantuan**: Pencatatan dan pelacakan bantuan yang masuk serta distribusinya kepada korban.
- **Laporan & Notifikasi**: Korban dapat melaporkan kebutuhan mendesak dan menerima update terkait bantuan.

## Teknologi yang Digunakan
- **Frontend**: Next.js, TypeScript, Redux Toolkit
- **Backend**: Node.js, Express.js, Prisma ORM
- **Database**: PostgreSQL
- **Autentikasi**: NextAuth
- **Hosting**: Vercel (Frontend), Railway (Backend & Database)

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

