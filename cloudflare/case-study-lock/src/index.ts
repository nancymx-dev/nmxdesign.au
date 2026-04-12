interface Env {
  CASE_STUDY_PASSWORD: string;
  COOKIE_SECRET: string;
  ORIGIN_HOST: string;
  PROTECTED_PREFIXES?: string;
  COOKIE_NAME?: string;
  SESSION_TTL_SECONDS?: string;
}

const DEFAULT_COOKIE_NAME = 'nmx_case_study_auth';
const DEFAULT_SESSION_TTL_SECONDS = 60 * 60 * 24 * 30;
const AUTH_PATH = '/_case-study-auth';
const LOGOUT_PATH = '/_case-study-logout';
const DEFAULT_PROTECTED_PREFIXES = [
  '/case-studies',
  '/case-study',
  '/portfolio',
  '/uplinked/',
  '/jiraplaybook/',
  '/perftooldesigns/',
];

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === AUTH_PATH) {
      if (request.method === 'POST') {
        return handlePasswordSubmit(request, env);
      }

      return renderPasswordPage({
        redirectTo: sanitizeRedirect(url.searchParams.get('redirect')),
      });
    }

    if (url.pathname === LOGOUT_PATH) {
      return handleLogout(request, env);
    }

    const protectedPrefixes = getProtectedPrefixes(env);
    const isProtected = isProtectedPath(url.pathname, protectedPrefixes);

    if (!isProtected) {
      return proxyToOrigin(request, env);
    }

    const isAuthed = await hasValidSession(request, env);
    if (isAuthed) {
      return proxyToOrigin(request, env);
    }

    if (expectsHtml(request)) {
      return renderPasswordPage({
        redirectTo: sanitizeRedirect(`${url.pathname}${url.search}`),
      });
    }

    return new Response('Password required.', {
      status: 401,
      headers: {
        'Cache-Control': 'private, no-store',
        'Content-Type': 'text/plain; charset=utf-8',
      },
    });
  },
};

async function handlePasswordSubmit(request: Request, env: Env): Promise<Response> {
  const formData = await request.formData();
  const password = String(formData.get('password') ?? '');
  const redirectTo = sanitizeRedirect(String(formData.get('redirect') ?? '/case-studies'));

  if (password !== env.CASE_STUDY_PASSWORD) {
    return renderPasswordPage({
      errorMessage: 'Incorrect password. Please try again.',
      redirectTo,
      status: 401,
    });
  }

  const maxAge = getSessionTtlSeconds(env);
  const expiresAt = Math.floor(Date.now() / 1000) + maxAge;
  const sessionValue = await signSession(expiresAt, env);

  return new Response(null, {
    status: 302,
    headers: {
      Location: redirectTo,
      'Cache-Control': 'private, no-store',
      'Set-Cookie': buildSessionCookie(env, sessionValue, maxAge),
    },
  });
}

async function handleLogout(request: Request, env: Env): Promise<Response> {
  const url = new URL(request.url);
  const redirectTo = sanitizeRedirect(url.searchParams.get('redirect')) || '/';

  return new Response(null, {
    status: 302,
    headers: {
      Location: redirectTo,
      'Cache-Control': 'private, no-store',
      'Set-Cookie': buildExpiredCookie(env),
    },
  });
}

async function hasValidSession(request: Request, env: Env): Promise<boolean> {
  const cookieValue = getCookie(request.headers.get('Cookie'), getCookieName(env));
  if (!cookieValue) {
    return false;
  }

  const [expiresAtRaw, providedSignature] = cookieValue.split('.');
  const expiresAt = Number(expiresAtRaw);

  if (!expiresAt || !providedSignature || !Number.isFinite(expiresAt)) {
    return false;
  }

  if (expiresAt <= Math.floor(Date.now() / 1000)) {
    return false;
  }

  const expectedValue = await signSession(expiresAt, env);
  return expectedValue === cookieValue;
}

async function signSession(expiresAt: number, env: Env): Promise<string> {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(env.COOKIE_SECRET),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  );

  const signatureBuffer = await crypto.subtle.sign('HMAC', key, encoder.encode(String(expiresAt)));
  const signature = toBase64Url(signatureBuffer);
  return `${expiresAt}.${signature}`;
}

function buildSessionCookie(env: Env, value: string, maxAge: number): string {
  return [
    `${getCookieName(env)}=${value}`,
    'Path=/',
    'HttpOnly',
    'Secure',
    'SameSite=Lax',
    `Max-Age=${maxAge}`,
  ].join('; ');
}

function buildExpiredCookie(env: Env): string {
  return [
    `${getCookieName(env)}=`,
    'Path=/',
    'HttpOnly',
    'Secure',
    'SameSite=Lax',
    'Max-Age=0',
  ].join('; ');
}

function getProtectedPrefixes(env: Env): string[] {
  const rawPrefixes = env.PROTECTED_PREFIXES?.trim();
  if (!rawPrefixes) {
    return DEFAULT_PROTECTED_PREFIXES;
  }

  return rawPrefixes
    .split(',')
    .map((prefix) => prefix.trim())
    .filter(Boolean);
}

function getCookieName(env: Env): string {
  return env.COOKIE_NAME?.trim() || DEFAULT_COOKIE_NAME;
}

function getSessionTtlSeconds(env: Env): number {
  const rawValue = Number(env.SESSION_TTL_SECONDS);
  if (!Number.isFinite(rawValue) || rawValue <= 0) {
    return DEFAULT_SESSION_TTL_SECONDS;
  }

  return Math.floor(rawValue);
}

function isProtectedPath(pathname: string, protectedPrefixes: string[]): boolean {
  return protectedPrefixes.some((prefix) => {
    if (prefix.endsWith('/')) {
      return pathname.startsWith(prefix);
    }

    return pathname === prefix || pathname.startsWith(`${prefix}/`);
  });
}

function expectsHtml(request: Request): boolean {
  const accept = request.headers.get('Accept') || '';
  const destination = request.headers.get('Sec-Fetch-Dest') || '';
  return accept.includes('text/html') || destination === 'document';
}

async function proxyToOrigin(request: Request, env: Env): Promise<Response> {
  const requestUrl = new URL(request.url);
  const upstreamUrl = new URL(request.url);
  upstreamUrl.hostname = env.ORIGIN_HOST;
  upstreamUrl.protocol = 'https:';
  upstreamUrl.port = '';

  const upstreamHeaders = new Headers(request.headers);
  upstreamHeaders.set('Host', env.ORIGIN_HOST);
  upstreamHeaders.set('X-Forwarded-Host', requestUrl.hostname);
  upstreamHeaders.set('X-Forwarded-Proto', requestUrl.protocol.replace(':', ''));

  const upstreamRequest = new Request(upstreamUrl.toString(), {
    method: request.method,
    headers: upstreamHeaders,
    body: request.body,
    redirect: 'manual',
  });

  return fetch(upstreamRequest);
}

function getCookie(cookieHeader: string | null, cookieName: string): string | null {
  if (!cookieHeader) {
    return null;
  }

  const cookies = cookieHeader.split(';');
  for (const cookie of cookies) {
    const [name, ...valueParts] = cookie.trim().split('=');
    if (name === cookieName) {
      return valueParts.join('=');
    }
  }

  return null;
}

function sanitizeRedirect(redirectTo: string | null): string {
  if (!redirectTo || !redirectTo.startsWith('/')) {
    return '/case-studies';
  }

  if (redirectTo.startsWith('//')) {
    return '/case-studies';
  }

  return redirectTo;
}

function renderPasswordPage(options: {
  redirectTo: string;
  errorMessage?: string;
  status?: number;
}): Response {
  const { errorMessage, redirectTo, status = 200 } = options;

  const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Protected Case Studies</title>
    <style>
      :root {
        --bg: #fff6ed;
        --card: rgba(255, 246, 237, 0.92);
        --text: #184027;
        --muted: rgba(24, 64, 39, 0.68);
        --accent: #ed6b2e;
        --accent-soft: rgba(237, 107, 46, 0.12);
        --brand-purple: #aaaadd;
        --border: rgba(24, 64, 39, 0.14);
        --shadow: 0 24px 60px rgba(24, 64, 39, 0.08);
        --font-body: 'Poppins', sans-serif;
        --font-heading: 'PF Marlet Display', serif;
      }

      @font-face {
        font-family: 'PF Marlet Display';
        src: url('/fonts/PF_Marlet_Display_Medium.otf') format('opentype');
        font-display: swap;
      }

      * {
        box-sizing: border-box;
      }

      body {
        margin: 0;
        min-height: 100vh;
        font-family: var(--font-body);
        background-color: var(--bg);
        background-image: url('/bg.svg');
        background-repeat: repeat;
        background-size: auto;
        color: var(--text);
        display: grid;
        place-items: center;
        padding: 24px;
      }

      .card {
        width: min(100%, 460px);
        background: var(--card);
        border: 1px solid var(--border);
        border-radius: 28px;
        box-shadow: var(--shadow);
        padding: 32px;
        backdrop-filter: blur(6px);
      }

      .eyebrow {
        margin: 0 0 10px;
        font-size: 12px;
        letter-spacing: 0.18em;
        text-transform: uppercase;
        color: var(--accent);
        font-weight: 700;
      }

      h1 {
        margin: 0;
        font-family: var(--font-heading);
        font-weight: 500;
        font-size: clamp(2.4rem, 4vw, 3.4rem);
        line-height: 0.98;
        color: var(--text);
      }

      p {
        color: var(--muted);
        line-height: 1.6;
        margin: 16px 0 0;
      }

      form {
        margin-top: 28px;
      }

      label {
        display: block;
        font-size: 14px;
        font-weight: 600;
        margin-bottom: 10px;
        color: var(--text);
      }

      input {
        width: 100%;
        border-radius: 18px;
        border: 1px solid var(--border);
        padding: 16px 18px;
        font-size: 16px;
        color: var(--text);
        background: rgba(255, 255, 255, 0.7);
      }

      input:focus {
        outline: 2px solid rgba(170, 170, 221, 0.4);
        outline-offset: 2px;
      }

      button {
        width: 100%;
        margin-top: 18px;
        border: 0;
        border-radius: 999px;
        padding: 14px 18px;
        font-size: 16px;
        font-weight: 700;
        color: var(--bg);
        background: var(--brand-purple);
        cursor: pointer;
      }

      .error {
        margin-top: 14px;
        border-radius: 14px;
        padding: 12px 14px;
        background: var(--accent-soft);
        color: #8b3e15;
        font-size: 14px;
      }

      @media (max-width: 640px) {
        .card {
          padding: 26px 22px;
          border-radius: 24px;
        }
      }
    </style>
  </head>
  <body>
    <main class="card">
      <p class="eyebrow">Case Studies</p>
      <h1>Welcome</h1>
      <p>Please enter the password to view my case studies.</p>
      <form method="post" action="${AUTH_PATH}">
        <input type="hidden" name="redirect" value="${escapeHtml(redirectTo)}" />
        <label for="password">Password</label>
        <input id="password" name="password" type="password" autocomplete="current-password" required autofocus />
        <button type="submit">View case studies</button>
      </form>
      ${errorMessage ? `<div class="error">${escapeHtml(errorMessage)}</div>` : ''}
    </main>
  </body>
</html>`;

  return new Response(html, {
    status,
    headers: {
      'Cache-Control': 'private, no-store',
      'Content-Type': 'text/html; charset=utf-8',
    },
  });
}

function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function toBase64Url(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let binary = '';
  for (const byte of bytes) {
    binary += String.fromCharCode(byte);
  }

  return btoa(binary).replaceAll('+', '-').replaceAll('/', '_').replaceAll('=', '');
}
