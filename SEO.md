# Website 2 search setup

## Source and regeneration

`seo.config.json` holds the canonical domain, unique titles and descriptions. The owner selected `https://pcgen.mt/` for the replacement site's launch. `indexingEnabled` is currently `false` so the preview is not indexed as a competing copy. At production launch, set it to `true`, regenerate, then deploy the resulting files to pcgen.mt. Never deploy the staging build to production and leave it noindex.

Run `node scripts/build-seo.cjs` after changes to page content in `assets/app.js`, SEO configuration or the public domain. Commit the resulting HTML, sitemap and robots file alongside the source changes. The generator preserves stylesheets and page-specific assets, refreshes the JavaScript version, and pre-renders the eight public marketing pages using the same templates used by the browser. Do not edit generated page bodies directly.

Public content is available in the initial HTML, not a separate crawler-only version. JavaScript attaches existing controls without discarding that content or preloading the entire site first. Login/admin pages are not pre-rendered and carry `noindex, nofollow`; this does not replace authentication.

Job detail pages have unique metadata but are not in the sitemap because their content depends on the site's vacancy API. Verify public job availability on the production host before adding them or JobPosting structured data. No reviews, ratings, certifications, coordinates or prices have been invented.

## Before requesting indexing

1. At the pcgen.mt cutover, set `indexingEnabled` to `true`, run the generator, and verify public pages say `index, follow`. Keep any retained GitHub preview on its separate noindex build. Avoid indexing both sites as competing copies.
2. Publish these changes to the intended domain. A local preview cannot be indexed by Google.
3. Verify the production URL-prefix property in Google Search Console, using the account owner’s verification token. Submit the sitemap URL and inspect the homepage and Services page. Do not add a made-up verification token.
4. Test the published pages with Google's Rich Results Test and PageSpeed Insights. Check mobile layout, image/video transfer sizes and Core Web Vitals. Structured data is eligibility information, not a promise of enhanced results.
5. Keep the Google Business Profile name, address, hours, phone and website consistent with the site. Confirm the existing business details before publishing. Encourage genuine customer reviews, useful local mentions and links; do not buy links or manufacture reviews.
6. Publish useful service explanations and customer case studies with permission. Use the target phrases naturally; `meta keywords` does not improve Google rankings.
7. Review Search Console queries, clicks and indexed pages after launch; ranking changes are not instant and no position is guaranteed.

## GitHub project-site robots limitation

Google reads robots.txt at the host root, not inside `/PCGen-Website2/`. The robots.txt in this repository becomes effective when deployed at `https://pcgen.mt/robots.txt`. After launch, submit `https://pcgen.mt/sitemap.xml` in Search Console. Do not submit the GitHub preview. Page-level noindex tags protect the preview even though its robots.txt is in a project subfolder. This change does not modify another repository, the live pcgen.mt site or the Search Console account.

## Official references

- https://developers.google.com/search/docs/essentials
- https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics
- https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap
- https://developers.google.com/search/docs/crawling-indexing/special-tags
- https://developers.google.com/search/docs/appearance/structured-data/local-business
