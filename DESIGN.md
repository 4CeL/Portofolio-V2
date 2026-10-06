# Rancangan Portfolio v3 — "Workspace"

Status: semua keputusan final (bagian 12). Implementasi v0.1 di folder ini.

Referensi: [irfansabrian.vercel.app](https://irfansabrian.vercel.app/) (tema monokrom, layout "app shell" berbingkai).
Sumber konten: portfolio v1 (`../portfolio`).

## 1. Konsep

**"Workspace"**: portfolio tampil seperti satu aplikasi desktop di dalam bingkai, bukan halaman landing yang di-scroll panjang.
Ada header, side-nav, area kerja (stage), dan status bar. Setiap menu membuka satu "scene" di dalam stage.

Kenapa cocok untuk Stefanus: backend developer sehari-hari bekerja dengan dashboard, console, dan panel admin.
Portfolio-nya meminjam bahasa visual itu: rapi, terstruktur, label monospace, data tersaji seperti tabel dan list.

### Yang diambil dari referensi
- Bingkai (frame) tetap dengan hairline dan sudut 16px, berjarak 18px dari tepi layar.
- Struktur shell: header 74px, side-nav 184px, stage, footer 44px.
- Palet monokrom kertas (off-white hangat) + tinta (hitam pekat), tekstur titik halus.
- Label mono uppercase sebagai metadata, judul sans sangat tebal.
- Teks berputar di pill invert pada hero, kursor bracket, loader pembuka (di v3 diganti Rubik + loading bar).
- Halaman Projects berupa master-detail (list di kiri, detail di kanan).

### Yang dibedakan (identitas sendiri)
- Status bar berisi path aktif ala terminal (`~/projects/smarthub`), jam WIB live, dan status "open to internship".
- Hero punya blok kecil "request → response" (`GET /api/stefanus`) sebagai penanda backend.
- Halaman Experience memakai linimasa ala `git log`, bukan kartu.
- Skills disajikan sebagai matriks (teknologi × domain × dipakai di project), tanpa persentase atau progress bar.
- Navigasi keyboard: `1`–`6` untuk pindah scene, `↑/↓` di daftar project.
- Light sebagai default, toggle ke dark yang berupa inversi penuh palet.

## 2. Prinsip visual

| Lakukan | Hindari |
|---|---|
| Hierarki dari tipografi, garis, dan inversi | Warna aksen, gradient berwarna, glow |
| Hairline 1px sebagai pemisah | Shadow tebal, kartu mengambang |
| Radius hanya di bingkai luar (16px), elemen dalam siku | Tombol dan kartu membulat besar |
| Label mono kecil untuk metadata | Ikon warna-warni untuk setiap item |
| Konten asli tampil berwarna (screenshot project, foto profil, hijau GitHub); UI tetap monokrom | Mockup device mengkilap |
| Animasi pendek dan bermakna | Animasi infinite (floating icon, blob) seperti di v1 |

Satu-satunya "aksen" adalah **inversi**: hover tombol, item aktif, pill teks berputar, dan tooltip memakai latar tinta dengan teks kertas.

## 3. Design tokens

### Warna

| Token | Light (default) | Dark (invert) | Pakai untuk |
|---|---|---|---|
| `--paper` | `#E8E8E5` | `#0F0F0F` | Background luar |
| `--paper-soft` | `#F1F1EE` | `#171717` | Panel, header, footer |
| `--ink` | `#111111` | `#ECECE9` | Teks utama, blok invert |
| `--ink-70` | ink @ 70% | ink @ 70% | Teks body sekunder |
| `--ink-50` | ink @ 50% | ink @ 55% | Label, nav tidak aktif |
| `--line` | ink @ 24% | ink @ 20% | Hairline bingkai dan pemisah |
| `--line-soft` | ink @ 10% | ink @ 10% | Garis tabel, grid dalam panel |
| `--dot` | ink @ 12% | ink @ 10% | Tekstur titik |

Tekstur permukaan (dipakai di root dan stage):
```css
--surface-texture:
  radial-gradient(circle at 1px 1px, rgb(17 17 17 / .12) 1px, transparent 1.7px),
  radial-gradient(circle at 1px 1px, rgb(17 17 17 / .06) 1px, transparent 1.8px);
--surface-texture-size: 18px 18px, 72px 72px;
```
Ditambah spotlight radial putih tipis di tengah layar agar tidak datar.

### Tipografi (self-hosted via `next/font/local`, file di `src/fonts/`)
- **Display/body:** Space Grotesk (variable, 300–700). Letter-spacing judul besar -0.03em agar rapat.
- **Mono:** JetBrains Mono (500–700), selalu uppercase untuk label dan nav.

| Peran | Ukuran | Berat | Line-height |
|---|---|---|---|
| Nama di hero / judul scene | `clamp(2.9rem, 6.5vw, 6.5rem)` | 700 | 0.94 |
| Judul panel | `clamp(1.35rem, 2.4vw, 2.4rem)` | 600 | 1.08 |
| Judul item | 1.125rem | 700 | 1.2 |
| Body | `clamp(.92rem, 1.3vw, 1.05rem)` | 400 | 1.5 |
| Label mono | `clamp(.72rem, 1.2vw, .88rem)` | 650 | 1 |
| Nav / footer mono | .66–.76rem | 600–700 | 1 |

### Spacing, radius, motion
- Spacing berbasis 4px; padding stage `clamp(22px, 3vw, 42px)`.
- Radius: bingkai 16px, selain itu 0.
- Durasi: hover 160ms, reveal 400–600ms, pindah scene 450ms.
- Easing: `cubic-bezier(.22, 1, .36, 1)` (masuk), `cubic-bezier(.77, 0, .18, 1)` (loader/wipe).
- Semua animasi non-esensial mati saat `prefers-reduced-motion: reduce`.

## 4. Layout shell (desktop ≥ 1024px)

```
┌─ 18px ─────────────────────────────────────────────────────────────────┐
│ ╭────────────────────────────────────────────────────────────────────╮ │
│ │ [SM] STEFANUS / 2026  (◎ GITHUB↗|◎ LINKEDIN↗|◎ EMAIL) (LIGHT|DARK) │ │ header 74px
│ ├──────────────┬─────────────────────────────────────────────────────┤ │
│ │              │                                                     │ │
│ │  — Home      │                                                     │ │
│ │  — About     │                 STAGE (scene aktif)                 │ │
│ │  —— Projects │                                                     │ │
│ │  — Skills    │                                                     │ │
│ │  — Experience│                                                     │ │
│ │  — Contact   │                                                     │ │
│ │              ├─────────────────────────────────────────────────────┤ │
│ │  184px       │ ~/projects/smarthub    BACKEND · DATA    WIB 14:02  │ │ footer 44px
│ ╰──────────────┴─────────────────────────────────────────────────────╯ │
└────────────────────────────────────────────────────────────────────────┘
```

- `html, body` tidak di-scroll. Bingkai `position: fixed; inset: 18px`.
- Stage boleh scroll secara internal bila konten lebih tinggi dari layar (scrollbar tipis, tetap terlihat, bukan disembunyikan).
- Side-nav: link mono abu, garis 6px di kiri melebar jadi 11px saat hover/aktif, teks aktif berwarna tinta.
- Header kanan (dibuat beda dari referensi yang memakai kotak ikon terpisah):
  - Strip link berbentuk pill (radius penuh) berisi ikon + label mono `GitHub ↗ · LinkedIn ↗ · Email`, dipisah hairline. Hover: latar tint + garis bawah tipis di bawah label yang tumbuh dari kiri, panah bergeser ke kanan atas.
  - Switch tema pill dua posisi `(☀ Light | ☾ Dark)` (ikon matahari dan bulan) dengan thumb bulat yang bergeser (`role="switch"`). Posisi thumb diatur CSS dari `html[data-theme]`, jadi sudah benar sebelum hydration.
  - Tombol `Menu` juga pill. Pengecualian dari aturan "radius hanya di bingkai luar": kontrol header memakai radius penuh.
  - Di bawah 768px strip link disembunyikan (link ada di menu mobile); switch dan tombol `Menu` tetap.
- Logo: monogram "SM" berbentuk SVG garis tegas (dibuat baru).

## 5. Scene / halaman

Setiap scene adalah route sendiri agar bisa dibagikan dan terindeks.

| # | Route | Scene | Isi |
|---|---|---|---|
| 01 | `/` | Home | Hero + capability map |
| 02 | `/about` | About | Profil, fakta, foto |
| 03 | `/projects` | Projects | Master-detail daftar project |
| — | `/projects/[slug]` | Case file | Detail project |
| 04 | `/skills` | Skills | Matriks teknologi |
| 05 | `/experience` | Experience | Linimasa organisasi, kompetisi, pendidikan |
| 06 | `/contact` | Contact | Ajakan kontak + kanal |

### 01 Home
```
PORTFOLIO 2026 / BACKEND + DATA + AUTOMATION          (label mono)
Stefanus Marcellino                                   (display 800)

I build [ RESTful APIs ]                              (pill invert, kata berputar:
                                                       RESTful APIs → data pipelines → automation flows)
Backend developer intern & CS student at BINUS. I build efficient backend
systems, RESTful APIs, and data-driven applications for real-world problems.

[ View Projects → ]  [ Open CV ↗ ]                    (tombol siku, outline; hover invert)

┌──────────────────────── GET /api/stefanus ────────────────────────┐
│ 200 OK · 42ms                                                     │  (blok mono kecil di kanan atas
│ { "role": "backend intern", "based": "Tangerang", "open": true }   │   hero, diketik sekali)
└───────────────────────────────────────────────────────────────────┘

CAPABILITY MAP
┌──────────────┬──────────────┬──────────────┬──────────────┐
│ BACKEND      │ DATA         │ AUTOMATION   │ FRONTEND     │
│ API & systems│ Analysis & ML│ Workflow     │ Interfaces   │
│ Flask, REST, │ Python,      │ n8n, Docker, │ React,       │
│ MySQL        │ Tableau      │ Google APIs  │ Next.js      │
└──────────────┴──────────────┴──────────────┴──────────────┘
```
Kartu capability: dipisah hairline vertikal, latar arsiran diagonal sangat tipis, hover naik 2px dan teks jadi tinta penuh.

### 02 About
Dua kolom: kiri panel pernyataan ("Current direction: Backend developer."), kanan foto profil berwarna dalam bingkai siku.
Di bawahnya tabel fakta mono:

| KEY | VALUE |
|---|---|
| STUDY | Computer Science, BINUS · 2023–now |
| FOCUS | Backend, database, data analytics |
| BASED | Tangerang, Indonesia |
| CODING | 2+ years |
| PROJECTS | 5+ completed |

Panel GitHub contribution (`github.com/4CeL`): kalender dengan 5 tingkat hijau ala GitHub (versi light dan dark), total kontribusi setahun, link ke profil. Data diambil di server saat build dengan revalidate harian; jika gagal, panel tidak ditampilkan.

### 03 Projects (master-detail)
```
2023–2026 / SELECTED SYSTEMS
Project archive.
┌──────────────────────────┬──────────────────────────────────────────┐
│ PROJECT LIST   9 projects│ [thumbnail berwarna]                     │
│ [ALL][BACKEND][DATA][IOT]│                                          │
│──────────────────────────│ 2025 · AUTOMATION PLATFORM               │
│ 2025  Automation         │ SmartHub                                 │
│ ▌SmartHub           ←akt │ Centralized platform for livestream      │
│   Active development     │ scheduling and content automation.       │
│──────────────────────────│                                          │
│ 2024  IoT · AI           │ STACK  Next.js · Electron · n8n · Docker │
│  Air Purifier            │ ROLE   Integration & automation          │
│   Competition project    │                                          │
│──────────────────────────│ [ Open case file → ]  [ GitHub ↗ ]       │
│ ...                      │                                          │
└──────────────────────────┴──────────────────────────────────────────┘
```
- Item aktif: latar invert. Klik/hover/`↑↓` mengganti panel kanan tanpa pindah halaman.
- Di ujung kanan baris filter domain ada tombol sort ikon saja (tiga garis mengecil, 30×30, tanpa teks). Klik membuka dropdown custom (`components/ui/SortMenu.js`, pola listbox): panel siku berbingkai tinta dengan bayangan offset tipis, opsi mono berpadding 9×12px, tanda centang di opsi aktif, highlight tint saat hover. Keyboard: ↓/↑ membuka dan berpindah, Home/End, Enter/Space memilih, Esc/Tab/klik di luar menutup; fokus kembali ke tombol. Kursor bracket mengunci ke tombol dan ke tiap opsi. Tombol ter-invert saat sort selain Featured aktif; tooltip menampilkan pilihan aktif. Pilihan: Featured (urutan di `projects.js`), Newest first, Oldest first, Name A–Z, Name Z–A. Tahun berbentuk rentang (`2024 - 2025`, `2023 - now`) diparse oleh `src/lib/years.js`: Newest memakai tahun akhir, Oldest tahun awal; urutan seri mengikuti Featured. Sort dan filter bisa digabung.
- Task Management, EduNext, dan Nibble sudah tampil (total 9 project), tapi isinya masih placeholder: semuanya memakai konten dummy "digital wallet" dari v1 dan gambar Ubidots, lewat `placeholderProject()` di `src/content/projects.js` (ditandai `// DUMMY`).

### Case file `/projects/[slug]`
Stage di-scroll internal. Sidebar metadata sticky di kiri, konten di kanan.
```
← PROJECTS            CASE 02 / 09                    NEXT →
┌──────────────┬────────────────────────────────────────────┐
│ ROLE         │ SmartHub                                   │
│ YEAR         │ [ gambar full-width ]                      │
│ STACK        │ 01 OVERVIEW                                │
│ STATUS       │ 02 PROBLEM  │  SOLUTION                    │
│ LINKS ↗      │ 03 HOW IT WORKS  [Manage]→[Connect]→[...]  │
│ (sticky)     │ 04 MY CONTRIBUTION                         │
│              │ 05 CHALLENGES & LEARNINGS                  │
└──────────────┴────────────────────────────────────────────┘
NEXT CASE → AIR PURIFIER                     (baris invert penuh)
```
Section "How it works" memakai `howItWorks` dari data v1, digambar sebagai kotak siku + panah garis.

### 04 Skills
Panel atas: "Core direction" + tiga angka kecil (Core / Support / Delivery).
Di bawahnya matriks:

| TECH | DOMAIN | DIPAKAI DI |
|---|---|---|
| Python | Backend · Data | Flood Analysis, Netflix Analysis |
| Flask · MySQL | Backend · Database | Internship (perlu konfirmasi project) |
| n8n | Automation | SmartHub |
| React / Next.js | Frontend | SmartHub, Portfolio |
| Electron | Desktop | SmartHub |
| MongoDB · Ubidots · Streamlit | IoT · Data | Air Purifier |
| Tableau | Data viz | Netflix, Flood Analysis |
| Docker · Git | Tooling | SmartHub |

Nama project di kolom terakhir adalah link ke case file. Soft skill ditulis sebagai satu baris teks mono, bukan kartu ikon.
Kolom TECH diawali logo teknologi 18px dari `simple-icons` (CC0, di-render di server lewat `components/ui/TechIcon.js`). Logo monokrom (tinta) saat diam dan berubah ke warna brand saat baris di-hover; warna brand yang terlalu gelap/terang (mis. Next.js hitam) tetap tinta. Baris gabungan menampilkan dua logo (PHP + Laravel, PostgreSQL + Supabase, React + Next.js). Tableau dan Ubidots tidak ada di simple-icons: Tableau memakai ikon grafik garis, Ubidots tidak diberi logo.

### 05 Experience
Linimasa ala `git log --graph`, dibagi per tab (tanpa "All"): `[ORGANIZATION 4] [COMPETITION 1] [EDUCATION 2] [CERTIFICATE 1]`. Tab pertama (Organization) tampil default, angka di tiap tab = jumlah entri.
```
[ORGANIZATION 4]  COMPETITION 1   EDUCATION 2   CERTIFICATE 1
●  2025–2026  General Manager of 1st Commission — HIMTI
│             Led 100+ members across 2 divisions ...
●  2025       Director & Technical Coordinator — HILET 2025
●  2024       Director & Event Vice Coordinator — SESVENT 2024
●  2024       Director — TECHNO 2024
```
Titik dan garis 1px tinta. Kolom: periode · judul + organisasi · toggle (tanpa hash dan label tipe, karena tipe sudah jelas dari tab). Item pertama di tiap tab terbuka; item lain bisa dibuka (accordion). Certificate bisa punya `credential` (link eksternal "View credential"). Tab kosong menampilkan "No … entries yet."

### 06 Contact
Judul besar "Let's build something reliable." dengan reveal per kata (blur → tajam, sekali).
Panel kanan berisi list kanal, tiap baris siku dengan hover invert:
- EMAIL `stefanusmarcellino18@gmail.com` + tombol [copy]
- WHATSAPP `+62 858 8235 9794`
- LINKEDIN, GITHUB
- LOCATION Tangerang, Indonesia

Form v1 tidak dibawa. Kontak cukup lewat `mailto:` dan link langsung (tanpa backend, tanpa spam).

## 6. Interaksi khas

1. **Loader Rubik**: muncul sekali per sesi, di desktop dan mobile. Rubik 3×3 CSS 3D (stiker 6 tingkat abu) menyelesaikan dirinya sendiri dalam 8 putaran (±2.8 detik) di atas loading bar + persen. Putaran terakhir menunggu event `load`, jadi 100% berarti halaman benar-benar selesai dimuat. Setelah solved: pop kecil, lalu wipe ke atas. Bisa di-skip dengan klik/tombol apa pun. Tidak muncul saat reduced-motion; tanpa JS, CSS menyembunyikannya setelah ±6 detik.
2. **Dot field**: kanvas titik di belakang bingkai yang sedikit menjauh dari kursor dalam radius ±150px. Hanya untuk `pointer: fine`, pause saat tab tidak aktif.
3. **Target cursor**: empat sudut bracket yang mengunci ke elemen interaktif saat hover. Hanya `pointer: fine`, kursor asli tetap ada (tidak disembunyikan).
4. **Rotating pill**: kata di hero berganti tiap ±2.5 detik dengan slide vertikal. Berhenti saat reduced-motion (tampilkan kata pertama).
5. **Pindah scene**: hanya area stage yang beranimasi; header, side-nav, dan status bar diam. Halaman lama mundur (naik 18px, skala 0.985, blur 3px) dan fade out (260ms); halaman baru dibuka dengan wipe dari atas ke bawah (`clip-path`, 620ms, mulai 120ms kemudian, easing sama dengan loader) sambil naik 28px ke posisinya, lalu elemen `.reveal` di scene baru muncul bertahap seperti biasa. Pakai React `<ViewTransition update="page-swap">` di `components/shell/Frame.js` + `experimental.viewTransition` di `next.config.mjs`; CSS di `shell.css`. Berlaku untuk klik link, tombol 1–6, dan Next/Prev case file; ganti sort/filter tidak memicu transisi. Browser tanpa View Transitions API dan reduced-motion: pindah instan.
6. **Status bar live**: path route aktif, kategori project yang sedang dilihat, jam WIB.
7. **Keyboard**: `1`–`6` pindah scene, `↑/↓` + `Enter` di daftar project, `Esc` menutup menu/preview CV. Tidak aktif saat fokus di input.
8. **CV preview**: tombol "Open CV" membuka modal PDF dalam bingkai yang sama, dengan tombol download.

## 7. Responsif

| Breakpoint | Perilaku |
|---|---|
| ≥ 1280px | Shell penuh seperti bagian 4 |
| 1024–1279px | Side-nav 152px, capability map 2×2 |
| 768–1023px | Side-nav hilang, menu di header. Bingkai tetap, stage scroll internal |
| < 768px | Bingkai jadi dokumen biasa (inset 10px, scroll halaman normal), header sticky |

- Menu mobile: tombol `MENU` membuka panel bertumpuk (3 lapis warna masuk berurutan) berisi daftar `01 Home … 06 Contact` ukuran besar + ikon sosial.
- Projects di mobile: list biasa, tap membuka case file (tanpa panel detail di samping).
- Dot field dan target cursor dimatikan di mobile (loader tetap tampil).

## 8. Aksesibilitas

- Kontras tinta/kertas ±15:1. `--ink-50` hanya untuk teks non-esensial ≥ 12px.
- Struktur landmark: `header`, `nav` (side-nav dan mobile), `main` (stage), `footer`.
- `aria-current="page"` pada nav aktif; item project aktif memakai `aria-selected` dalam `role="listbox"` atau link biasa.
- Focus ring 2px tinta + offset 2px, tidak pernah dihapus. Target klik minimal 38×38px.
- Ikon sosial punya `aria-label`; link eksternal `rel="noopener noreferrer"`.
- Teks berputar diberi `aria-label` berisi frasa lengkap agar screen reader tidak membaca tiap pergantian.
- Validasi WCAG penuh tetap perlu tes manual dengan screen reader dan keyboard.

## 9. Performa

- Scene statis = Server Component; hanya loader, dot field, cursor, rotating text, project list, dan toggle yang Client Component.
- Dot field ditulis dengan canvas 2D biasa (tanpa library), dibatasi 60fps dan jumlah titik menyesuaikan luas layar.
- Gambar dikompres ke WebP/AVIF < 300 KB. Catatan: `Tableu Visualitation.jpg` di v1 berukuran ±13 MB.
- Target Lighthouse: Performance ≥ 90, Accessibility ≥ 95.

## 10. Tech stack & struktur folder

Stack sama dengan v1 agar familiar: **Next.js 16 (App Router), React 19, Tailwind CSS v4, JavaScript**.
- Tanpa `framer-motion`, `next-themes`, `react-icons`, `hero-patterns`. Animasi pakai CSS + Web Animations API; ikon sosial berupa SVG inline.
- Sebelum menulis kode, baca panduan di `node_modules/next/dist/docs/` karena Next.js 16 punya perubahan API.

```
portfolio-v3/
├─ src/
│  ├─ app/
│  │  ├─ layout.js                # font, metadata, shell, theme script
│  │  ├─ page.js                  # 01 Home
│  │  ├─ about/page.js
│  │  ├─ projects/page.js
│  │  ├─ projects/[slug]/page.js  # generateStaticParams + generateMetadata
│  │  ├─ skills/page.js
│  │  ├─ experience/page.js
│  │  ├─ contact/page.js
│  │  ├─ not-found.js             # "404 / route not found" gaya response API
│  │  └─ sitemap.js, robots.js, opengraph-image.js
│  ├─ components/
│  │  ├─ shell/   (Frame, Header, SideNav, StatusBar, MobileMenu)
│  │  ├─ effects/ (Loader, DotField, TargetCursor, Reveal)
│  │  ├─ ui/      (RotatingText, ApiBlock, Button, CopyButton, LiveClock, CvModal)
│  │  └─ scenes/  (HomeScene, ProjectConsole, CaseFile, SkillMatrix, Timeline, ContactPanel)
│  ├─ content/    (profile.js, projects.js, skills.js, experience.js)
│  └─ styles/     (tokens.css, shell.css)
└─ public/        (cv.pdf, images/, logo.svg)
```
Semua teks dan data ada di `src/content/`, jadi edit konten tidak perlu menyentuh komponen.

## 11. Pemetaan konten dari v1

| Sumber v1 | Tujuan v3 | Catatan |
|---|---|---|
| `Hero.jsx` | `profile.js` → Home | Nama, role, tagline, link sosial |
| `About.jsx` | `profile.js` → About | Bio dua paragraf, fakta 2+ / 5+ |
| `Skills.jsx` | `skills.js` → Skills | Persentase dibuang, diganti domain + project |
| `Experience.jsx` + `Education.jsx` | `experience.js` → Experience | Digabung jadi satu linimasa bertipe |
| `Contact.jsx` | `profile.js` → Contact | Form dibuang, kanal dipertahankan |
| `data/projects.js` | `projects.js` | Ditambah field `year`, `category`, `status`, `role` |
| `public/Profiles.png`, `src/assets/*` | `public/images/` | Dikompres, versi grayscale dibuat saat build |

Perbaikan konten yang terlihat di v1:
- Typo: "Commision", "accross", "suplementary", "avarege", "Portofolio".
- `howItWorks` Willify berisi teks Flood Analysis (salin-tempel).
- Task Management, EduNext, Nibble memakai deskripsi dummy "digital wallet".
- Subjudul Willify ("asset management") tidak sesuai deskripsinya (aplikasi musik/lirik).

## 12. Keputusan

### Sudah diputuskan
| # | Topik | Keputusan |
|---|---|---|
| 1 | Lokasi project | `Web Porto/portfolio-v3` |
| 2 | Tema | Light sebagai default, toggle ke dark (invert) tetap ada. Pilihan disimpan di `localStorage`, script tema di `<head>` agar tidak flash |
| 3 | Bahasa | EN saja. Toggle bahasa tidak ditampilkan; konten tetap dipisah di `src/content/` agar ID mudah ditambah nanti |
| 4 | Guestbook & Credentials | Tidak dibuat. Sertifikat Samsung Innovation Campus masuk Experience |
| 5 | GitHub contribution di About | Dibuat, data dari `github.com/4CeL` saat build (revalidate harian), fallback disembunyikan jika gagal fetch |
| 6 | Font display | Space Grotesk (300–700), berbeda dari referensi. Mono tetap JetBrains Mono |
| 7 | File CV | `public/cv.pdf` berisi PDF dummy dulu, diganti saat CV final siap |
| 8 | Tahun & status project | Pakai nilai dummy, ditandai `// DUMMY` di `src/content/projects.js` agar mudah dicari dan diganti |
