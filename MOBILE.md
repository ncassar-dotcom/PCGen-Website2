# Mobile and tablet edition

The responsive edition uses the existing Website 2 pages and canonical URLs. There is no device redirect, duplicated mobile site or user-agent detection. `assets/mobile.css` loads after the page's other styles and applies up to 1366 CSS pixels, including large tablets in landscape and narrow desktop windows. Larger desktop layouts retain the existing design. A width-based breakpoint keeps the layout stable when switching between touch, keyboard and mouse.

The supplied landing/menu references guide the stacked brand mark, hero, orange outline artwork, six-partner grid, two action tiles, centered introduction, metrics, client carousel, compact footer and full-screen menu. The second action remains **Get in Touch**, and the existing **16+** experience figure is retained. Home-page benefit cards and the extra services list are omitted from the compact layout; services remain available from the action tile and menu. Other pages retain their content with responsive layouts and the shared mobile header, menu and footer.

The menu supports touch, keyboard focus containment and Escape, and prevents interaction with the underlying page while open. Reduced-motion preferences disable the mobile menu and client-carousel animations. Contact fields and SEND behavior are unchanged: SEND opens a prepared enquiry in the visitor's email application, not a server-side submission.

## Build and verify

The footer now uses the WISECP-inspired directory layout in `assets/footer.css`, loaded after the mobile styles on every page. It shows a brand/contact column, Services, Company, Support & Account, and a legal strip. Below 1051px it stacks the brand above three groups; below 601px the groups use two columns. Client Access and Web Admin remain visible at every size.

- Edit shared markup/content in `assets/app.js`, responsive styles in `assets/mobile.css`.
- Run `node scripts/build-seo.cjs` to refresh the public HTML and cache versions on all 13 pages.
- Run `node scripts/check-seo.cjs` and `node scripts/check-service-motion.cjs`.
- With Playwright available, run `node scripts/check-responsive.cjs` against the local server on port 4174. Set `PLAYWRIGHT_MODULE` to the package path when using a bundled runtime, and `BROWSER_CHANNEL` to an installed Chromium browser (default `msedge`). Screenshots go to the operating system temporary directory. `TEST_WIDTHS` and `PREVIEW_URL` optionally override widths and server address.

Keep the SEO preview's `noindex` setting until the production pcgen.mt launch, as documented in SEO.md.
