import { chromium } from 'playwright';

const browser = await chromium.launch({ args: ['--no-sandbox'] });
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });

page.on('console', (msg) => console.log('[console]', msg.type(), msg.text()));
page.on('pageerror', (err) => console.log('[pageerror]', err.message));

await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' });
console.log('URL after nav:', page.url());
console.log('Title:', await page.title());

await page.screenshot({ path: '/workspace/wt/18e861a7/screenshots/full-page.png' });
console.log('body text snippet:', (await page.textContent('body'))?.slice(0, 500));

const footerCount = await page.locator('footer').count();
console.log('footer count:', footerCount);
if (footerCount > 0) {
  const footer = page.locator('footer').first();
  await footer.scrollIntoViewIfNeeded();
  await footer.screenshot({ path: '/workspace/wt/18e861a7/screenshots/footer.png' });
}

await browser.close();
console.log('done');
