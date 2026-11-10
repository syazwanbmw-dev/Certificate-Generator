# CLAUDE.md — Certificate Generator (standalone)

## Projek

Fork daripada [Kiyoraka/Certificate-Generator](https://github.com/Kiyoraka/Certificate-Generator) — tool jana sijil pukal, 100% client-side (tiada backend/database).

Sebelum ni versi serupa (`sijil.html`) pernah dimasukkan dalam `mypwa-v2` (dengan backend search murid). Projek ni **standalone**, berasingan, tiada kaitan dengan mypwa-v2.

## Stack

- Pure HTML5 + CSS3 + Vanilla JS (ES6 modules) — **tiada backend, tiada database**
- Hosting: **GitHub Pages** (bukan Cloudflare — tak perlu Workers/D1 untuk static site)
- Repo: https://github.com/syazwanbmw-dev/Certificate-Generator

## Deploy

Deploy via GitHub Actions (`.github/workflows/static.yml`). **Push ke `main` TAK mencetus workflow** — kena cetus manual selepas push:

```
git push origin main
gh workflow run static.yml -R syazwanbmw-dev/Certificate-Generator --ref main
```

Sentiasa guna `-R` (repo ni fork; `gh` tanpa `-R` menyasar repo upstream Kiyoraka). Tunggu ±20s lalu sahkan dengan `curl --ssl-no-revoke` pada fail yang baru diubah.

Ujian: `node --test tests/utils.test.mjs` (sebut fail, bukan folder).

Live di: **https://syazwanbmw-dev.github.io/Certificate-Generator/**

Tiada branch `test`/staging berasingan — repo ni kecil & static, `main` terus deploy.

## File Structure

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

## Pantang Larang

- Jangan suggest TypeScript
- Jangan install package baru tanpa bagitahu master
- Jangan restructure folder tanpa tanya dulu
- Jangan delete fail tanpa confirm dulu

## Nota

- `upstream` remote = `Kiyoraka/Certificate-Generator` — boleh `git fetch upstream` kalau nak tarik update dari repo asal.
