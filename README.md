# Embeddable Numbr

A smart calculator that lives in a URL — works standalone and embeds in Notion, Coda, or any iframe host.

Built with [Tiptap](https://tiptap.dev), [@medv/numbr](https://github.com/antonmedv/numbr), and [lz-string](https://github.com/pieroxy/lz-string). Compatible with [numbr.dev](https://numbr.dev) URL hashes.

## Features

- **Plain-text calculator** — type natural-language math, see results alongside each line
- **URL = document** — every state is encoded in the URL hash; share by copying the address bar
- **Embeds anywhere** — no `X-Frame-Options` header; paste the URL into a Notion embed block
- **Offline-capable** — fully static, no backend

## Usage

Open the app and start typing:

```
rate = $150/hr
hours = 40

labor = rate * hours
materials = $500
total = labor + materials
```

Results appear in real time on the right. The URL updates automatically — copy it to share or bookmark.

## Embed in Notion

1. Open the app and type your calculation
2. Copy the URL from the address bar
3. In Notion: type `/embed`, paste the URL, press Enter
4. Resize the embed block as needed

## URL Compatibility

Existing numbr.dev links work by replacing the origin and keeping the hash:

```
https://schicks.github.io/embed-numbr/#<hash>
```

## Development

```bash
npm install
npm run dev
```

## Deploy

Pushes to `main` automatically deploy to GitHub Pages via the included workflow.
