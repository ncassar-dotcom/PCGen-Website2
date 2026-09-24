// Read-only navigation checks. Never submits credentials or changes account data.
const {chromium} = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const assert = require('node:assert/strict');
(async () => {
  const browser = await chromium.launch({headless: true, channel: process.env.BROWSER_CHANNEL || 'msedge'});
  try {
    for (const width of [375, 1440]) {
      const context = await browser.newContext({viewport: {width, height: 900}, reducedMotion: 'reduce'});
      await context.addInitScript(() => localStorage.setItem('pcgenCookieOK', '1'));
      const page = await context.newPage();
      const errors = [];
      page.on('pageerror', error => errors.push(error.message));
      await page.goto('http://127.0.0.1:4174/', {waitUntil: 'domcontentloaded'});
      const footerLinks = page.locator('.footer-directory a[href$="/client-login/"], .footer-directory a[href$="/client-admin/"]');
      assert.equal(await footerLinks.count(), 2);
      for (const link of await footerLinks.all()) assert(await link.isVisible());
      assert.equal(await page.locator('.client-access-link').isVisible(), width > 1366);
      await page.locator('.menu-toggle').click();
      await page.locator('.main-nav-access a', {hasText: 'Client Access'}).click();
      await page.waitForURL('**/client-login/');
      await page.locator('[data-client-login]').waitFor({state: 'visible'});
      assert(await page.locator('[data-admin-login]').isVisible());
      assert.equal(await page.locator('[data-login-message]').count(), 1);
      assert.equal(await page.locator('meta[name="robots"]').getAttribute('content'), 'noindex, nofollow');
      await page.locator('.footer-directory a', {hasText: 'Web Admin'}).click();
      await page.waitForURL('**/client-admin/');
      await page.locator('[data-admin-login]').waitFor({state: 'visible'});
      assert.equal(await page.locator('meta[name="robots"]').getAttribute('content'), 'noindex, nofollow');
      await page.waitForTimeout(400);
      const dimensions = await page.evaluate(() => ({width: innerWidth, content: document.documentElement.scrollWidth}));
      if (dimensions.content > dimensions.width) console.log(dimensions, await page.evaluate(() => [...document.querySelectorAll('body *')].filter(el => el.scrollWidth > el.clientWidth + 2 && getComputedStyle(el).overflowX === 'visible').slice(0, 16).map(el => ({tag: el.tagName, cls: el.className, width: el.clientWidth, scroll: el.scrollWidth, before: getComputedStyle(el, '::before').content, after: getComputedStyle(el, '::after').content}))));
      assert(dimensions.content <= dimensions.width, 'Access page has no horizontal overflow');
      assert.deepEqual(errors, []);
      console.log(`PASS ${width}px: menu/footer access links, client form, admin form, noindex and page layout. No login attempted.`);
      await context.close();
    }
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exit(1); });
