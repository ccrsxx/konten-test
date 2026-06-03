# Kasbon

Web app sederhana buat track utang piutang pribadi.
Dibuat dengan Next.js 16 App Router, Tailwind CSS v4, dan Supabase.

## Demo

**Live Demo:** [Tulis Link Vercel Di Sini]

## Setup & Menjalankan Lokal

1. **Clone repository:**

   ```bash
   git clone <repo-url>
   cd kasbon
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Setup Environment Variables:**
   Copy file `.env.example` ke `.env.local` dan isi nilainya dengan credential Supabase project kamu.

   ```bash
   cp .env.example .env.local
   ```

   _Note: Pastikan kamu sudah membuat project di Supabase dan menyalakan Supabase Auth (Email & Password)._

4. **Migrasi Database:**
   Gunakan Supabase CLI untuk apply migrasi dan RLS ke database kamu:

   ```bash
   npx supabase link --project-ref <your-project-ref>
   npx supabase db push
   ```

   _Atau kamu bisa copy-paste manual isi file SQL yang ada di folder `supabase/migrations/` ke SQL Editor di dashboard Supabase kamu berurutan._

5. **Jalankan Aplikasi:**
   ```bash
   npm run dev
   ```
   Buka `http://localhost:3000` di browser.

## Approach & Keputusan Teknis

[Tulis 1 paragraf di sini tentang keputusan teknis yang paling kamu banggakan. Misalnya tentang penggunaan Server-Side Rendering (SSR) yang dikombinasikan dengan React Query Hydration untuk UX yang sangat cepat, atau struktur komponen yang sangat modular, dll.]

## Trade-off & Future Polish

[Tulis di sini: Kalau ada 1 hari lagi, apa yang akan kamu polish? Misalnya nambahin dark mode toggle, e2e testing pakai Cypress/Playwright, atau notifikasi email kalau utang udah jatuh tempo.]

## Time Spent

[Tulis dengan jujur berapa lama waktu yang dihabiskan untuk menyelesaikan test ini.]
