# Kasbon

Web app pencatatan utang piutang pribadi. Catat siapa hutang berapa, tandai lunas kalau udah dibayar, dan lihat summary total.

## Demo

**Live:** [https://kasbon-frontend.vercel.app](https://kasbon-frontend.vercel.app)

**Loom:** TODO

## Tech Stack

| Teknologi             | Versi  | Alasan                                                                                            |
| --------------------- | ------ | ------------------------------------------------------------------------------------------------- |
| Next.js               | 16.2.7 | App Router, Server Components, API Routes                                                         |
| Tailwind CSS          | v4     | Utility-first CSS                                                                                 |
| Supabase              | -      | PostgreSQL + Auth + RLS                                                                           |
| Lucide React          | 1.17.0 | Icon library                                                                                      |
| React Query           | 5.x    | Server state management, caching, background refetching                                           |
| React Hook Form       | 7.x    | Performant form handling tanpa re-render berlebihan                                               |
| @hookform/resolvers   | 5.x    | Bridge antara React Hook Form dan Zod, supaya schema validation bisa langsung jadi form validator |
| Zod                   | 4.x    | Schema validation di client + server (single source of truth)                                     |
| clsx + tailwind-merge | -      | Utility buat merge Tailwind classes tanpa conflict                                                |
| React Compiler        | 1.0.0  | Auto-memoization, gak perlu `useMemo`/`useCallback` manual                                        |

## Setup Lokal

### 1. Clone & Install

```bash
git clone https://github.com/ccrsxx/kasbon.git
cd kasbon
npm install
```

### 2. Environment Variables

```bash
cp .env.example .env.local
```

Isi `.env.local` dengan credential dari [Supabase Dashboard](https://app.supabase.com/project/_/settings/api):

```bash
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=eyJhbGci...
```

### 3. Migrasi Database

**Opsi A — Supabase CLI (recommended):**

```bash
npx supabase link --project-ref <your-project-ref>
npx supabase db push
```

**Opsi B — Manual:**

Copy-paste isi file SQL di `supabase/migrations/` secara berurutan ke SQL Editor di Supabase Dashboard:

1. `20260602175450_create_debts_table.sql` — Buat tabel & enum
2. `20260602175506_create_rls_on_debts.sql` — RLS policies
3. `20260603071900_create_indexes.sql` — Performance indexes

### 4. Generate Types (opsional)

```bash
npm run db:generate
```

### 5. Jalankan

```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000).

## Approach

Keputusan teknis yang paling saya banggakan adalah arsitektur **SSR + React Query Hydration**. Di halaman Dashboard dan Edit, data di-fetch langsung di sisi server pakai Supabase server client, lalu dilempar ke client sebagai `initialData` di hook React Query. Hasilnya user dapet UI yang langsung jadi tanpa loading skeleton di first load (zero layout shift), tapi di saat yang sama tetep punya semua fungsionalitas React Query di client — background refetching, optimistic cache updates, dan seamless mutation. Selain itu, layer keamanan dibuat berlapis: Zod validation di client + server, RLS di level database, dan auth middleware di proxy. Jadi biarpun ada yang coba bypass frontend, data tetep aman.

## Trade-off

Kalau ada 1 hari lagi, yang akan saya polish:

- **Pagination / Infinite Scroll** — Saat ini semua data diambil sekaligus. Kalau user punya ribuan catatan, perlu cursor-based pagination di backend + `useInfiniteQuery` di frontend.
- **E2E Testing** — Automated testing pakai Playwright buat critical flow (login, create, edit, delete, tandai lunas) supaya gak ada regresi setiap deploy.
- **Optimistic Updates** — Saat ini mutation nunggu response server dulu baru update UI. Bisa dipercepat dengan optimistic update di React Query supaya UX terasa lebih instant.

## Time Spent

~12 jam

## Fitur

### Core (Deliverables)

- ✅ Auth — Signup & login (email + password), logout button, halaman protected
- ✅ Dashboard — 3 summary cards (total dihutang, total hutang, net hijau/merah)
- ✅ List entry — Nama orang, tipe, jumlah (Rp), tanggal relative, status, tombol aksi
- ✅ Filter — Dropdown status (semua/belum/lunas) & tipe (semua/dihutang/hutang)
- ✅ Form — Tipe radio, nama (wajib), jumlah (wajib, Rupiah), tanggal (default hari ini), catatan (opsional, max 200)
- ✅ CRUD — Catat baru, edit, hapus, tandai lunas
- ✅ API — GET/POST /api/debts, PATCH/DELETE /api/debts/[id], semua wajib auth
- ✅ Validasi — Zod di client + server
- ✅ Database — Migrasi SQL, schema sesuai spec, RLS policies (SELECT/INSERT/UPDATE/DELETE)
- ✅ Format Rupiah — `Intl.NumberFormat('id-ID')` → `Rp 1.234.000`
- ✅ Relative time — Bahasa Indonesia ("3 hari lalu", "kemarin")
- ✅ Error response — Bahasa Indonesia + status code yang bener
- ✅ TypeScript strict — `strict: true`, zero `any`
- ✅ UI copy — Bahasa Indonesia casual

### Bonus (dari dokumen)

- ✅ Search by nama orang
- ✅ Sort by jumlah / tanggal
- ✅ Group multiple debts dari orang sama (nama, jumlah entry, total net per orang)
- ✅ Bar chart compare total dihutang vs hutang
- ✅ Empty state, loading state (skeleton), error state — semua di-handle
- ✅ Mobile-first responsive design

### Tambahan (inisiatif sendiri)

- ✅ SSR + React Query hydration — Data di-fetch di server, zero layout shift di first load
- ✅ Database indexes — Composite index buat optimasi query
- ✅ Delete confirmation modal — Custom modal, bukan `window.confirm`
- ✅ React Compiler — Auto-memoization, tanpa `useMemo`/`useCallback` manual
