# MySite - Static Website

A modern, responsive multi-page static website (Home, About, Services, Contact).

## Run locally

Use any static server. For example with Python:

```bash
python3 -m http.server 5173 --directory .
```

Then open `http://localhost:5173`.

## Deploy
- Upload the files to any static hosting (Netlify, Vercel, GitHub Pages, S3).
- Ensure root-relative links work. For GitHub Pages under a subpath, update links in HTML to be relative or set a base URL.

## Structure
```
/assets/css/styles.css
/assets/js/main.js
index.html
about.html
services.html
contact.html
```

## Features
- Responsive navbar with mobile menu
- Hero section and feature cards
- Contact form with client-side validation
- Modern dark theme styling

