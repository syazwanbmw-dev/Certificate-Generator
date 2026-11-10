# MEMORY.md — Certificate Generator (standalone)

## STATUS SEMASA (2026-11-10)

- 🟢 **LIVE** `faa7e57` — https://syazwanbmw-dev.github.io/Certificate-Generator/ (disahkan live 2026-11-10, termasuk uji CSV 20 nama rawak)
- 🔴 **Deploy: push ke `main` TAK mencetus workflow** (semua run lama `workflow_dispatch`). Selepas push WAJIB `gh workflow run static.yml -R syazwanbmw-dev/Certificate-Generator --ref main`. `gh` tanpa `-R` menyasar repo UPSTREAM (fork) — senarai run salah (Mei 2026).
- Nama fail JS sebenar huruf kecil (`filehandlers.js`, `fonthandler.js`) — senarai Struktur di bawah salah huruf besar.
- Tiada backlog aktif.

## Fitur patah baris (2026-11-10, LIVE)

Nama + Extra patah ke baris kedua ikut perkataan dalam sempadan sijil; IC TIDAK patah (satu baris).
- Lebar maks = 2×jarak ke tepi terdekat − 10% (min 10%): `maxTextWidthPercent` dalam `utils.js`, dipakai di pratonton (index.html) DAN cetak (certificateGenerator.js, `createOverlay(..., wrap)`).
- `width:max-content` WAJIB: tanpa itu kotak absolute mengecut ke ruang di kanan `left`, teks patah terlalu awal.
- Baris PERTAMA dikunci pada Y (`translateX(-50%)` + `margin-top:-0.6em` + `line-height:1.2`). Dulu `translate(-50%,-50%)` bikin nama 2 baris NAIK separuh jarak baris (~27px) dan line-height 1.6 diwarisi terlalu longgar. Baris tambahan turun ke bawah.
- Lalai kedudukan: nama Y=42%, IC Y=62% (dulu 50/60 → baris ke-2 nama BERTINDIH IC). Hanya nilai awal; tak ubah templat/laras master.
- IC `nowrap`: pelayar boleh patah IC di sempang `-`; master mahu IC satu baris. IC terlalu dekat tepi akan melimpah (sengaja).

**Keputusan master (jangan ubah tanpa tanya):**
- Jangan potong perkataan. Nama TANPA RUANG melimpah (diuji: nama 53 huruf → 158% lebar, bermula dari kiri kotak, bukan sama rata). Cadangan `overflow-wrap:anywhere` HANYA bila satu perkataan melebihi lebar — master jawab **"Tak perlu"** (2026-11-10).
- Nama 3 baris (83 aksara): jurang ke IC cuma 3px (tak bertindih, rapat); 4 baris bertindih. Master tak minta ubah; laras Y pada templat sebenar.

**Ujian & had:**
- Kiraan: `node --test tests/utils.test.mjs` (SEBUT fail; `tests/` sahaja ralat Node). Mutan formula (buang ruang tepi) → 3 ujian gagal. Tiada Playwright dalam repo.
- Disahkan di Chrome (pratonton + simulasi gaya cetak). **PDF cetak SEBENAR BELUM dilihat** (dialog cetak tak boleh dibuka dari extension).
- Ukur DOM cetak: salin peraturan `@media print` sebagai gaya skrin (`cssRules` silang-asal perlu `try/catch`); tanpa itu `.certificate-container` = static → ukuran 0%/100% PALSU.
- Pelayan ujian tempatan: skrip Node kecil (modul ES tak jalan dari `file://`); tutup ikut PID port — JANGAN `taskkill /IM node.exe` (mematikan semua Node, disekat).
- Dalam mod cetak `.certificate-container` 100%×100% & imej `object-fit:contain` → kalau nisbah halaman ≠ nisbah imej, Y% cetak boleh beza dari pratonton (kod upstream, belum diuji).

## Sejarah

- **2026-05-24** — Fork `Kiyoraka/Certificate-Generator` dibuat ke `syazwanbmw-dev` (masa tu untuk rujukan bina fitur Jana Sijil dalam `mypwa-v2` — lihat `sijil.html` di sana)
- **2026-09-27** — Master minta host **standalone**, berasingan sepenuhnya dari mypwa-v2. Clone local, enable GitHub Pages, deploy pertama berjaya

## Keputusan & Kenapa

- **Fork (bukan clone jadi repo baru)** — kekal `upstream` remote ke `Kiyoraka/Certificate-Generator`, senang `git fetch upstream` kalau nak tarik update/fix dari repo asal masa depan
- **Hosting: GitHub Pages, BUKAN Cloudflare** — arahan terus master ("deploy github.io je"). Projek 100% static (HTML/CSS/JS vanilla, tiada backend/DB), jadi Cloudflare Workers/D1/Hono memang tak perlu — overhead setup tanpa faedah
- **Tiada branch `test`/staging berasingan** — repo kecil, static, risiko rendah kalau silap push; `main` ialah production (deploy dicetus MANUAL, lihat Status)

## Gotcha

- 🔴 **Workflow `.github/workflows/static.yml` warisan dari upstream TAK auto-register** pada fork sehingga ada push pertama lepas GitHub Actions di-enable pada repo. Simptom: `gh workflow run` bagi `404 workflow not found` walaupun fail wujud dalam repo. Fix: push apa-apa commit dulu (untuk register workflow), lepas tu `gh workflow run static.yml` boleh jalan
- ⚠️ `curl` Windows kena `--ssl-no-revoke` untuk verify site (`schannel: CRYPT_E_NO_REVOCATION_CHECK`) — sama gotcha macam projek lain, lihat memory global `reference_curl_ssl_revoke`

## Struktur

```
index.html
assets/
├── css/style.css
└── js/
    ├── main.js
    ├── certificateGenerator.js
    ├── fileHandlers.js
    ├── namesManager.js
    ├── fontHandler.js
    └── utils.js
```

## Backlog — Belum Buat

- Lihat PDF cetak sebenar dengan nama panjang (belum disahkan).
