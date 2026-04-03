# Apke Tuitions Client

This frontend now runs on Next.js App Router.

## Scripts

- `npm run dev` starts the local Next development server
- `npm run build` creates the production build
- `npm run start` runs the built app
- `npm run lint` runs ESLint

## Environment

Create a local `.env` file with:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

For production, set `NEXT_PUBLIC_API_URL` in Vercel.

## SEO Setup Included

- App Router metadata in `app/layout.jsx` and route `page.jsx` files
- Generated `robots.txt` via `app/robots.js`
- Generated `sitemap.xml` via `app/sitemap.js`
- Open Graph image at `public/og-image.png`
- FAQ schema on the homepage
- Static locality and subject landing pages for Hyderabad SEO

## Deployment Notes

- Deploy the frontend to Vercel
- Set the production environment variable `NEXT_PUBLIC_API_URL`
- Connect the custom domain `apketuitions.com`
- Submit `https://apketuitions.com/sitemap.xml` in Google Search Console
