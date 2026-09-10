# Ismaili Scouts — ismailiscout.com

Static website for the Ismaili Scouts: introduction, history, activities gallery, books & resources, and a join/contact page.

No build step — plain HTML, CSS and JavaScript. Open `index.html` in a browser or serve the folder with any static host.

## Structure

```
index.html          Home
about.html          About & history (timeline, key figures)
activities.html     Photo gallery with filters + lightbox
books.html          Books & resources library
contact.html        Join / contact form
css/style.css       All styling (palette from the badge purple #6d1f9f)
js/main.js          Nav, scroll reveal, shared behaviour
js/gallery.js       Gallery renderer (reads data/activities.js)
js/books.js         Books renderer (reads data/books.js)
data/activities.js  <-- add photos here
data/books.js       <-- add books here
assets/activities/  put your photos here
assets/books/       put covers / PDFs here
icons/              badge.png (window icon / favicon source) and derived sizes
CNAME               custom domain for GitHub Pages
```

## Adding photos

1. Copy the image into `assets/activities/`.
2. Add an entry to `data/activities.js`:
   ```js
   { src: "assets/activities/winter-camp-2026.jpg", caption: "Winter camp, Gilgit",
     date: "January 2026", category: "camping" }
   ```
   Categories: `camping`, `service`, `ceremony`, `training`, `sports`, `culture`.
3. Commit and push.

## Adding books

Add an entry to `data/books.js` with `title`, `author`, `year`, `description`, optional `cover`,
`tags`, `links` (`[{ label, href }]`) and `status` (`"available"` or `"coming-soon"`).

## Deploying on GitHub Pages

1. Repo → Settings → Pages → Source: *Deploy from a branch* → `main` / `/ (root)`.
2. `CNAME` already contains `ismailiscout.com`. At your domain registrar add:
   - `A` records for `@` → `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - `CNAME` record for `www` → `ahtismaly.github.io`
3. Back in Settings → Pages, enter `ismailiscout.com` as the custom domain and enable *Enforce HTTPS*.

## Image credits

Sample photographs are from Wikimedia Commons (public domain or CC BY-SA) and are credited
in captions and the gallery viewer. Replace them with your own Ismaili Scouts photographs.
