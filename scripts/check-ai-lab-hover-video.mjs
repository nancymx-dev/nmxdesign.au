import { chromium } from 'playwright';

const PORT = Number(process.env.PORT ?? '5174');
const BASE_URL = `http://localhost:${PORT}`;
const TARGET = `${BASE_URL}/ai-lab`;

async function main() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  await page.goto(TARGET, { waitUntil: 'networkidle' });

  const card = page.locator('article').filter({ hasText: 'Designing an End-to-End Product Prototype' }).first();
  await card.waitFor({ state: 'visible' });

  const before = await page.evaluate(() => {
    const video = document.querySelector('video');
    if (!video) return { ok: false, reason: 'missing video element' };
    return { ok: true, currentTime: video.currentTime, readyState: video.readyState };
  });

  await card.hover();
  await page.waitForTimeout(900);

  const after = await page.evaluate(() => {
    const video = document.querySelector('video');
    if (!video) return { ok: false, reason: 'missing video element' };
    return { ok: true, currentTime: video.currentTime, paused: video.paused, readyState: video.readyState };
  });

  await page.screenshot({ path: '.codex-artifacts/ai-lab-filters/hover-video.png', fullPage: false });

  await browser.close();

  if (!before.ok) throw new Error(before.reason);
  if (!after.ok) throw new Error(after.reason);

  if (Number(after.currentTime) <= Number(before.currentTime)) {
    throw new Error(
      `Video did not advance on hover (before=${before.currentTime}, after=${after.currentTime}, paused=${after.paused})`,
    );
  }

  console.log(
    `Hover video OK: currentTime ${before.currentTime.toFixed(2)} -> ${after.currentTime.toFixed(2)} (paused=${after.paused}, readyState=${after.readyState})`,
  );
  console.log('Saved screenshot: .codex-artifacts/ai-lab-filters/hover-video.png');
}

await main();

