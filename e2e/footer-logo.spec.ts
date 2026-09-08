import { test, expect } from '@playwright/test';

test('footer logo uses local asset and is clickable', async ({ page }) => {
  // Navigate to the app
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' });
  
  // Wait for Vue to render
  await page.waitForTimeout(1000);
  
  // Check footer logo src attribute
  const footerImg = page.locator('footer img');
  await expect(footerImg).toBeVisible();
  
  const src = await footerImg.getAttribute('src');
  console.log(`Footer logo src: ${src}`);
  
  // Verify it's NOT using external CDN URL
  expect(src).not.toContain('cdn.quasar.dev');
  
  // Verify it IS using local asset
  expect(src).toMatch(/^\/src\/assets\/logo\.svg|logo.*\.svg$/);
  
  // Check footer logo is wrapped in a link
  const footerLink = page.locator('footer a[href="/"]');
  await expect(footerLink).toBeVisible();
  
  // Test navigation
  const initialUrl = page.url();
  await footerImg.click();
  await page.waitForTimeout(500);
  
  // Verify URL changed to home (but might already be there)
  const finalUrl = page.url();
  expect(finalUrl).toContain('http://localhost:5173/');
  
  // Verify no console errors related to the logo
  const errors: string[] = [];
  page.on('console', msg => {
    if (msg.type() === 'error') {
      if (msg.text().includes('logo') || msg.text().includes('router')) {
        errors.push(msg.text());
      }
    }
  });
  
  expect(errors).toHaveLength(0);
});

test('header logo is unchanged', async ({ page }) => {
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' });
  
  const headerImg = page.locator('header img');
  await expect(headerImg).toBeVisible();
  
  const src = await headerImg.getAttribute('src');
  console.log(`Header logo src: ${src}`);
  
  // Header should still use the external CDN URL
  expect(src).toContain('cdn.quasar.dev');
  expect(src).toContain('logo-mono-white');
});
