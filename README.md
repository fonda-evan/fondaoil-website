# Fonda Oil / 峰达石油 — Corporate Website

Promotional website for Fonda Oil Petroleum Equipment Co., Ltd., featuring 24 products across 3 categories.

**Live Preview:** Open `index.html` or run a local server.

---

## Quick Start (Local)

```bash
cd website
python -m http.server 8080
# Visit: http://localhost:8080
```

---

## Deploy to GitHub Pages

### Step 1: Create a GitHub repository
Go to [github.com/new](https://github.com/new) and create a new repository (e.g., `fondaoil-website`).

### Step 2: Push the code

```bash
cd website
git init
git add .
git commit -m "Initial website — 24 products, 3 languages"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/fondaoil-website.git
git push -u origin main
```

### Step 3: Enable GitHub Pages
1. Go to your repository on GitHub → **Settings** → **Pages**
2. Under "Build and deployment":
   - **Source:** Deploy from a branch
   - **Branch:** `main`, folder: `/ (root)`
   - Click **Save**
3. Wait 1–2 minutes. Your site will be live at:
   `https://YOUR_USERNAME.github.io/fondaoil-website/`

### Custom Domain (Optional)
1. Settings → Pages → Custom domain → enter your domain (e.g., `fondaoil.com`)
2. Add a CNAME record at your DNS provider pointing to `YOUR_USERNAME.github.io`
3. Check "Enforce HTTPS"

---

## File Structure

```
website/
├── index.html              # Homepage
├── products.html           # Product listing (24 products)
├── product-detail.html     # Product detail page (dynamic, URL param ?id=)
├── cases.html              # Case studies (3 cases)
├── about.html              # Company profile, timeline, certifications
├── contact.html            # Contact form & info
├── css/
│   └── style.css           # Design system (1474 lines)
├── js/
│   ├── main.js             # Navigation, filter, form, counters
│   ├── i18n.js             # Language engine (zh/en/ru)
│   └── i18n-data.js        # Translation dictionary
└── images/
    └── products/           # 24 product PNG images
```

## Languages

The site supports **Chinese (zh)**, **English (en)**, and **Russian (ru)**.

- Language preference is saved to localStorage
- Falls back to browser language detection
- Click the globe icon in the navigation bar to switch

### Editing Translations
All translations are in `js/i18n-data.js`. Edit the `en` and `ru` values as needed.

## Product Categories

| Category | Product Count |
|----------|--------------|
| Wellhead Tools & Devices | 8 |
| Drilling & Boring Equipment | 11 |
| Safety & Emergency Devices | 5 |

## Tech Stack

- Pure HTML5 / CSS3 / Vanilla JavaScript
- No frameworks, no build tools, no dependencies
- CSS Grid + Flexbox responsive layout
- PNG product images (generated via AI: Midjourney/SD)
