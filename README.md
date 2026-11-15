# Orbix website

Run `npm run dev` for local development. Run `npm run build` to create the production site in `dist/`. The build renders the page content into HTML so visitors and search engines can read it before JavaScript loads.

If routes change in `src/site-content.js`, run `node scripts/generate-entries.mjs` to regenerate the route entry files.

Publish `dist/` at the site root. Serve directory index files for nested routes and configure the host to return `404.html` with HTTP status 404 for missing pages.

## Default URL and Search Console

- The production build uses the hosting provider’s default production URL on Vercel (when system environment variables are exposed) or Netlify. On other hosts, set `SITE_URL` to the provider’s public HTTPS origin before building. You can also set it in `.env.production.local` for a manual build. A local build without an origin omits canonical URLs and the sitemap.
- Check that the deployed `/sitemap.xml` and `/robots.txt` use the public production URL. The empty Updates page and the 404 page are excluded from the sitemap.
- In [Google Search Console](https://search.google.com/search-console), add a **URL prefix** property for the default production URL. To verify with an HTML tag, set `GOOGLE_SITE_VERIFICATION` to the tag's `content` value, then rebuild and deploy. The build adds the tag to the homepage.
- After verifying ownership, submit `sitemap.xml` under **Sitemaps** using [Google’s instructions](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap).

The privacy notice covers this public site. Confirm the production host’s logging and any host-injected scripts before publishing it. If the site later adds analytics, forms, or other data collection, update the notice.
