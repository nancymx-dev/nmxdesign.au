import { existsSync } from 'node:fs';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const username = 'nancymx-dev';
const profileUrl = `https://github.com/${username}`;
const contributionsUrl = `https://github.com/users/${username}/contributions`;
const daysToKeep = 180;

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, '..');
const outputPath = path.join(repoRoot, 'public', 'github-contributions.json');

function parseContributionCount(tooltipText) {
  const match = tooltipText.match(/(No|\d+) contribution/);

  if (!match) {
    return 0;
  }

  return match[1] === 'No' ? 0 : Number(match[1]);
}

function parseContributions(html) {
  const cells = [...html.matchAll(/<td[^>]*data-date="([^"]+)"[^>]*data-level="(\d)"[^>]*>/g)].map(
    (match) => ({
      date: match[1],
      level: Number(match[2]),
    }),
  );

  const tooltips = [...html.matchAll(/<tool-tip[^>]*>([^<]+)<\/tool-tip>/g)].map(
    (match) => match[1],
  );

  if (cells.length === 0) {
    throw new Error('No contribution calendar cells were found in the GitHub response.');
  }

  return cells
    .map((cell, index) => ({
      ...cell,
      count: parseContributionCount(tooltips[index] ?? ''),
    }))
    .sort((a, b) => a.date.localeCompare(b.date));
}

function buildSnapshot(days) {
  const recentDays = days.slice(-daysToKeep);
  const yearContributions = days.reduce((total, day) => total + day.count, 0);
  const totalContributions = recentDays.reduce((total, day) => total + day.count, 0);

  return {
    days: recentDays,
    daysToKeep,
    generatedAt: new Date().toISOString(),
    profileUrl,
    totalContributions,
    username,
    yearContributions,
  };
}

async function readExistingSnapshot() {
  if (!existsSync(outputPath)) {
    return null;
  }

  return JSON.parse(await readFile(outputPath, 'utf8'));
}

async function writeSnapshot(snapshot) {
  await mkdir(path.dirname(outputPath), { recursive: true });
  await writeFile(outputPath, `${JSON.stringify(snapshot, null, 2)}\n`);
}

async function main() {
  try {
    const response = await fetch(contributionsUrl, {
      headers: {
        'User-Agent': 'nmxdesign.au contribution updater',
      },
    });

    if (!response.ok) {
      throw new Error(`GitHub returned ${response.status} ${response.statusText}.`);
    }

    const html = await response.text();
    const snapshot = buildSnapshot(parseContributions(html));
    await writeSnapshot(snapshot);

    console.log(
      `Updated ${path.relative(repoRoot, outputPath)} with ${snapshot.totalContributions} contributions in the last ${snapshot.days.length} days.`,
    );
  } catch (error) {
    const existingSnapshot = await readExistingSnapshot();

    if (existingSnapshot) {
      console.warn(
        `Could not refresh GitHub contributions, keeping existing ${path.relative(
          repoRoot,
          outputPath,
        )}: ${error.message}`,
      );
      return;
    }

    throw error;
  }
}

await main();
