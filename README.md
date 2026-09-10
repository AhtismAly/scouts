# Ismaili Scouts — ismailiscout.com

Static website for the Ismaili Scouts: introduction, history, activities gallery, books & resources, and a join/contact page.

No build step — plain HTML, CSS and JavaScript in `public/`, hosted on Cloudflare Workers at ismailiscout.com.

## Structure

```
wrangler.jsonc             Cloudflare Workers config (static assets from public/)
public/
  index.html               Home
  about.html               About & history (timeline, key figures)
  activities.html          Photo gallery with filters + lightbox
  books.html               Books & resources library
  contact.html             Join / contact form
  404.html                 Not-found page
  css/style.css            All styling (palette from the badge purple #6d1f9f)
  js/main.js               Nav, scroll reveal, shared behaviour
  js/gallery.js            Gallery renderer (reads data/activities.js)
  js/books.js              Books renderer (reads data/books.js)
  data/activities.js       <-- add photos here
  data/books.js            <-- add books here
  assets/activities/       put your photos here
  assets/books/            put covers / PDFs here
  icons/                   badge.png (window icon / favicon source) and derived sizes
```

## Adding photos

1. Copy the image into `public/assets/activities/`.
2. Add an entry to `public/data/activities.js`:
   ```js
   { src: "assets/activities/winter-camp-2026.jpg", caption: "Winter camp, Gilgit",
     date: "January 2026", category: "camping" }
   ```
   Categories: `camping`, `service`, `ceremony`, `training`, `sports`, `culture`.
3. Commit and push.

## Adding books

Add an entry to `public/data/books.js` with `title`, `author`, `year`, `description`, optional `cover`,
`tags`, `links` (`[{ label, href }]`) and `status` (`"available"` or `"coming-soon"`).

## Hosting (Cloudflare Workers)

The site lives in `public/` and is served as static assets by a Cloudflare Worker
(`wrangler.jsonc`). Cloudflare's Git integration redeploys automatically on every push to `main`
(deploy command `npx wrangler deploy`, build command none).

Custom domain: Workers & Pages → scouts → **Domains** → add `ismailiscout.com` and `www.ismailiscout.com`.
Cloudflare creates the DNS records and certificate automatically.

Local preview: `npx wrangler dev` (or open `public/index.html` directly).

## Image credits

Sample photographs are from Wikimedia Commons (public domain or CC BY-SA) and are credited
in captions and the gallery viewer. Replace them with your own Ismaili Scouts photographs.
