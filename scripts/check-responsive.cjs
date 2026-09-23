// Run with Playwright installed, or PLAYWRIGHT_MODULE pointing to its package.
// Screenshots are test output in the OS temp folder, never website assets.
const {chromium} = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const path = require('node:path');
const os = require('node:os');
const assert = require('node:assert/strict');
const base = process.env.PREVIEW_URL || 'http://127.0.0.1:4174';
(async () => {
  const browser = await chromium.launch({headless: true, channel: process.env.BROWSER_CHANNEL || 'msedge'});
  try {
    for (const width of (process.env.TEST_WIDTHS || '320,375,421,768,1024,1366,1440').split(',').map(Number)) {
      const context = await browser.newContext({viewport: {width, height: width < 700 ? 900 : 1024}, reducedMotion: 'reduce', isMobile: width < 700, hasTouch: width <= 1366});
      await context.addInitScript(() => localStorage.setItem('pcgenCookieOK', '1'));
      const page = await context.newPage();
      const errors = [];
      page.on('pageerror', error => errors.push(error.message));
      await page.goto(base + '/', {waitUntil: 'domcontentloaded'});
      await page.evaluate(async () => { await Promise.race([document.fonts.ready, new Promise(resolve => setTimeout(resolve, 5000))]); window.scrollTo(0, document.body.scrollHeight); });
      await page.waitForTimeout(600);
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForTimeout(300);
      console.log('HOME', width, await page.evaluate(() => ({width: innerWidth, scroll: document.documentElement.scrollWidth, height: document.body.scrollHeight, hero: document.querySelector('.home-hero').getBoundingClientRect().height, mobileFooter: getComputedStyle(document.querySelector('.mobile-footer')).display})));
      const home = await page.evaluate(() => ({width: innerWidth, scroll: document.documentElement.scrollWidth, mobile: getComputedStyle(document.querySelector('.mobile-footer')).display}));
      assert(home.scroll <= home.width, `Homepage overflow at ${width}`);
      assert.equal(home.mobile, width <= 1366 ? 'block' : 'none');
      const logos = await page.locator('.home-hero-logos img').evaluateAll(images => images.map(image => ({name: image.alt, width: image.getBoundingClientRect().width, height: image.getBoundingClientRect().height, loaded: image.complete && image.naturalWidth > 0})));
      assert.equal(logos.length, 6);
      for (const logo of logos) assert(logo.loaded && logo.width > 10 && logo.height > 5, `Visible partner logo: ${logo.name} at ${width}`);
      await page.screenshot({path: path.join(os.tmpdir(), `pcgen-home-${width}.png`), fullPage: true});
      await page.locator('.menu-toggle').click();
      await page.waitForTimeout(250);
      await page.screenshot({path: path.join(os.tmpdir(), `pcgen-menu-${width}.png`)});
      assert.equal(await page.locator('.menu-toggle').getAttribute('aria-expanded'), 'true');
      await page.locator('.menu-toggle').focus();
      await page.keyboard.press('Tab');
      assert(await page.locator('.main-nav').evaluate(menu => menu.contains(document.activeElement)), 'Menu traps keyboard focus');
      await page.keyboard.press('Escape');
      assert.equal(await page.locator('.menu-toggle').getAttribute('aria-expanded'), 'false');
      assert(await page.locator('.menu-toggle').evaluate(el => el === document.activeElement));
      await page.evaluate(() => window.scrollTo({top: 400, behavior: 'instant'}));
      await page.waitForTimeout(100);
      await page.locator('.menu-toggle').click();
      await page.waitForTimeout(350);
      if (width <= 1366) {
        const bounds = await page.locator('.main-nav').boundingBox();
        console.log('MENU', width, bounds, await page.evaluate(() => ({width: innerWidth, coarse: matchMedia('(pointer: coarse)').matches, query: matchMedia('(max-width: 1366px)').matches, mobile: getComputedStyle(document.querySelector('.mobile-footer')).display})));
        assert(Math.abs(bounds.y) < 1 && Math.abs(bounds.width - width) < 1, 'Mobile menu fills viewport after scrolling');
      }
      await page.keyboard.press('Escape');
      for (const route of ['/services/', '/about/', '/meet-the-team/', '/clients/', '/careers/', '/contact/']) {
        await page.goto(base + route, {waitUntil: 'domcontentloaded'});
        await page.waitForTimeout(200);
        const dimensions = await page.evaluate(() => ({width: innerWidth, scroll: document.documentElement.scrollWidth}));
        console.log(route, width, dimensions);
        assert(dimensions.scroll <= dimensions.width, `${route} overflow at ${width}`);
        if (route === '/services/') {
          await page.locator('[data-service-contact-open]').click();
          await page.locator('#service-tel').fill('abc+356 123-45');
          assert.equal(await page.locator('#service-tel').inputValue(), '+35612345');
          await page.locator('#service-message').fill('Testing layout only. No message is sent.');
          await page.locator('.service-contact-send').scrollIntoViewIfNeeded();
          assert(await page.locator('.service-contact-send').isVisible());
          await page.screenshot({path: path.join(os.tmpdir(), `pcgen-services-${width}.png`), fullPage: true});
          await page.keyboard.press('Escape');
          assert(await page.locator('#service-contact-dialog').isHidden());
        }
      }
      assert.deepEqual(errors, [], `No JavaScript errors at ${width}px`);
      await context.close();
    }
    console.log('PASS: responsive pages, six visible partner logos, menu focus/Escape, scrolled menu, and Services form. No enquiries sent.');
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exit(1); });
