# MEMORY.md — Certificate Generator (standalone)

## STATUS SEMASA (2026-09-27)

- 🟢 **LIVE** — https://syazwanbmw-dev.github.io/Certificate-Generator/
- Deploy: GitHub Actions (`.github/workflows/static.yml`), auto-trigger setiap push ke `main`
- 2026-09-28: commit `00a4692` redesign CSS sahaja (putih/emerald, Inter+Manrope; markup + JS tak diubah) — sebelum ini catatan ini salah kata "tiada modifikasi". Disahkan 2026-11-10: live HTTP 200.
- Nama fail sebenar JS huruf kecil (`filehandlers.js`, `fonthandler.js`) — senarai Struktur di bawah salah huruf besar.
- 2026-11-10: nama/IC/Extra patah baris ikut perkataan dalam sempadan sijil (LIVE 2026-11-10, commit 02a59ed). Lebar maks = 2×jarak ke tepi terdekat − 10% (min 10%), fungsi `maxTextWidthPercent` dalam utils.js, dipakai di pratonton (index.html) DAN cetak (certificateGenerator.js). KENAPA `width:max-content`: tanpa itu kotak absolute mengecut ke ruang di kanan `left`, jadi teks patah terlalu awal. Satu perkataan lebih panjang dari lebar maks akan melimpah (sengaja, master: jangan potong perkataan). Ujian: `node --test tests/utils.test.mjs` (SEBUT fail; `tests/` sahaja ralat). Belum diuji dalam app penuh + cetak PDF sebenar; line-height baris kedua longgar (diwarisi).
- 🔴 2026-11-10: push ke `main` TAK mencetus workflow (run lama pun `workflow_dispatch`). Selepas push WAJIB `gh workflow run static.yml -R syazwanbmw-dev/Certificate-Generator --ref main`. Juga: `gh` tanpa `-R` menyasar repo UPSTREAM (fork) — senarai run salah (Mei 2026).
- 2026-11-10 (BELUM push): IC TIDAK patah langsung (`white-space:nowrap`; param `wrap=false` dlm createOverlay + `.ic-overlay` CSS). Keputusan master: sebab pelayar boleh patah IC di sempang `-`. Akibat: IC pada X terlalu dekat tepi akan MELIMPAH (disahkan visual X=12%) — sengaja. Nama/Extra tanpa ruang juga melimpah; Extra boleh patah di sempang.
- 2026-11-10 (BELUM push): baris PERTAMA dikunci pada Y (`translateX(-50%)` + `margin-top:-0.6em` + `line-height:1.2`) — dulu `translate(-50%,-50%)` bikin teks 2 baris NAIK separuh jarak baris (~27px @34px) & line-height 1.6 diwarisi terlalu longgar. Baris tambahan turun ke bawah. Disahkan Chrome (pratonton + simulasi gaya cetak): baris pertama tepat 50% untuk nama 1 & 2 baris. TRADE-OFF: pada lalai nama Y=50% / IC Y=60%, baris ke-2 nama BERTINDIH IC (dilihat). Ujian layout cetak: salin peraturan @media print sebagai gaya skrin (cssRules silang-asal perlu try/catch); jangan ukur DOM cetak tanpa itu (container static → 0%/100% palsu). Pelayan ujian: skrip node kecil, tutup ikut PID (JANGAN taskkill /IM node.exe).
- Tiada backlog aktif

## Sejarah

- **2026-05-24** — Fork `Kiyoraka/Certificate-Generator` dibuat ke `syazwanbmw-dev` (masa tu untuk rujukan bina fitur Jana Sijil dalam `mypwa-v2` — lihat `sijil.html` di sana)
- **2026-09-27** — Master minta host **standalone**, berasingan sepenuhnya dari mypwa-v2. Clone local, enable GitHub Pages, deploy pertama berjaya

## Keputusan & Kenapa

- **Fork (bukan clone jadi repo baru)** — kekal `upstream` remote ke `Kiyoraka/Certificate-Generator`, senang `git fetch upstream` kalau nak tarik update/fix dari repo asal masa depan
- **Hosting: GitHub Pages, BUKAN Cloudflare** — arahan terus master ("deploy github.io je"). Projek 100% static (HTML/CSS/JS vanilla, tiada backend/DB), jadi Cloudflare Workers/D1/Hono memang tak perlu — overhead setup tanpa faedah
- **Tiada branch `test`/staging berasingan** — repo kecil, static, risiko rendah kalau silap push; `main` terus deploy

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

_Tiada. Belum ada permintaan modifikasi kod dari upstream._
