import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawn } from 'node:child_process';
import { chromium } from 'playwright';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');
const distDir = path.join(projectRoot, 'dist');
const previewPort = Number(process.env.PRERENDER_PORT || 4173);
const previewHost = '127.0.0.1';
const previewOrigin = `http://${previewHost}:${previewPort}`;
const publicRoutes = [
  '/',
  '/sluzby',
  '/blog',
  '/nasi-kone',
  '/o-nas',
  '/kontakt',
  '/ochrana-osobnich-udaju',
  '/cookies',
  '/obchodni-podminky',
  '/reklamacni-rad',
];

function normalizeBasePath(basePath) {
  if (!basePath || basePath === '/') {
    return '/';
  }

  return `/${basePath.replace(/^\/+|\/+$/g, '')}/`;
}

function joinUrlPath(basePath, routePath) {
  const normalizedBase = normalizeBasePath(basePath);

  if (routePath === '/') {
    return normalizedBase;
  }

  return `${normalizedBase}${routePath.replace(/^\/+/, '')}`;
}

async function waitForServer(url, attempts = 60) {
  for (let index = 0; index < attempts; index += 1) {
    try {
      const response = await fetch(url);
      if (response.ok) {
        return;
      }
    } catch {
      // Wait for preview server to start.
    }

    await new Promise((resolve) => setTimeout(resolve, 500));
  }

  throw new Error(`Preview server na ${url} se nepodařilo spustit včas.`);
}

function getOutputPath(routePath) {
  if (routePath === '/') {
    return path.join(distDir, 'index.html');
  }

  return path.join(distDir, routePath.replace(/^\/+/, ''), 'index.html');
}

async function prerenderRoute(browser, routePath, basePath) {
  const page = await browser.newPage();
  const routeUrl = new URL(joinUrlPath(basePath, routePath), previewOrigin).toString();

  try {
    await page.goto(routeUrl, { waitUntil: 'networkidle' });
    await page.waitForFunction(() => document.body.dataset.routeReady === 'true');
    await page.waitForTimeout(250);

    const html = await page.content();
    const outputPath = getOutputPath(routePath);

    await mkdir(path.dirname(outputPath), { recursive: true });
    await writeFile(outputPath, html, 'utf8');
  } finally {
    await page.close();
  }
}

async function main() {
  const basePath = normalizeBasePath(process.env.VITE_BASE_PATH || '/');
  const previewPath = joinUrlPath(basePath, '/');
  const previewServer = spawn(
    process.platform === 'win32' ? 'npx.cmd' : 'npx',
    ['vite', 'preview', '--host', previewHost, '--port', String(previewPort), '--strictPort'],
    {
      cwd: projectRoot,
      stdio: 'inherit',
      env: process.env,
    }
  );

  try {
    await waitForServer(new URL(previewPath, previewOrigin).toString());

    const browser = await chromium.launch({ headless: true });

    try {
      for (const routePath of publicRoutes) {
        await prerenderRoute(browser, routePath, basePath);
      }
    } finally {
      await browser.close();
    }
  } finally {
    previewServer.kill('SIGTERM');
    await new Promise((resolve) => {
      previewServer.once('exit', () => resolve(undefined));
      setTimeout(() => resolve(undefined), 5000);
    });
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
