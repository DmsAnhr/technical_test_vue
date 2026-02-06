# PDF Report Generator Dashboard

### Repository : https://github.com/DmsAnhr/technical_test_vue

Dashboard web sederhana untuk membuat laporan PDF dengan input parameter dinamis dan riwayat generate yang tersimpan. Proyek ini dibuat sebagai bagian dari Technical Test Frontend Developer.

## 🚀 Fitur Utama

* **Form Konfigurasi Laporan:** Input Judul, Ukuran Halaman (A4/A5/Letter), Nominal (Format Rupiah), dan Deskripsi.
* **Validasi Real-time:** Menangani input required, min-length, dan format angka.
* **Komponen Currency Input:** Input khusus yang memformat angka ribuan secara otomatis (Rp) namun menyimpan data sebagai number.
* **Riwayat (History):** Menyimpan daftar laporan yang pernah dibuat menggunakan LocalStorage (Data tidak hilang saat refresh).
* **Responsive Design:** Tampilan optimal dari Mobile (320px) hingga Desktop (1920px).

## 🛠️ Tech Stack

* **Framework:** [Nuxt 4](https://nuxt.com) (Vue.js 3 Composition API)
* **Styling:** [Tailwind CSS v4](https://tailwindcss.com)
* **Icons:** Heroicons (SVG)
* **State Management:** Vue Reactivity & Composables (`useReport`)

## 📦 Cara Menjalankan Project

Pastikan Node.js sudah terinstall di komputer Anda.

1.  **Clone atau Extract repository ini**
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Jalankan server development:**
    ```bash
    npm run dev
    ```
4.  **Buka di browser:**
    Akses `http://localhost:3000`

## 📂 Struktur Folder

Proyek ini menggunakan struktur folder `app/` untuk kerapian kode (Nuxt 4 Future Compatibility).

```text
app/
├── assets/css/        # Konfigurasi Tailwind CSS
├── components/
│   ├── common/        # Komponen UI Reusable (Header, CurrencyInput)
│   └── dashboard/     # Komponen Fitur (Form, Table)
├── composables/       # Logic & State Management (useReport)
└── app.vue            # Layout Utama