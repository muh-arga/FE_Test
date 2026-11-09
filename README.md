# FE_Test

Aplikasi web monitoring lalu lintas dan pendapatan jalan tol, dibuat dengan Next.js 16, TypeScript, dan Tailwind CSS v4. Halamannya: login, dashboard grafik, laporan lalin per hari, dan master data gerbang.

## Yang perlu disiapkan

- Node.js 20 atau lebih baru
- Docker dan Docker Compose (untuk menjalankan API test)
- Git dan `openssl`

## Langkah menjalankan

### 1. Jalankan API

Aplikasi ini membaca data dari API test yang disediakan Jasa Marga. Jalankan dulu API-nya:

```bash
git clone https://github.com/faoziyarisma/tect-test-front-end.git api-service
cd api-service
cp .env.example .env
docker compose up -d --build
```

Tunggu sekitar 30 detik sampai migrasi dan seed data selesai. Cek hasilnya:

```bash
curl http://localhost:8080/api/gerbangs
```

Kalau muncul 5 gerbang (Cilacap, Gombong, Kebumen, Sleman, Tempel), API sudah siap.

### 2. Masuk ke folder aplikasi

```bash
cd ../FE_Test
```

### 3. Pasang dependensi

```bash
npm install
```

### 4. Buat file `.env.local`

```bash
cp .env.example .env.local
```

Isi `SESSION_SECRET` dengan nilai acak. Aplikasi menolak tulisan contoh bawaan, jadi langkah ini wajib:

```bash
sed -i "s|^SESSION_SECRET=.*|SESSION_SECRET=$(openssl rand -hex 32)|" .env.local
```

```bash
sed -i "s|^API_BASE_URL=.*|API_BASE_URL=http://localhost:8080/api|" .env.local
```

### 5. Jalankan aplikasi

```bash
npm run dev
```

Buka http://localhost:3000.

### 6. Login

Gunakan akun dari dokumen test:

- Username: `Super Admin`
- Password: `password12345`

Data contoh ada di tanggal 2023-11-01 dan 2023-11-02. Pilih salah satu tanggal itu di Dashboard atau Laporan Lalin.

## Versi production

```bash
npm run build
npm start
```

## Mematikan

Hentikan aplikasi dengan `Ctrl+C`. Untuk mematikan API, jalankan `docker compose down` di folder `api-service`.

## Kalau ada masalah

| Gejala | Penyebab dan solusi |
|---|---|
| Muncul "Data gagal dimuat" | API belum jalan atau `API_BASE_URL` salah. Cek dengan `curl` ke alamat API di langkah 1. |
| Error soal `SESSION_SECRET` | Nilainya kosong, kurang dari 32 karakter, atau masih tulisan contoh. Ulangi perintah `sed` di langkah 4, lalu restart `npm run dev`. |
| API gagal terhubung ke database | File `.env` di folder `api-service` belum dibuat. Jalankan `cp .env.example .env` lalu `docker compose up -d --force-recreate`. |
| Port 3000 sudah dipakai | Hentikan program yang memakainya, atau jalankan `npm run dev -- -p 3001`. |
| Tabel kosong di Laporan Lalin | Tanggal yang dipilih tidak punya data. Pakai 2023-11-01 atau 2023-11-02. |
