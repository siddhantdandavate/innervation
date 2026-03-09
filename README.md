# Innervation IT Solutions — CMS Website

A production-ready, fully themeable, CMS-powered corporate website built with React, TypeScript, and Tailwind CSS. Designed for long-term self-hosting and easy manual modification.

------------------------------------------------------------------------

## Table of Contents

- [Architecture Overview](#architecture-overview)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Environment Configuration](#environment-configuration)
- [Project Structure](#project-structure)
- [CMS Usage Guide](#cms-usage-guide)
- [Theme System](#theme-system)
- [Adding New Pages](#adding-new-pages)
- [Adding New Routes](#adding-new-routes)
- [Extending Features](#extending-features)
- [Deployment & Self-Hosting](#deployment--self-hosting)
- [Backup & Restore](#backup--restore)
- [Maintenance Tips](#maintenance-tips)
- [Security](#security)

---

## Architecture Overview

```
┌──────────────────────────────────────────┐
│  Frontend (React + Vite + Tailwind)      │
│  ├── Public pages (/, /about, /services) │
│  ├── Blog pages (/blog, /blog/:slug)     │
│  └── Admin CMS (/admin/*)               │
├──────────────────────────────────────────┤
│  Backend (Supabase / Lovable Cloud)      │
│  ├── Database (PostgreSQL + RLS)         │
│  ├── Edge Function (cms-admin)           │
│  └── Storage (optional)                  │
└──────────────────────────────────────────┘
```

**Separation of Concerns:**

| Layer | Location | Purpose |
|-------|----------|---------|
| UI Components | `src/components/` | Presentational React components |
| CMS Logic | `src/lib/cms.ts` | API client for CMS operations |
| Theme System | `src/hooks/use-theme.tsx` + `src/index.css` | Global design tokens |
| Content Hook | `src/hooks/use-cms.tsx` | React context for CMS content |
| Edge Function | `supabase/functions/cms-admin/` | Server-side CMS operations |

---

## Tech Stack

| Technology | Purpose |
|-----------|---------|
| React 18 | UI framework |
| TypeScript | Type safety |
| Vite | Build tool + dev server |
| Tailwind CSS | Utility-first styling |
| shadcn/ui | Component library |
| React Router v6 | Client-side routing |
| TanStack Query | Data fetching + caching |
| Supabase | Database, auth, edge functions |

---

## Getting Started

### Prerequisites

- Node.js 18+ or Bun
- A Supabase project (or Lovable Cloud)

### Install & Run

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The app runs at `http://localhost:8080` by default.

### Build for Production

```bash
npm run build
# Output in /dist — deploy to any static host
```

---

## Environment Configuration

Create a `.env` file in the project root:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=your-anon-key
VITE_SUPABASE_PROJECT_ID=your-project-id
```

**Never expose the service role key in the frontend.** It's only used inside the edge function via `Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')`.

---

## Project Structure

```
src/
├── assets/              # Static images and media
├── components/
│   ├── home/            # Homepage section components
│   ├── layout/          # Header, Footer, Layout, ScrollToTop
│   ├── services/        # Service page template
│   ├── ui/              # shadcn/ui components (do not edit)
│   ├── CookieConsent.tsx
│   ├── Logo.tsx         # Theme-aware SVG logo
│   ├── NavLink.tsx
│   └── ThemeToggle.tsx
├── hooks/
│   ├── use-cms.tsx      # CMS content provider
│   ├── use-theme.tsx    # Theme provider + presets
│   └── use-mobile.tsx   # Mobile detection
├── lib/
│   ├── cms.ts           # CMS API client (public + admin)
│   └── utils.ts         # Utility functions
├── pages/
│   ├── admin/           # CMS admin pages
│   ├── services/        # Individual service pages
│   ├── Index.tsx        # Homepage
│   ├── About.tsx
│   ├── Blog.tsx
│   ├── BlogPost.tsx
│   ├── Contact.tsx
│   └── Services.tsx
├── integrations/
│   └── supabase/        # Auto-generated — DO NOT EDIT
├── App.tsx              # Routes + providers
├── main.tsx             # Entry point
└── index.css            # Design tokens + theme variables
```

---

## CMS Usage Guide

### Accessing the Admin Panel

1. Navigate to `/admin`
2. On first visit, set your admin password (min 8 characters)
3. Log in with your password

### Editing Content

1. Go to **Admin → Content**
2. Select any section (hero, services, about, etc.)
3. Edit text fields — every visible word on the website is editable
4. Click **Save** — changes appear immediately on the live site

### Managing Blogs

1. Go to **Admin → Blogs**
2. **Create**: Click "New Blog", fill in title/content/excerpt
3. **Edit**: Click any blog row to edit
4. **Bulk operations**: Select multiple blogs → Publish/Unpublish/Delete
5. **Restore deleted**: View trash to restore soft-deleted blogs
6. Slugs are auto-generated from titles

### Version History & Revert

1. Go to **Admin → History**
2. View all content/theme/blog changes with timestamps
3. Click **Revert** on any entry to restore that version
4. Previous state is preserved — you can always undo a revert

### Theme Management

1. Go to **Admin → Theme**
2. Choose from **preset themes** or create custom colors
3. Preview changes before applying
4. Save custom themes for reuse

---

## Theme System

All colors use CSS custom properties (HSL format) defined in `src/index.css`.

### How It Works

```
index.css (:root / .dark)
    ↓ CSS variables
tailwind.config.ts (maps vars to Tailwind classes)
    ↓ Tailwind classes
Components (use semantic tokens like bg-background, text-foreground)
```

### Core Tokens

| Token | Usage |
|-------|-------|
| `--background` / `--foreground` | Page background & text |
| `--card` / `--card-foreground` | Card surfaces |
| `--primary` / `--primary-foreground` | Primary actions |
| `--accent` / `--accent-foreground` | Accent elements (buttons, highlights) |
| `--muted` / `--muted-foreground` | Subtle backgrounds & secondary text |
| `--section-dark` / `--section-dark-foreground` | Dark sections (hero, footer, CTA) |
| `--brand-primary` / `--brand-secondary` | Logo & brand SVG colors |

### Adding a New Theme Preset

In `src/hooks/use-theme.tsx`, add to the `themePresets` array:

```typescript
{
  name: "My Custom Theme",
  category: "Modern",
  colors: {
    primary: "220 70% 50%",
    background: "0 0% 100%",
    foreground: "220 70% 10%",
    // ... all required tokens
  }
}
```

### Rules

- **Never use hardcoded colors** like `text-white`, `bg-black` in components
- Use `text-section-dark-foreground` instead of `text-white` in dark sections
- Use `bg-section-dark-foreground/10` instead of `bg-white/10`
- Logo SVG uses `hsl(var(--brand-primary))` — adapts automatically

---

## Adding New Pages

### 1. Create the Page Component

```tsx
// src/pages/NewPage.tsx
import Layout from "@/components/layout/Layout";

const NewPage = () => {
  return (
    <Layout>
      <section className="section-padding">
        <div className="container-narrow">
          <h1 className="text-4xl font-heading font-bold text-foreground mb-6">
            New Page Title
          </h1>
          <p className="text-muted-foreground">Page content here.</p>
        </div>
      </section>
    </Layout>
  );
};

export default NewPage;
```

### 2. Add the Route

In `src/App.tsx`:

```tsx
const NewPage = lazy(() => import("./pages/NewPage"));

// Inside <Routes>:
<Route path="/new-page" element={<NewPage />} />
```

### 3. Add Navigation Link (optional)

In `src/components/layout/Header.tsx`, add to `navLinks`:

```typescript
{ name: "New Page", href: "/new-page" },
```

---

## Adding New Routes

Routes are defined in `src/App.tsx` using React Router v6:

```tsx
// Lazy load for performance
const MyPage = lazy(() => import("./pages/MyPage"));

// Add inside <Routes>
<Route path="/my-route" element={<MyPage />} />

// Dynamic routes
<Route path="/items/:id" element={<ItemDetail />} />
```

---

## Extending Features

### Adding a New CMS-Editable Section

1. **Add default content** in the database (`cms_content` table) with a unique `section_key`
2. **Use the content hook** in your component:

```tsx
import { useCMS } from "@/hooks/use-cms";

const MySection = () => {
  const { getContent } = useCMS();
  const content = getContent("my-section-key");

  return <h2>{content?.title as string || "Default Title"}</h2>;
};
```

3. The section is now editable from **Admin → Content**

### Adding a New Database Table

1. Create a migration via SQL
2. Always enable RLS and add appropriate policies
3. Use the Supabase client for typed queries

### Adding an Edge Function

1. Create `supabase/functions/my-function/index.ts`
2. Include CORS headers for browser access
3. Use `Deno.env.get()` for secrets (never `import.meta.env`)

---

## Deployment & Self-Hosting

### Option 1: Static Hosting (Recommended)

```bash
npm run build
# Deploy /dist to: Netlify, Vercel, Cloudflare Pages, nginx, Apache
```

**Nginx example:**

```nginx
server {
    listen 80;
    root /var/www/innervation/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff2?)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

### Option 2: Docker

```dockerfile
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
```

### Backend

For self-hosting the backend, use [Supabase self-hosted](https://supabase.com/docs/guides/self-hosting) with Docker, or continue using a managed Supabase instance.

---

## Backup & Restore

### Database Backup

```sql
SELECT * FROM cms_content;
SELECT * FROM cms_theme;
SELECT * FROM cms_blogs WHERE is_deleted = false;
```

### Restore Content

Insert exported data back into the respective tables. The `cms_history` table tracks all changes — use the admin panel's **Revert** feature to undo any change.

### Code Backup

```bash
git add -A && git commit -m "backup"
```

---

## Maintenance Tips

1. **Update dependencies** quarterly: `npm update` then test thoroughly
2. **Monitor performance**: Run Lighthouse/PageSpeed periodically
3. **Review security**: Check RLS policies when adding new tables
4. **Content backups**: Export `cms_content` table monthly
5. **Theme changes**: Always test in both light and dark modes
6. **Code changes**: Follow the existing pattern — semantic tokens, no hardcoded colors
7. **Edge functions**: Test locally before deploying to production

---

## Security

### Implemented Measures

- **PBKDF2 password hashing** (100k iterations, random salt)
- **Server-side session management** with token hashing
- **Rate limiting** on login (5 attempts / 15 minutes)
- **Input validation** (type + length checks on all inputs)
- **HTML sanitization** (allowlist-based, blocks all XSS vectors)
- **Row Level Security** on all database tables
- **No sensitive data in frontend** code
- **CORS headers** on all edge function responses

### Security Checklist for Modifications

- [ ] New tables have RLS enabled
- [ ] SELECT policies don't expose PII
- [ ] User inputs are validated before database writes
- [ ] No `dangerouslySetInnerHTML` with user content
- [ ] API keys stored as secrets, never in code
- [ ] Edge functions validate authentication tokens

---

*© Innervation IT Solutions. All rights reserved.*
