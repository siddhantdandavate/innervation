# Innervation IT Solutions — Static Website

A fully static, production-ready website built with **React**, **Vite**, **Tailwind CSS**, and **TypeScript**.  
No backend, no CMS, no database — just clean, fast, and deployable frontend code.

---

## 🚀 Quick Start

```bash
npm install
npm run dev        # Start dev server at http://localhost:8080
npm run build      # Build for production
npm run preview    # Preview production build
```

---

## 📁 Project Structure

```
src/
├── assets/              # Logo and brand assets
├── components/
│   ├── home/            # Homepage sections
│   ├── layout/          # Header, Footer, Layout
│   ├── services/        # Service page template
│   └── ui/              # shadcn/ui components
├── data/
│   ├── content.ts       # ⭐ All website text
│   └── blogs.ts         # ⭐ Blog posts
├── hooks/               # Theme, toast hooks
├── pages/               # All pages
│   └── services/        # Service sub-pages
└── App.tsx              # Router
```

---

## ✏️ Editing Content

All text is in **`src/data/content.ts`** — edit any section directly.

---

## 📝 Adding a Blog Post

1. Open `src/data/blogs.ts`
2. Add a new object to the array:

```typescript
{
  id: "blog-4",
  title: "Your Title",
  slug: "your-title",
  date: "2026-04-01",
  author: "Innervation IT Solutions",
  excerpt: "Short description",
  content: "<h2>Heading</h2><p>Content here (HTML supported)</p>",
  image: "/images/your-image.jpg"  // optional, place in public/images/
}
```

3. Done — no other changes needed.

---

## 🎨 Theme

Light/dark mode toggle in the header. Colors defined in `src/index.css`. Brand color: `#F59E0B`.

---

## 📄 Routes

| Route | Page |
|---|---|
| `/` | Home |
| `/about` | About |
| `/services` | Services |
| `/services/*` | Individual services |
| `/blog` | Blog listing |
| `/blog/:slug` | Blog post |
| `/contact` | Contact |

### Adding a Page

1. Create `src/pages/YourPage.tsx` with `<Layout>` wrapper
2. Add route in `src/App.tsx`
3. Add nav link in `src/components/layout/Header.tsx`

---

## 🌐 Deployment

### Hostinger
1. `npm run build`
2. Upload `dist/` to `public_html`
3. Add `.htaccess`:
```apache
RewriteEngine On
RewriteBase /
RewriteRule ^index\.html$ - [L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]
```

### Netlify / Vercel
- Build: `npm run build` → Output: `dist`
- SPA redirect: `/* /index.html 200`

---

© Innervation IT Solutions. All rights reserved.
