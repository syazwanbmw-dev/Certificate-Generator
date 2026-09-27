# MEMORY.md — Certificate Generator (standalone)

## STATUS SEMASA (2026-09-27)

- 🟢 **LIVE** — https://syazwanbmw-dev.github.io/Certificate-Generator/
- Deploy: GitHub Actions (`.github/workflows/static.yml`), auto-trigger setiap push ke `main`
- Tiada backlog aktif — site ikut spec asal upstream, tiada modifikasi kod dibuat lagi

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
