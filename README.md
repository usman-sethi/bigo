# Big O Notation: interactive presentation

Next.js (App Router), TypeScript, Tailwind CSS v4, Framer Motion.

    npm install
    npm run dev        # http://localhost:3000
    npm run build && npm start

Keys: ← → / Space / PageUp / PageDown move, Home / End jump, F toggles full screen. The URL hash (for example #5) remembers the slide.

Edit slides in `components/presentation/slides.tsx`, complexity data in `lib/complexity.ts` and colours in `app/globals.css`.
Set `NEXT_PUBLIC_SITE_URL` to the deployed site's full origin (for example, `https://example.com`)
before building. This configures the canonical URL, Open Graph URL, robots sitemap reference and
sitemap entry. Without it, the app omits the canonical and sitemap URLs; Next.js may use localhost
as the base for the generated social preview image, so configure this variable for production.
After deployment, verify the site in Google Search Console and submit `/sitemap.xml` to request
crawling. Search ranking and timing depend on search engines and cannot be guaranteed by metadata alone.
