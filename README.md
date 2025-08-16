# 📌 Frontend Attendance

Frontend ini dibuat untuk kebutuhan Fullstack Developer Challenge Test dari fleetify.id

---

## 🚀 Teknologi yang Digunakan

### 🛠️ Core Stack

- **Node.js** v18.20.4 (Runtime JavaScript)
- **Next.js** v15.2.0 (React Framework)
- **React** v18.3.1 (Library UI)
- **TypeScript** v5 (Static Typing)

### 🎨 Styling

- **Tailwind CSS** v3.4.1 (Utility-first CSS)
- **Tailwind Plugins**:
  - `@tailwindcss/typography` v0.5.16
  - `tailwind-merge` v3.3.1
  - `tailwindcss-animate` v1.0.7

### 🧩 UI Components

- **shadcn/ui** (Komponen berbasis Radix UI)
- **Radix UI Primitives**:
  - `@radix-ui/react-dialog` v1.1.6
  - `@radix-ui/react-tabs` v1.1.3
- **Lucide React** v0.475.0 (Ikon)
- **Heroicons** v2.2.0 (Ikon tambahan)

### 🔮 State Management

- **Zustand** v5.0.3 (Global State)
- **React Query** v5.85.3 (Data Fetching)

### 📡 API Communication

- **Axios** v1.8.4 (HTTP Client)
- **React Hook Form** v7.55.0 + **Zod** v4.0.17 (Form Validation)

### 💬 Notifikasi

- **Sonner** v2.0.7 (Toasts)
- **react-toastify** v11.0.5 (Legacy Toasts)

### ⏱️ Utilitas

- **date-fns** v3.6.0 (Date Manipulation)
- **clsx** v2.1.1 (Classname Utilities)

---

## 📂 Struktur Proyek

```
frontend-attendance/
│── app/
│   ├── ClientBody.tsx
│   ├── globals.css
│   ├── layout.tsx
│   ├── page.tsx
│   ├── providers.tsx
│   └── sample.txt      # contoh lama tanpa Zustand (menggunakan useState)
│
│── components/
│   ├── Attendance/     # Form & riwayat absensi
│   ├── common/         # Komponen umum (Modal, Card, dll)
│   ├── DataManagement/ # CRUD Departemen & Karyawan
│   ├── ui/             # Komponen shadcn/ui
│   ├── Home.tsx
│   ├── Layout.tsx
│   └── icons.tsx
│
│── data/               # (opsional) dummy data
│── lib/                # utilitas API & helper
│── page/               # halaman Next.js tambahan
│── providers/          # provider global (React Query)
│── services/           # konfigurasi axios
│── stores/             # Zustand store (attendance, employee, department)
│── types/              # TypeScript types
│── utils/              # fungsi helper
│
│── package.json
│── tailwind.config.js
│── tsconfig.json
```

---

## ⚙️ Instalasi & Menjalankan Proyek

1. Clone repository ini:

   ```bash
   git clone https://github.com/teguhsaputra/frontend-attendance.git
   cd frontend-attendance
   ```

2. Install dependencies (disarankan menggunakan **bun**):

   ```bash
   bun install
   # atau
   npm install
   ```

3. Jalankan server development:

   ```bash
   bun run dev
   # atau
   npm run dev
   ```

4. Buka di browser:
   ```
   http://localhost:3000
   ```

---

## 📜 Script NPM

- `dev` → Menjalankan server development Next.js
- `build` → Build aplikasi untuk produksi
- `export` → Export aplikasi menjadi static site
- `start` → Menjalankan aplikasi hasil build
- `lint` → Linting & cek TypeScript
- `format` → Format kode dengan Biome

---
