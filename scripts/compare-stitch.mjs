import { spawn } from 'node:child_process';
import { mkdir, copyFile } from 'node:fs/promises';
import { chromium } from 'playwright';

const ROOT = process.cwd();
const PORT = Number(process.env.PORT ?? '5183');
const BASE_URL = `http://localhost:${PORT}`;
const SKIP_DEV_SERVER = ['1', 'true', 'yes'].includes(String(process.env.SKIP_DEV_SERVER ?? '').toLowerCase());

const OUT_DIR = `${ROOT}/.codex-artifacts/stitch-compare`;
const REF_DIR = `${ROOT}/.codex-artifacts/stitch`;

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

  // Copy reference images for convenience (if they exist).
  await copyFile(`${REF_DIR}/ai-lab-index.png`, `${OUT_DIR}/ref-ai-lab-index.png`).catch(() => {});
  await copyFile(`${REF_DIR}/ai-lab-entry.png`, `${OUT_DIR}/ref-ai-lab-entry.png`).catch(() => {});

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
    const page = await browser.newPage({ viewport: { width: 390, height: 844 } });

    await page.goto(`${BASE_URL}/ai-lab`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(200);
    await page.screenshot({ path: `${OUT_DIR}/local-ai-lab-390w.png`, fullPage: true });

    await page.goto(`${BASE_URL}/ai-lab/designing-an-end-to-end-product-prototype-with-ai`, {
      waitUntil: 'networkidle',
    });
    await page.waitForTimeout(200);
    await page.screenshot({ path: `${OUT_DIR}/local-ai-lab-entry-390w.png`, fullPage: true });

    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(`${BASE_URL}/ai-lab`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(200);
    await page.screenshot({ path: `${OUT_DIR}/local-ai-lab-1440w.png`, fullPage: true });

    await page.goto(`${BASE_URL}/ai-lab/designing-an-end-to-end-product-prototype-with-ai`, {
      waitUntil: 'networkidle',
    });
    await page.waitForTimeout(200);
    await page.screenshot({ path: `${OUT_DIR}/local-ai-lab-entry-1440w.png`, fullPage: true });

    await browser.close();

    console.log(`Saved Stitch comparison screenshots to: ${OUT_DIR}`);
  } finally {
    dev?.kill('SIGINT');
  }
}

await main();
