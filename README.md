# Physics Calculator

Aplikasi **Kalkulator Fisika Berbasis Website** — dibangun dengan stack modern dan
desain *dark-tech* dengan aksen gradient indigo→cyan.

Proyek ini merupakan tugas Ujian Akhir Semester (UAS) mata kuliah **Fisika Dasar 1**,
Program Studi Informatika S1.

## ✨ Fitur

Empat kalkulator fisika interaktif:

| Kalkulator | Rumus | Besaran yang bisa dicari |
| --- | --- | --- |
| **Energi Kinetik** | `Ek = ½·m·v²` | Ek, massa, kecepatan |
| **Energi Potensial** | `Ep = m·g·h` | Ep, massa, gravitasi, ketinggian |
| **Hukum Newton II** | `F = m·(v−v₀)/t` | Gaya |
| **Kecepatan GLBB** | `v = v₀ + a·t` | v, v₀, a, t |

- **Multi-halaman (SPA)** dengan React Router — landing page + 4 halaman kalkulator.
- **Sepenuhnya responsif** — dioptimalkan untuk ponsel, tablet, dan desktop.
- **Aksesibel** — label form, `aria-*`, focus ring, dukungan `prefers-reduced-motion`.
- **Validasi input** dengan pesan error dalam Bahasa Indonesia.

## 🛠️ Stack

- [Vite](https://vitejs.dev/) — build tool & dev server
- [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [React Router](https://reactrouter.com/) — routing SPA
- [Tailwind CSS](https://tailwindcss.com/) — styling + design tokens

## 🚀 Menjalankan

```bash
# 1. Install dependensi
npm install

# 2. Jalankan dev server
npm run dev

# 3. Build untuk produksi
npm run build

# 4. Pratinjau hasil build
npm run preview
```

## 📁 Struktur

```
src/
├── components/
│   ├── Calculator.tsx      # Mesin kalkulator generik (form + validasi + hasil)
│   ├── FormulaPanel.tsx    # Panel rumus & legenda variabel
│   ├── Navbar.tsx          # Navbar sticky + menu mobile
│   └── Footer.tsx
├── data/
│   └── calculators.ts      # Definisi & logika 4 kalkulator (single source of truth)
├── pages/
│   ├── Home.tsx            # Landing page
│   ├── CalculatorPage.tsx  # Halaman kalkulator (dinamis via slug)
│   └── NotFound.tsx
├── App.tsx                 # Routing
├── main.tsx                # Entry point
└── index.css               # Tailwind + design tokens
```

## 👥 Anggota Kelompok

| Nama | NIM |
| --- | --- |
| Dwi Fajar Nugroho | 230611002 |
| Igris Rizkia Kurniawan | 230611011 |
| Pandu Kukuh Waskito Wibowo | 230611018 |

## 📌 Catatan

Versi statis (HTML/CSS/JS) sebelumnya disimpan sebagai cadangan di folder
`.backup-Physics-Calculator-*` di direktori induk.
