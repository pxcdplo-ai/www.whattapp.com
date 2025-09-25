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


## Customize
- Replace business name: find "YourBusiness" in `index.html`, `about.html`, `services.html`, `contact.html`.
- Update WhatsApp number: search `923001234567` and replace with yours (without +, country code first).
- Update email and address on `contact.html`.
- Replace logo at `/assets/img/logo.svg` with your own (same filename) or update the <img> paths.

## SEO
- Update meta description and Open Graph tags in `index.html`.
- Update JSON-LD business info (name, url, phone, address).
