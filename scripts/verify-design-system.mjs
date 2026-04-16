import { spawn } from 'node:child_process';
import { mkdir, writeFile } from 'node:fs/promises';
import { chromium } from 'playwright';

const ROOT = process.cwd();
const PORT = Number(process.env.PORT ?? '5182');
const BASE_URL = `http://localhost:${PORT}`;
const OUT_DIR = `${ROOT}/.codex-artifacts/design-system-verify`;
const SKIP_DEV_SERVER = ['1', 'true', 'yes'].includes(String(process.env.SKIP_DEV_SERVER ?? '').toLowerCase());

const expectedVars = {
  '--brand-sand': '#fff6ed',
  '--brand-purple': '#aaaadd',
  '--brand-green': '#184027',
  '--brand-orange': '#ed6b2e',
  '--brand-yellow': '#eff483',
};

const rgb = (r, g, b) => `rgb(${r}, ${g}, ${b})`;
const expectedSandRgb = rgb(255, 246, 237);
const forbiddenOffWhiteRgb = rgb(255, 251, 247); // #FFFBF7 (avoid drifting from sand)

function waitForServer(proc) {
  return new Promise((resolve, reject) => {
    let buffer = '';
    const onData = (data) => {
      buffer += String(data);
      if (buffer.includes(`http://localhost:${PORT}/`)) {
        cleanup();
        resolve();
      }
    };
    const onExit = (code) => {
      cleanup();
      reject(new Error(`Dev server exited early (code ${code ?? 'unknown'})`));
    };
    const cleanup = () => {
      proc.stdout?.off('data', onData);
      proc.stderr?.off('data', onData);
      proc.off('exit', onExit);
    };

    proc.on('exit', onExit);
    proc.stdout?.on('data', onData);
    proc.stderr?.on('data', onData);
  });
}

async function waitForExistingServer() {
  const url = `${BASE_URL}/`;
  const started = Date.now();
  while (Date.now() - started < 15000) {
    try {
      const res = await fetch(url);
      if (res.ok) return;
    } catch {
      // ignore
    }
    await new Promise((r) => setTimeout(r, 250));
  }
  throw new Error(`Timed out waiting for server at ${url}`);
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });

  const dev = SKIP_DEV_SERVER
    ? null
    : spawn('npm', ['run', 'dev', '--', '--port', String(PORT), '--strictPort'], {
        cwd: ROOT,
        env: { ...process.env, PORT: String(PORT) },
        stdio: ['ignore', 'pipe', 'pipe'],
      });

  try {
    if (dev) await waitForServer(dev);
    else await waitForExistingServer();

    const browser = await chromium.launch();
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

    const failures = [];
    const results = [];

    const check = async (name, path, selectors) => {
      await page.goto(`${BASE_URL}${path}`, { waitUntil: 'networkidle' });
      await page.waitForTimeout(150);

      // Root design tokens
      const vars = await page.evaluate((keys) => {
        const style = getComputedStyle(document.documentElement);
        const out = {};
        for (const key of keys) out[key] = style.getPropertyValue(key).trim().toLowerCase();
        return out;
      }, Object.keys(expectedVars));

      for (const [key, expected] of Object.entries(expectedVars)) {
        if ((vars[key] ?? '') !== expected) {
          failures.push(`${name}: ${key} expected ${expected} got ${(vars[key] ?? '').trim()}`);
        }
      }

      const bodyBg = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);
      if (bodyBg !== expectedSandRgb) {
        failures.push(`${name}: body background expected ${expectedSandRgb} got ${bodyBg}`);
      }

      const navBg = await page.evaluate(() => {
        const nav = document.querySelector('nav');
        return nav ? getComputedStyle(nav).backgroundColor : null;
      });
      if (navBg && navBg !== expectedSandRgb) {
        failures.push(`${name}: nav background expected ${expectedSandRgb} got ${navBg}`);
      }

      // Spot-check a few key elements that should be token-aligned
      for (const item of selectors) {
        const value = await page.evaluate((sel) => {
          const el = document.querySelector(sel);
          if (!el) return { ok: false, reason: 'missing' };
          const style = getComputedStyle(el);
          return {
            ok: true,
            color: style.color,
            backgroundColor: style.backgroundColor,
            fontFamily: style.fontFamily,
          };
        }, item.selector);

        if (!value.ok) {
          failures.push(`${name}: missing selector ${item.selector}`);
          continue;
        }

        if (value.backgroundColor === forbiddenOffWhiteRgb) {
          failures.push(
            `${name}: selector ${item.selector} background drifts to #FFFBF7 (${forbiddenOffWhiteRgb})`,
          );
        }

        if (item.expectColor && value.color !== item.expectColor) {
          failures.push(
            `${name}: selector ${item.selector} color expected ${item.expectColor} got ${value.color}`,
          );
        }

        if (item.expectFontIncludes) {
          const font = (value.fontFamily ?? '').toLowerCase();
          if (!font.includes(item.expectFontIncludes.toLowerCase())) {
            failures.push(
              `${name}: selector ${item.selector} font expected to include "${item.expectFontIncludes}" got ${value.fontFamily}`,
            );
          }
        }
      }

      const screenshotPath = `${OUT_DIR}/${name}.png`;
      await page.screenshot({ path: screenshotPath, fullPage: false });
      results.push({ name, url: `${BASE_URL}${path}`, screenshot: screenshotPath });
    };

    await check('home', '/', [
      { selector: 'nav' },
      { selector: 'body' },
    ]);

    await check('ai-lab', '/ai-lab', [
      { selector: 'h1', expectColor: rgb(24, 64, 39) },
      { selector: 'nav' },
      { selector: "div[aria-hidden='true']" },
    ]);

    await check(
      'ai-lab-entry',
      '/ai-lab/designing-an-end-to-end-product-prototype-with-ai',
      [{ selector: 'h1', expectColor: rgb(24, 64, 39) }, { selector: 'nav' }],
    );

    await browser.close();

    const report = {
      baseUrl: BASE_URL,
      port: PORT,
      expectedVars,
      expectedSandRgb,
      results,
      failures,
      ok: failures.length === 0,
    };
    await writeFile(`${OUT_DIR}/report.json`, JSON.stringify(report, null, 2), 'utf8');

    if (failures.length > 0) {
      console.error(`Design-system verification FAILED (${failures.length} issues):`);
      for (const failure of failures) console.error(`- ${failure}`);
      process.exitCode = 1;
      return;
    }

    console.log('Design-system verification passed.');
  } finally {
    dev?.kill('SIGINT');
  }
}

await main();
