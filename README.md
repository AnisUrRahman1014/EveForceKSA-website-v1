# EveForce — Create Organizer Account

React + TypeScript signup screen built with Vite, Ant Design, Axios, and React Router.

## Stack

- **React 18 + TypeScript** — via Vite
- **Ant Design (antd)** — form, inputs, select, checkbox, buttons
- **Axios** — API client with interceptors (`src/api/axiosClient.ts`)
- **React Router v6** — routing (`src/routes/AppRoutes.tsx`)
- **react-helmet-async** — per-page `<title>`/meta tags for SEO in a client-rendered app

## Getting started

```bash
npm install
cp .env.example .env   # set VITE_API_BASE_URL to your backend
npm run dev
```

Open http://localhost:5173

## Project structure

```
src/
  api/            axios instance + auth API calls
  components/
    Layout/       AuthLayout — navy brand panel + content slot
    SignupForm/    the organizer signup form
  pages/          route-level pages (CreateOrganizerAccount, SignIn)
  routes/         React Router route table
  types/          shared TS interfaces
public/
  robots.txt
  sitemap.xml
```

## Wiring up the backend

`src/api/auth.ts` posts to `POST {VITE_API_BASE_URL}/auth/organizer/signup`.
Update the endpoint path or payload shape there to match your real API.

## SEO notes (CSR limitations)

This is a client-side rendered React app (Vite), so search engines that don't
execute JavaScript will only see the shell HTML on first crawl. What's in
place to help:

- Unique `<title>` and meta description per route via `react-helmet-async`
- Open Graph / Twitter tags on the signup page
- `robots.txt` and `sitemap.xml` in `public/`
- Semantic headings (`<h1>`, `<h2>`), `alt`/`aria-label` on non-text visuals
- Descriptive `<link rel="canonical">` per page

If organic search ranking matters a lot for this page, the more robust fix is
prerendering or SSR (e.g. Next.js, or a prerender step like `vite-plugin-ssr`
or Prerender.io) — happy to set that up if you want it later. For a form that
mostly gets linked/clicked traffic rather than search traffic, the above is
usually enough.

## Build

```bash
npm run build
npm run preview
```
